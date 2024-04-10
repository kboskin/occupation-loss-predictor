from __future__ import annotations

import asyncio
import logging
import multiprocessing
from typing import Final
from urllib.request import Request

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi_utils_sqlalch2.tasks import repeat_every
from starlette.responses import JSONResponse

from invasion.admin.base import LossesProjectEnum
from invasion.admin.service import AdminService
from fastapi import APIRouter

from invasion.base.pagination import PaginationException
from invasion.config import DEBUG, CORS, init_sentry
import os

from invasion.db.engine import get_session
from invasion.db.models import init_models, ForecastsTable
from invasion.forecasting.service import ForecastService
from invasion.losses.losses import BrokenLossTypeException
from invasion.losses.router import losses_router

logging_level = logging.ERROR
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

# 4 hours in seconds
timeout: Final[int] = 14400


@app.on_event("startup")
async def startup_event():
    await init_sentry()
    await init_models()
    process = multiprocessing.Process(target=run_event_loop)
    process.start()


# trying to
@repeat_every(seconds=timeout)
async def data_update_job():
    process = multiprocessing.Process(target=run_event_loop)
    process.start()


def run_event_loop():
    new_loop = asyncio.new_event_loop()
    asyncio.set_event_loop(new_loop)
    new_loop.run_until_complete(get_forecasts())


async def get_forecasts():
    await AdminService.update_statistic(get_session())
    await ForecastService.create_all_forecasts_if_needed(get_session())


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
