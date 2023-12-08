import datetime

from sqlalchemy.orm import declarative_base, mapped_column, Mapped
from sqlalchemy.sql import func
from .engine import engine

BASE = declarative_base()
metadata = BASE.metadata


class PersonnelLossesTable(BASE):
    __tablename__ = "personnel"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    losses: Mapped[int] = mapped_column(nullable=False)
    added_on_day: Mapped[int] = mapped_column(nullable=False)
    time: Mapped[datetime.datetime] = mapped_column(nullable=False)
    created_time: Mapped[datetime.datetime] = mapped_column(server_default=func.now(), nullable=False)
    updated_time: Mapped[datetime.datetime] = mapped_column(server_default=func.now(), nullable=False)
    deleted_time: Mapped[datetime.datetime] = mapped_column(nullable=True)


class TanksLossesTable(BASE):
    __tablename__ = "tanks"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    losses: Mapped[int] = mapped_column(nullable=False)
    added_on_day: Mapped[int] = mapped_column(nullable=False)
    time: Mapped[datetime.datetime] = mapped_column(nullable=False)
    created_time: Mapped[datetime.datetime] = mapped_column(server_default=func.now(), nullable=False)
    updated_time: Mapped[datetime.datetime] = mapped_column(server_default=func.now(), nullable=False)
    deleted_time: Mapped[datetime.datetime] = mapped_column(nullable=True)


class APVLossesTable(BASE):
    __tablename__ = "apv"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    losses: Mapped[int] = mapped_column(nullable=False)
    added_on_day: Mapped[int] = mapped_column(nullable=False)
    time: Mapped[datetime.datetime] = mapped_column(nullable=False)
    created_time: Mapped[datetime.datetime] = mapped_column(server_default=func.now(), nullable=False)
    updated_time: Mapped[datetime.datetime] = mapped_column(server_default=func.now(), nullable=False)
    deleted_time: Mapped[datetime.datetime] = mapped_column(nullable=True)


class ArtilleryLossesTable(BASE):
    __tablename__ = "artillery"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    losses: Mapped[int] = mapped_column(nullable=False)
    added_on_day: Mapped[int] = mapped_column(nullable=False)
    time: Mapped[datetime.datetime] = mapped_column(nullable=False)
    created_time: Mapped[datetime.datetime] = mapped_column(server_default=func.now(), nullable=False)
    updated_time: Mapped[datetime.datetime] = mapped_column(server_default=func.now(), nullable=False)
    deleted_time: Mapped[datetime.datetime] = mapped_column(nullable=True)


class MLRSLossesTable(BASE):
    __tablename__ = "mlrs"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    losses: Mapped[int] = mapped_column(nullable=False)
    added_on_day: Mapped[int] = mapped_column(nullable=False)
    time: Mapped[datetime.datetime] = mapped_column(nullable=False)
    created_time: Mapped[datetime.datetime] = mapped_column(server_default=func.now(), nullable=False)
    updated_time: Mapped[datetime.datetime] = mapped_column(server_default=func.now(), nullable=False)
    deleted_time: Mapped[datetime.datetime] = mapped_column(nullable=True)


class AircraftWarfareLossesTable(BASE):
    __tablename__ = "aircraft_warfare"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    losses: Mapped[int] = mapped_column(nullable=False)
    added_on_day: Mapped[int] = mapped_column(nullable=False)
    time: Mapped[datetime.datetime] = mapped_column(nullable=False)
    created_time: Mapped[datetime.datetime] = mapped_column(server_default=func.now(), nullable=False)
    updated_time: Mapped[datetime.datetime] = mapped_column(server_default=func.now(), nullable=False)
    deleted_time: Mapped[datetime.datetime] = mapped_column(nullable=True)


class AircraftLossesTable(BASE):
    __tablename__ = "aircraft"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    losses: Mapped[int] = mapped_column(nullable=False)
    added_on_day: Mapped[int] = mapped_column(nullable=False)
    time: Mapped[datetime.datetime] = mapped_column(nullable=False)
    created_time: Mapped[datetime.datetime] = mapped_column(server_default=func.now(), nullable=False)
    updated_time: Mapped[datetime.datetime] = mapped_column(server_default=func.now(), nullable=False)
    deleted_time: Mapped[datetime.datetime] = mapped_column(nullable=True)


class HelicoptersLossesTable(BASE):
    __tablename__ = "helicopters"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    losses: Mapped[int] = mapped_column(nullable=False)
    added_on_day: Mapped[int] = mapped_column(nullable=False)
    time: Mapped[datetime.datetime] = mapped_column(nullable=False)
    created_time: Mapped[datetime.datetime] = mapped_column(server_default=func.now(), nullable=False)
    updated_time: Mapped[datetime.datetime] = mapped_column(server_default=func.now(), nullable=False)
    deleted_time: Mapped[datetime.datetime] = mapped_column(nullable=True)


class UAVLossesTable(BASE):
    __tablename__ = "uav"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    losses: Mapped[int] = mapped_column(nullable=False)
    added_on_day: Mapped[int] = mapped_column(nullable=False)
    time: Mapped[datetime.datetime] = mapped_column(nullable=False)
    created_time: Mapped[datetime.datetime] = mapped_column(server_default=func.now(), nullable=False)
    updated_time: Mapped[datetime.datetime] = mapped_column(server_default=func.now(), nullable=False)
    deleted_time: Mapped[datetime.datetime] = mapped_column(nullable=True)


class MissilesLossesTable(BASE):
    __tablename__ = "missiles"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    losses: Mapped[int] = mapped_column(nullable=False)
    added_on_day: Mapped[int] = mapped_column(nullable=False)
    time: Mapped[datetime.datetime] = mapped_column(nullable=False)
    created_time: Mapped[datetime.datetime] = mapped_column(server_default=func.now(), nullable=False)
    updated_time: Mapped[datetime.datetime] = mapped_column(server_default=func.now(), nullable=False)
    deleted_time: Mapped[datetime.datetime] = mapped_column(nullable=True)


class WarshipsLossesTable(BASE):
    __tablename__ = "warships"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    losses: Mapped[int] = mapped_column(nullable=False)
    added_on_day: Mapped[int] = mapped_column(nullable=False)
    time: Mapped[datetime.datetime] = mapped_column(nullable=False)
    created_time: Mapped[datetime.datetime] = mapped_column(server_default=func.now(), nullable=False)
    updated_time: Mapped[datetime.datetime] = mapped_column(server_default=func.now(), nullable=False)
    deleted_time: Mapped[datetime.datetime] = mapped_column(nullable=True)


class SubmarinesLossesTable(BASE):
    __tablename__ = "submarines"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    losses: Mapped[int] = mapped_column(nullable=False)
    added_on_day: Mapped[int] = mapped_column(nullable=False)
    time: Mapped[datetime.datetime] = mapped_column(nullable=False)
    created_time: Mapped[datetime.datetime] = mapped_column(server_default=func.now(), nullable=False)
    updated_time: Mapped[datetime.datetime] = mapped_column(server_default=func.now(), nullable=False)
    deleted_time: Mapped[datetime.datetime] = mapped_column(nullable=True)


class FuelTanksLossesTable(BASE):
    __tablename__ = "fuel_tanks"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    losses: Mapped[int] = mapped_column(nullable=False)
    added_on_day: Mapped[int] = mapped_column(nullable=False)
    time: Mapped[datetime.datetime] = mapped_column(nullable=False)
    created_time: Mapped[datetime.datetime] = mapped_column(server_default=func.now(), nullable=False)
    updated_time: Mapped[datetime.datetime] = mapped_column(server_default=func.now(), nullable=False)
    deleted_time: Mapped[datetime.datetime] = mapped_column(nullable=True)


class SpecialLossesTable(BASE):
    __tablename__ = "special_equipment"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    losses: Mapped[int] = mapped_column(nullable=False)
    added_on_day: Mapped[int] = mapped_column(nullable=False)
    time: Mapped[datetime.datetime] = mapped_column(nullable=False)
    created_time: Mapped[datetime.datetime] = mapped_column(server_default=func.now(), nullable=False)
    updated_time: Mapped[datetime.datetime] = mapped_column(server_default=func.now(), nullable=False)
    deleted_time: Mapped[datetime.datetime] = mapped_column(nullable=True)


async def init_models():
    async with engine.begin() as conn:
        await conn.run_sync(metadata.create_all)