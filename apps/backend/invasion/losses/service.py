from datetime import date
from typing import List

from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from invasion import LossesProjectEnum
from invasion.admin.mapper import losses_enum_to_table_mapper
from invasion.db.models import GenericLossTable
from invasion.losses.models.domain import AggregationDbLoss


class LossesService:

    @classmethod
    async def get_data_for(
        cls,
        session: AsyncSession,
        offset_from: date,
        offset_to: date,
        table: GenericLossTable
    ) -> List[GenericLossTable]:
        return (await session.execute(
            select(table).filter(table.time.between(offset_from, offset_to)).order_by(table.time))) \
            .scalars() \
            .all()

    @classmethod
    async def get_aggregations(
        cls,
        session: AsyncSession,
        enum: LossesProjectEnum
    ) -> List[AggregationDbLoss]:
        table = losses_enum_to_table_mapper(enum)

        last_record_subquery = (
            select(
                func.EXTRACT('YEAR', table.time).label('year'),
                func.MAX(table.time).label('max_time')
            )
                .group_by('year')
                .subquery()
        )

        # Main query to get the losses for the last record of each year
        query = (
            select(
                func.EXTRACT('YEAR', table.time).label('year'),
                table.losses
            ).join(
                last_record_subquery,
                (func.EXTRACT('YEAR', table.time) == last_record_subquery.c.year) &
                (table.time == last_record_subquery.c.max_time)
            ).order_by('year')
        )

        return [
            AggregationDbLoss(
                **{'year': year, 'total': total, 'type': enum}) for (year, total) in
            (await session.execute(query)).all()
        ]
