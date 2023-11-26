from __future__ import annotations

import asyncio

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from invasion.admin.service import AdminService
from fastapi import APIRouter

from invasion.config import DEBUG, CORS
import os

from invasion.db.engine import DB
from invasion.losses.router import losses_router

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


async def connect_to_db():
    return await DB.connect()


@app.on_event("startup")
async def startup_event():
    asyncio.create_task(connect_to_db())
    asyncio.create_task(AdminService.update_statistic())

# @app.exception_handler(AuthException)
# async def validation_exception_handler(request, exc):
#     return PlainTextResponse("Unauthorized", status_code=401)
