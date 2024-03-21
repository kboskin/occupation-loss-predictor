from typing import Annotated, Union, List

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from invasion import get_session, ForecastService
from invasion.admin.mapper import losses_enum_to_table_mapper
from invasion.admin.base import LossesProjectEnum
from invasion.base.pagination import pagination, PaginationParameters
from invasion.losses.losses import check_losses_category
from invasion.losses.models import LossesResponseModel, LossDataPoint, Loss, AggregationResponseModel, \
    AggregationDbLoss, AggregationYearTotal, AggregationResult, AggregationCategoryTotal
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
        last_data_record_data = data[-1].losses

        prediction_data = await ForecastService.get_prediction(session, enum, last_data_record_data)

        loss = Loss(
            type=enum,
            history=[
                LossDataPoint(
                    day_increment=item.added_on_day,
                    losses=item.losses,
                    time=item.time
                ) for item in data
            ],
            prediction=prediction_data
        )
        losses_with_categories.append(loss)

    return LossesResponseModel(data=losses_with_categories)


@losses_router.get("/vehicles/aggregation", response_model=AggregationResponseModel)
async def get_aggregated_data(
    session: Annotated[AsyncSession, Depends(get_session)]
) -> AggregationResponseModel:
    all_categories: List[List[AggregationDbLoss]] = [
        await LossesService.get_aggregation(session, item) for item in filter(lambda x: x != LossesProjectEnum.personnel, LossesProjectEnum.list())
    ]
    # Regroup the data
    result = AggregationResult(children=[])
    for category in all_categories:
        for loss in category:
            year_entry: AggregationYearTotal = next((item for item in result.children if item.name == loss.year), None)
            if year_entry is None:
                year_entry = AggregationYearTotal(name=loss.year, value=0, children=[])
                result.children.append(year_entry)

            year_entry.value += loss.total
            year_entry.children.append(AggregationCategoryTotal(
                name=loss.type.value,
                value=loss.total
            ))

    result.children.sort(key=lambda x: x.name)

    return AggregationResponseModel(data=result)


if __name__ == '__main__':
    data = {
        "children": [
            {"name": "aircraft", "value": 347},
            {"name": "aircraft_warfare", "value": 721},
            {"name": "apv", "value": 13058},
            {"name": "artillery", "value": 10714},
            {"name": "fuel_tanks", "value": 14198},
            {"name": "helicopters", "value": 325},
            {"name": "missiles", "value": 1922},
            {"name": "mlrs", "value": 1017},
            {"name": "special_equipment", "value": 1738},
            {"name": "submarines", "value": 1},
            {"name": "tanks", "value": 6828},
            {"name": "uav", "value": 8355},
            {"name": "warships", "value": 26}
        ]
    }

    total_value = sum(child["value"] for child in data["children"])
    print(total_value)