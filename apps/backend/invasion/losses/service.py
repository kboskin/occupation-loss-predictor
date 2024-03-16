from datetime import date
from typing import List

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from invasion.db.models import GenericLossTable


class LossesService:

    @classmethod
    async def get_data_for(
        cls,
        session: AsyncSession,
        offset_from: date,
        offset_to: date,
        table: GenericLossTable
    ) -> List[GenericLossTable]:
        return (await session.execute(select(table).filter(table.time.between(offset_from, offset_to)).order_by(table.time))) \
            .scalars() \
            .all()
