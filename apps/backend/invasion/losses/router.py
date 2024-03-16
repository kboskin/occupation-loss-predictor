from typing import Annotated, Union, List

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from invasion import get_session
from invasion.admin.mapper import losses_enum_to_table_mapper
from invasion.admin.base import LossesProjectEnum
from invasion.base.pagination import pagination, PaginationParameters
from invasion.losses.losses import check_losses_category
from invasion.losses.models import LossesResponseModel, LossDataPoint, Loss
from invasion.losses.service import LossesService

losses_router = APIRouter()
losses_router.tags = ["losses"]


@losses_router.get("/", response_model=LossesResponseModel)
async def get_data_for_category(
    commons: Annotated[PaginationParameters, Depends(pagination)],
    categories: Annotated[Union[List[LossesProjectEnum], None], Depends(check_losses_category)],
    session: Annotated[AsyncSession, Depends(get_session)]
) -> LossesResponseModel:
    losses_with_categories: List[Loss] = []
    for category_item in categories:
        enum = LossesProjectEnum(category_item)
        table = losses_enum_to_table_mapper(enum)
        data = await LossesService.get_data_for(session, commons.offset_from, commons.offset_to, table)

        loss = Loss(
            type=enum,
            history=[
                LossDataPoint(
                    day_increment=item.added_on_day,
                    losses=item.losses,
                    time=item.time
                ) for item in data
            ],
            prediction=[]
        )
        losses_with_categories.append(loss)

    return LossesResponseModel(data=losses_with_categories)
