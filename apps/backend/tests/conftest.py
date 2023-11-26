import pytest
from async_asgi_testclient import TestClient

from invasion import app


@pytest.fixture(scope="function")
@pytest.mark.asyncio
async def client() -> TestClient:
    async with TestClient(app) as ac:
        yield ac
