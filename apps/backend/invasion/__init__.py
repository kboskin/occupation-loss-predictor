from __future__ import annotations

import asyncio

import asyncpg

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from invasion.admin.service import AdminService
from fastapi import APIRouter

from invasion.config import DEBUG, CORS, SQLALCHEMY_DATABASE_URI
import os

from invasion.db.models import init_models
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


@app.on_event("startup")
async def startup_event():
    await init_models()
    await AdminService.update_statistic()
