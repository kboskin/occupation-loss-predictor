import logging
from contextlib import asynccontextmanager

import sentry_sdk
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, AsyncEngine

from invasion.config import SQLALCHEMY_DATABASE_URI, SQLALCHEMY_ECHO


def create_engine_for_process() -> AsyncEngine:
    return create_async_engine(
        SQLALCHEMY_DATABASE_URI,
        echo=SQLALCHEMY_ECHO
    )


engine = create_engine_for_process()


@asynccontextmanager
async def get_session_context():
    # Explicit type because sessionmaker.__call__ stub is Any
    session = AsyncSession(engine, expire_on_commit=False)

    try:
        yield session
        await session.commit()
    except Exception as e:
        await session.rollback()
        logging.error(f"Exception while completing transaction; rollback reason: {e}")
        sentry_sdk.capture_exception(e)
        raise
    finally:
        await session.close()


def get_session() -> AsyncSession:
    return AsyncSession(engine, expire_on_commit=False)


def get_session_for_process(engine: AsyncEngine) -> AsyncSession:
    return AsyncSession(engine, expire_on_commit=False)
