from sqlalchemy.ext.asyncio import AsyncSession

from invasion import async_session


async def get_session() -> AsyncSession:
    return async_session
