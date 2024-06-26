import datetime
import logging

from sqlalchemy import ForeignKey
from sqlalchemy.orm import declarative_base, mapped_column, Mapped, relationship
from sqlalchemy.sql import func
from .engine import engine
from ..admin.base import LossesProjectEnum

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


class ForecastsTable(BASE):
    __tablename__ = "forecasts"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    created_time: Mapped[datetime.datetime] = mapped_column(server_default=func.now(), nullable=False)
    updated_time: Mapped[datetime.datetime] = mapped_column(server_default=func.now(), nullable=False)
    deleted_time: Mapped[datetime.datetime] = mapped_column(nullable=True)
    # Relationship to the child table
    forecast_data: Mapped[list['ForecastsDataTable']] = relationship(
        "ForecastsDataTable",
        back_populates="parent_forecast",
        cascade="all, delete-orphan"
    )


class ForecastsDataTable(BASE):
    __tablename__ = "forecasts_data"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    forecast_added: Mapped[int] = mapped_column(nullable=False)
    forecast_time: Mapped[datetime.datetime] = mapped_column(nullable=False)
    forecast_type: Mapped[LossesProjectEnum] = mapped_column(nullable=False)
    parent_forecast_id: Mapped[int] = mapped_column(ForeignKey(ForecastsTable.id, ondelete='CASCADE'))

    created_time: Mapped[datetime.datetime] = mapped_column(server_default=func.now(), nullable=False)
    updated_time: Mapped[datetime.datetime] = mapped_column(server_default=func.now(), nullable=False)
    deleted_time: Mapped[datetime.datetime] = mapped_column(nullable=True)

    # Relationship to the parent table
    parent_forecast: Mapped[ForecastsTable] = relationship("ForecastsTable", back_populates="forecast_data")


async def init_models():
    try:
        async with engine.begin() as conn:
            logging.info("Connection established")
            await conn.run_sync(metadata.create_all)
            logging.info("Metadata creation successful")
    except Exception as e:
        logging.error(f"Error during init_models: {e}")
        raise
