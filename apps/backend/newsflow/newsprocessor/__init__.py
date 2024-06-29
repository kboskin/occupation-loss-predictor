# flake8: noqa
from __future__ import annotations

import asyncio
import logging
import multiprocessing
from datetime import datetime, timedelta
from typing import Final, List

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi_utils_sqlalch2.tasks import repeat_every

from fastapi import APIRouter

import os

from newsprocessor.config import DEBUG, CORS, init_sentry, INVASION_START
from newsprocessor.news.service import NewsService
from newsprocessor.utils import datetime_range, DateRange

logging_level = logging.DEBUG
file_name = "news.log"

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

# api_router.include_router(losses_router, prefix="/losses")

app.include_router(api_router)

# 2 hours in seconds
timeout: Final[int] = 7200


@app.on_event("startup")
async def startup_event():
    tasks = []
    end_date = datetime.now() - timedelta(days=1)
    date_range = DateRange(start_date=INVASION_START, end_date=end_date)

    set_of_sources = set()
    for dt in datetime_range(date_range):
        sources = await fetch_news_for_date(dt)
        [set_of_sources.add(source) for source in sources]
        print(f"date: {dt}; \n sources: {sources}")


async def fetch_news_for_date(dt) -> List[str]:
    return await NewsService.get_news(dt)


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


async def get_forecasts():
    pass
