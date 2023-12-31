import datetime

from sqlalchemy.orm import declarative_base, mapped_column, Mapped
from sqlalchemy.sql import func
from .engine import engine

BASE = declarative_base()
metadata = BASE.metadata


class GenericLossTable:
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    losses: Mapped[int] = mapped_column(nullable=False)
    added_on_day: Mapped[int] = mapped_column(nullable=False)
    time: Mapped[datetime.datetime] = mapped_column(nullable=False)
    created_time: Mapped[datetime.datetime] = mapped_column(server_default=func.now(), nullable=False)
    updated_time: Mapped[datetime.datetime] = mapped_column(server_default=func.now(), nullable=False)
    deleted_time: Mapped[datetime.datetime] = mapped_column(nullable=True)


class PersonnelLossesTable(BASE, GenericLossTable):
    __tablename__ = "personnel"


class TanksLossesTable(BASE, GenericLossTable):
    __tablename__ = "tanks"


class APVLossesTable(BASE, GenericLossTable):
    __tablename__ = "apv"


class ArtilleryLossesTable(BASE, GenericLossTable):
    __tablename__ = "artillery"


class MLRSLossesTable(BASE, GenericLossTable):
    __tablename__ = "mlrs"


class AircraftWarfareLossesTable(BASE, GenericLossTable):
    __tablename__ = "aircraft_warfare"


class AircraftLossesTable(BASE, GenericLossTable):
    __tablename__ = "aircraft"


class HelicoptersLossesTable(BASE, GenericLossTable):
    __tablename__ = "helicopters"


class UAVLossesTable(BASE, GenericLossTable):
    __tablename__ = "uav"


class MissilesLossesTable(BASE, GenericLossTable):
    __tablename__ = "missiles"


class WarshipsLossesTable(BASE, GenericLossTable):
    __tablename__ = "warships"


class SubmarinesLossesTable(BASE, GenericLossTable):
    __tablename__ = "submarines"


class FuelTanksLossesTable(BASE, GenericLossTable):
    __tablename__ = "fuel_tanks"


class SpecialLossesTable(BASE, GenericLossTable):
    __tablename__ = "special_equipment"


async def init_models():
    async with engine.begin() as conn:
        await conn.run_sync(metadata.create_all)
