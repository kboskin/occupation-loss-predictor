from fastapi import APIRouter

from invasion.losses.models import LossesResponseModel

losses_router = APIRouter()
losses_router.tags = ["losses"]


@losses_router.get("/sync", response_model=LossesResponseModel)
async def get_data() -> LossesResponseModel:
    return LossesResponseModel()
