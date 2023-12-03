import os
import sys
from logging.config import fileConfig

sys.path.insert(0, os.path.realpath(os.path.join(os.path.dirname(__file__), '..')))

from alembic import context
from sqlalchemy import engine_from_config
from sqlalchemy import pool

from invasion.config import SQLALCHEMY_DATABASE_URI

from invasion.db.models import metadata

config = context.config
config.set_main_option('sqlalchemy.url', SQLALCHEMY_DATABASE_URI)

fileConfig(config.config_file_name)

target_metadata = metadata


def run_migrations_offline():
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online():
    connectable = engine_from_config(
        config.get_section(config.config_ini_section),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection, target_metadata=target_metadata
        )

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
