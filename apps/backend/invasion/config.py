# -*- coding: utf-8 -*-
import os
import shlex
from dataclasses import dataclass

import sentry_sdk

DEBUG = os.getenv('DEBUG') == 'True'


@dataclass
class CORS:
    allowed_origins = os.getenv("ALLOWED_ORIGINS", "").split(',')


@dataclass
class POSTGRES:
    user = os.getenv("POSTGRES_USER", "postgres")
    password = os.getenv("POSTGRES_PASSWORD", "postgres")
    db = os.getenv("POSTGRES_DB", "losses")
    host = os.getenv("POSTGRES_HOST", "localhost")
    port = os.getenv("POSTGRES_PORT", "5432")


SQLALCHEMY_DATABASE_URI = (
    f"postgresql://{POSTGRES.user}:{POSTGRES.password}"
    f"@{POSTGRES.host}:{POSTGRES.port}/{POSTGRES.db}"
)

SQLALCHEMY_ECHO = False

SQLALCHEMY_TRACK_MODIFICATIONS = False


@dataclass
class SENTRY:
    dsn = os.getenv("SENTRY_DSN")
    environment = os.getenv("SENTRY_ENVIRONMENT")
    tags = os.getenv("SENTRY_TAGS")


def init_sentry():
    if SENTRY.dsn:
        sentry_sdk.init(
            dsn=SENTRY.dsn,
            environment=SENTRY.environment
        )

    if SENTRY.tags:
        with sentry_sdk.configure_scope() as scope:
            for token in shlex.split(SENTRY.tags):
                scope.set_tag(*token.split('='))
