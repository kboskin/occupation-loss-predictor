import pytest
from async_asgi_testclient import TestClient

from invasion import app


@pytest.fixture(scope="function")
@pytest.mark.asyncio
async def client() -> TestClient:
    async with TestClient(app) as ac:
        yield ac


def pytest_sessionfinish(session, exitstatus):
    # no tests case
    if exitstatus == 5:
        session.exitstatus = 0  # Any arbitrary custom status you want to return```
