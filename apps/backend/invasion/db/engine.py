from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession

from invasion.config import SQLALCHEMY_DATABASE_URI, SQLALCHEMY_ECHO

engine = create_async_engine(
    SQLALCHEMY_DATABASE_URI,
    echo=SQLALCHEMY_ECHO,

)


async def get_session() -> AsyncSession:
    return AsyncSession(engine, expire_on_commit=False)
