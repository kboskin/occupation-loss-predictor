import logging
from typing import Annotated, Union, List

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from invasion import ForecastService
from invasion.admin.mapper import losses_enum_to_table_mapper
from invasion.admin.base import LossesProjectEnum
from invasion.base.pagination import pagination, PaginationParameters
from invasion.db.engine import get_session_context
from invasion.losses.losses import check_losses_category
from invasion.losses.models.domain import AggregationDbLoss
from invasion.losses.models.presentation import LossDataPoint, LossesResponseModel, AggregationYearlyResponseModel, \
    AggregationYearResult, AggregationYearTotal, AggregationCategoryTotal, Loss, AggregationCategoryResult, \
    AggregationCategory, AggregationYearTotalShort, AggregationCategoriesResponseModel
from invasion.losses.service import LossesService

losses_router = APIRouter()
losses_router.tags = ["losses"]


@losses_router.get("/", response_model=LossesResponseModel)
async def get_data_for_category(
    commons: Annotated[PaginationParameters, Depends(pagination, use_cache=False)],
    categories: Annotated[Union[List[LossesProjectEnum], None], Depends(check_losses_category)],
    session_context: Annotated[AsyncSession, Depends(get_session_context, use_cache=False)]
) -> LossesResponseModel:
    losses_with_categories: List[Loss] = []
    async with session_context as session:
        for category_item in categories:
            enum = LossesProjectEnum(category_item)
            logging.debug(f"getting data for category {enum}, offsets: {commons.offset_from, commons.offset_to}")
            table = losses_enum_to_table_mapper(enum)
            data = await LossesService.get_data_for(session, commons.offset_from, commons.offset_to, table)

            logging.debug(f"got data for category {enum}")
            if not data:
                prediction_data = []
            else:
                last_data_record_data = data[-1]
                logging.debug(f"last record date {last_data_record_data.time}")

                prediction_data = await ForecastService.get_prediction(session, enum, last_data_record_data.losses)

            logging.debug(f"grabbed forecast for category {enum}")

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


@losses_router.get("/yearly/aggregation", response_model=AggregationYearlyResponseModel)
async def get_yearly_aggregations(
    session_context: Annotated[AsyncSession, Depends(get_session_context, use_cache=False)]
) -> AggregationYearlyResponseModel:
    result = AggregationYearResult(children=[])

    async with session_context as session:
        all_categories: List[List[AggregationDbLoss]] = [
            await LossesService.get_aggregations(session, item) for item in
            filter(lambda x: x != LossesProjectEnum.personnel, LossesProjectEnum.list())
        ]
        # Regroup the data
        for category in all_categories:
            for loss in category:
                year_entry: AggregationYearTotal = next(
                    (item for item in result.children if item.name == loss.year),
                    None
                )
                if year_entry is None:
                    year_entry = AggregationYearTotal(name=loss.year, value=0, children=[])
                    result.children.append(year_entry)

                year_entry.value += loss.total
                year_entry.children.append(AggregationCategoryTotal(
                    name=loss.type,
                    value=loss.total
                ))

        result.children.sort(key=lambda x: x.name)

    return AggregationYearlyResponseModel(data=result)


@losses_router.get("/category/aggregation", response_model=AggregationCategoriesResponseModel)
async def get_category_aggregations(
    session_context: Annotated[AsyncSession, Depends(get_session_context, use_cache=False)]
) -> AggregationCategoriesResponseModel:
    result = AggregationCategoryResult(children=[])

    async with session_context as session:
        # Regroup the data
        all_categories: List[List[AggregationDbLoss]] = [
            await LossesService.get_aggregations(session, item) for item in
            filter(lambda x: x != LossesProjectEnum.personnel, LossesProjectEnum.list())
        ]
        # Regroup the data
        for category in all_categories:
            for loss in category:
                category_entry: AggregationCategory = next(
                    (item for item in result.children if item.category == loss.type),
                    None
                )

                if category_entry is None:
                    category_entry = AggregationCategory(category=loss.type, total=0, children=[])
                    result.children.append(category_entry)

                category_entry.total += loss.total
                category_entry.children.append(
                    AggregationYearTotalShort(
                        year=loss.year,
                        value=loss.total
                    ))

        result.children.sort(key=lambda x: x.category)
        result = AggregationCategoriesResponseModel(data=result)

    return result
