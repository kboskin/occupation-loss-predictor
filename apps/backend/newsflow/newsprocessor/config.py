# -*- coding: utf-8 -*-
import os
import shlex
from dataclasses import dataclass
from datetime import date

import sentry_sdk

DEBUG = os.getenv('DEBUG') == 'True'

INVASION_START = date(2022, 2, 24)
INVASION_START_2 = date(2024, 2, 25)


@dataclass
class CORS:
    allowed_origins = os.getenv("ALLOWED_ORIGINS", "").split(',')


@dataclass
class SENTRY:
    dsn = os.getenv("SENTRY_DSN")
    environment = os.getenv("SENTRY_ENVIRONMENT")
    tags = os.getenv("SENTRY_TAGS")


async def init_sentry():
    if SENTRY.dsn:
        sentry_sdk.init(
            dsn=SENTRY.dsn,
            environment=SENTRY.environment
        )

    if SENTRY.tags:
        with sentry_sdk.configure_scope() as scope:
            for token in shlex.split(SENTRY.tags):
                scope.set_tag(*token.split('='))
