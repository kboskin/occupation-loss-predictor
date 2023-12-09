from typing import Annotated, Union

from fastapi import APIRouter, Depends

from invasion.base.pagination import pagination
from invasion.losses.losses import check_losses_category
from invasion.losses.models import LossesResponseModel, LossesAggregationModel

losses_router = APIRouter()
losses_router.tags = ["losses"]


@losses_router.get("/aggregation", response_model=LossesResponseModel)
async def get_aggregation(commons: Annotated[dict, Depends(pagination)]) -> LossesResponseModel:
    return LossesResponseModel()


@losses_router.get("/", response_model=LossesAggregationModel)
async def get_generic_data(
    commons: Annotated[dict, Depends(pagination)],
    category: Annotated[Union[str, None], Depends(check_losses_category)]
) -> LossesAggregationModel:
    print(category)
    return LossesAggregationModel()
