from enum import Enum

import sqlalchemy as sa
from sqlalchemy.orm import declarative_base
from sqlalchemy.sql import func, expression
from .engine import engine

metadata = declarative_base().metadata

PersonnelLossesTable = sa.Table(
    "personnel",
    metadata,
    sa.Column('id', sa.Integer, primary_key=True, autoincrement=True),
    sa.Column('losses', sa.Numeric, nullable=False),
    sa.Column('time', sa.DateTime, nullable=False),
    sa.Column('created_time', sa.DateTime, server_default=func.now(), nullable=False),
    sa.Column('updated_time', sa.DateTime, server_default=func.now(), nullable=False),
    sa.Column('deleted_time', sa.DateTime),
)

TanksLossesTable = sa.Table(
    "tanks",
    metadata,
    sa.Column('id', sa.Integer, primary_key=True, autoincrement=True),
    sa.Column('losses', sa.Numeric, nullable=False),
    sa.Column('time', sa.DateTime, nullable=False),
    sa.Column('created_time', sa.DateTime, server_default=func.now(), nullable=False),
    sa.Column('updated_time', sa.DateTime, server_default=func.now(), nullable=False),
    sa.Column('deleted_time', sa.DateTime),
)

APVLossesTable = sa.Table(
    "apv",
    metadata,
    sa.Column('id', sa.Integer, primary_key=True, autoincrement=True),
    sa.Column('losses', sa.Numeric, nullable=False),
    sa.Column('time', sa.DateTime, nullable=False),
    sa.Column('created_time', sa.DateTime, server_default=func.now(), nullable=False),
    sa.Column('updated_time', sa.DateTime, server_default=func.now(), nullable=False),
    sa.Column('deleted_time', sa.DateTime),
)

ArtilleryLossesTable = sa.Table(
    "artillery",
    metadata,
    sa.Column('id', sa.Integer, primary_key=True, autoincrement=True),
    sa.Column('losses', sa.Numeric, nullable=False),
    sa.Column('time', sa.DateTime, nullable=False),
    sa.Column('created_time', sa.DateTime, server_default=func.now(), nullable=False),
    sa.Column('updated_time', sa.DateTime, server_default=func.now(), nullable=False),
    sa.Column('deleted_time', sa.DateTime),
)

MLRSLossesTable = sa.Table(
    "mlrs",
    metadata,
    sa.Column('id', sa.Integer, primary_key=True, autoincrement=True),
    sa.Column('losses', sa.Numeric, nullable=False),
    sa.Column('time', sa.DateTime, nullable=False),
    sa.Column('created_time', sa.DateTime, server_default=func.now(), nullable=False),
    sa.Column('updated_time', sa.DateTime, server_default=func.now(), nullable=False),
    sa.Column('deleted_time', sa.DateTime),
)

AircraftWarfareLossesTable = sa.Table(
    "aircraft_warfare",
    metadata,
    sa.Column('id', sa.Integer, primary_key=True, autoincrement=True),
    sa.Column('losses', sa.Numeric, nullable=False),
    sa.Column('time', sa.DateTime, nullable=False),
    sa.Column('created_time', sa.DateTime, server_default=func.now(), nullable=False),
    sa.Column('updated_time', sa.DateTime, server_default=func.now(), nullable=False),
    sa.Column('deleted_time', sa.DateTime),
)

AircraftLossesTable = sa.Table(
    "aircraft",
    metadata,
    sa.Column('id', sa.Integer, primary_key=True, autoincrement=True),
    sa.Column('losses', sa.Numeric, nullable=False),
    sa.Column('time', sa.DateTime, nullable=False),
    sa.Column('created_time', sa.DateTime, server_default=func.now(), nullable=False),
    sa.Column('updated_time', sa.DateTime, server_default=func.now(), nullable=False),
    sa.Column('deleted_time', sa.DateTime),
)

HelicoptersLossesTable = sa.Table(
    "helicopters",
    metadata,
    sa.Column('id', sa.Integer, primary_key=True, autoincrement=True),
    sa.Column('losses', sa.Numeric, nullable=False),
    sa.Column('time', sa.DateTime, nullable=False),
    sa.Column('created_time', sa.DateTime, server_default=func.now(), nullable=False),
    sa.Column('updated_time', sa.DateTime, server_default=func.now(), nullable=False),
    sa.Column('deleted_time', sa.DateTime),
)

UAVLossesTable = sa.Table(
    "uav",
    metadata,
    sa.Column('id', sa.Integer, primary_key=True, autoincrement=True),
    sa.Column('losses', sa.Numeric, nullable=False),
    sa.Column('time', sa.DateTime, nullable=False),
    sa.Column('created_time', sa.DateTime, server_default=func.now(), nullable=False),
    sa.Column('updated_time', sa.DateTime, server_default=func.now(), nullable=False),
    sa.Column('deleted_time', sa.DateTime),
)

MissilesLossesTable = sa.Table(
    "missiles",
    metadata,
    sa.Column('id', sa.Integer, primary_key=True, autoincrement=True),
    sa.Column('losses', sa.Numeric, nullable=False),
    sa.Column('time', sa.DateTime, nullable=False),
    sa.Column('created_time', sa.DateTime, server_default=func.now(), nullable=False),
    sa.Column('updated_time', sa.DateTime, server_default=func.now(), nullable=False),
    sa.Column('deleted_time', sa.DateTime),
)

WarshipsLossesTable = sa.Table(
    "warships",
    metadata,
    sa.Column('id', sa.Integer, primary_key=True, autoincrement=True),
    sa.Column('losses', sa.Numeric, nullable=False),
    sa.Column('time', sa.DateTime, nullable=False),
    sa.Column('created_time', sa.DateTime, server_default=func.now(), nullable=False),
    sa.Column('updated_time', sa.DateTime, server_default=func.now(), nullable=False),
    sa.Column('deleted_time', sa.DateTime),
)

SubmarinesLossesTable = sa.Table(
    "submarines",
    metadata,
    sa.Column('id', sa.Integer, primary_key=True, autoincrement=True),
    sa.Column('losses', sa.Numeric, nullable=False),
    sa.Column('time', sa.DateTime, nullable=False),
    sa.Column('created_time', sa.DateTime, server_default=func.now(), nullable=False),
    sa.Column('updated_time', sa.DateTime, server_default=func.now(), nullable=False),
    sa.Column('deleted_time', sa.DateTime),
)

FuelTanksLossesTable = sa.Table(
    "fuel_tanks",
    metadata,
    sa.Column('id', sa.Integer, primary_key=True, autoincrement=True),
    sa.Column('losses', sa.Numeric, nullable=False),
    sa.Column('time', sa.DateTime, nullable=False),
    sa.Column('created_time', sa.DateTime, server_default=func.now(), nullable=False),
    sa.Column('updated_time', sa.DateTime, server_default=func.now(), nullable=False),
    sa.Column('deleted_time', sa.DateTime),
)

SpecialLossesTable = sa.Table(
    "special_equipment",
    metadata,
    sa.Column('id', sa.Integer, primary_key=True, autoincrement=True),
    sa.Column('losses', sa.Numeric, nullable=False),
    sa.Column('time', sa.DateTime, nullable=False),
    sa.Column('created_time', sa.DateTime, server_default=func.now(), nullable=False),
    sa.Column('updated_time', sa.DateTime, server_default=func.now(), nullable=False),
    sa.Column('deleted_time', sa.DateTime),
)

metadata.create_all(engine)
