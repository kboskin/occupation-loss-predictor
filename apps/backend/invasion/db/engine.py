from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, AsyncEngine

from invasion.config import SQLALCHEMY_DATABASE_URI, SQLALCHEMY_ECHO


def create_engine_for_process() -> AsyncEngine:
    return create_async_engine(
        SQLALCHEMY_DATABASE_URI,
        echo=SQLALCHEMY_ECHO
    )


engine = create_engine_for_process()


def get_session() -> AsyncSession:
    return AsyncSession(engine, expire_on_commit=False)


def get_session_for_process(engine: AsyncEngine) -> AsyncSession:
    return AsyncSession(engine, expire_on_commit=False)
