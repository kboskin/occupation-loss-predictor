# flake8: noqa
from __future__ import annotations

import asyncio
import logging
import multiprocessing
from datetime import datetime
from typing import Final
from urllib.request import Request

import sentry_sdk
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi_utils_sqlalch2.tasks import repeat_every
from sqlalchemy import create_engine
from sqlalchemy.ext.asyncio import async_session
from starlette.responses import JSONResponse

from invasion.admin.service import AdminService
from fastapi import APIRouter

from invasion.admin.base import LossesProjectEnum
from invasion.base.pagination import PaginationException
from invasion.config import DEBUG, CORS, init_sentry
import os

from invasion.db.engine import get_session, create_engine_for_process, get_session_for_process, engine
from invasion.db.models import init_models
from invasion.forecasting.service import ForecastService
from invasion.losses.losses import BrokenLossTypeException
from invasion.losses.router import losses_router

logging_level = logging.DEBUG
file_name = "invasion.log"

if DEBUG:
    logging_level = logging.DEBUG
    file_name = None

logging.basicConfig(level=logging_level, filename=file_name, filemode="w")

app = FastAPI(debug=DEBUG)
if DEBUG:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=CORS.allowed_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
api_router = APIRouter(prefix='/api')

script_dir = os.path.dirname(__file__)
st_abs_file_path = os.path.join(script_dir, "static/")
app.mount("/static", StaticFiles(directory=st_abs_file_path), name="static")

api_router.include_router(losses_router, prefix="/losses")

app.include_router(api_router)

# 2 hours in seconds
timeout: Final[int] = 7200


@app.on_event("startup")
async def startup_event():
    logging.debug("Warming up")
    await init_sentry()
    await init_models()
    await data_update_job()
    logging.debug("Warmed up")


@app.on_event("shutdown")
async def shutdown():
    await engine.dispose()


async def run_coroutine_update_process():
    process = multiprocessing.Process(target=run_event_loop)
    process.start()


# trying to
@repeat_every(seconds=timeout, wait_first=False)
async def data_update_job():
    logging.debug(f"Updating data...{datetime.now()}")
    await init_sentry()
    await run_coroutine_update_process()
    logging.debug("Data update finished")


def run_event_loop():
    asyncio.run(get_forecasts())


# get forecasts lives in a separate process due to blocking nature
async def get_forecasts():
    logging.info("Running event loop with updates")
    sentry_sdk.capture_message(f"Running event loop with updates {datetime.now()}", "info")

    engine = create_engine_for_process()
    async_session_maker = get_session_for_process(engine)
    async with async_session_maker as session:
        try:
            async with session.begin():
                await AdminService.update_statistic(session)
                await ForecastService.create_all_forecasts_if_needed(session)
            await session.commit()  # Explicitly commit the transaction
        except Exception as e:
            await session.rollback()  # Rollback in case of an exception
            logging.error(f"Exception during forecast updates: {e}")
        finally:
            await session.close()
            await engine.dispose()


@app.exception_handler(PaginationException)
async def pagination_exception_handler(_: Request, _1: PaginationException):
    return JSONResponse(
        status_code=400,
        content={"message": "Wrong date parameters"},
    )


@app.exception_handler(BrokenLossTypeException)
async def losstype_exception_handler(_: Request, _1: BrokenLossTypeException):
    return JSONResponse(
        status_code=400,
        content={"message": "Broken category type"},
    )
