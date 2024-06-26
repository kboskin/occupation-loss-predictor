import logging
from datetime import datetime, timedelta
from datetime import date
from typing import Union, List, Sequence

from statsmodels.tsa.statespace.sarimax import SARIMAX

import pandas as pd
from sqlalchemy import select, and_
from sqlalchemy.ext.asyncio import AsyncSession

from invasion.admin.mapper import losses_enum_to_table_mapper
from invasion.admin.models import LossesProjectModel
from invasion.admin.base import LossesProjectEnum
from invasion.db.models import ForecastsTable, ForecastsDataTable, PersonnelLossesTable
from invasion.losses.models.presentation import LossDataPoint


class ForecastService:

    @classmethod
    async def __get_last_forecast_date(cls, session: AsyncSession) -> Union[datetime, None]:
        execution_result = await session.execute(select(ForecastsTable).order_by(ForecastsTable.id.desc()))

        data: ForecastsTable = execution_result.scalars().first()
        if data:
            return data.created_time
        else:
            return None

    @classmethod
    async def __get_last_record_date(cls, session: AsyncSession) -> Union[datetime, None]:
        execution_result = await session.execute(
            select(PersonnelLossesTable).order_by(PersonnelLossesTable.id.desc()).limit(1)
        )

        data: PersonnelLossesTable = execution_result.scalars().first()
        if data:
            return data.time
        else:
            return None

    @classmethod
    def create_parent_forecast(cls, session: AsyncSession) -> ForecastsTable:
        parent_forecast = ForecastsTable()

        logging.debug(f"adding forecast {parent_forecast}")
        session.add(parent_forecast)

        return parent_forecast

    @classmethod
    def prepare_forecast_for_category(
        cls,
        enum: LossesProjectEnum,
        parent_forecast: ForecastsTable,
        data: Sequence
    ) -> List[ForecastsDataTable] :
        logging.debug(f"Parent forecast id: {parent_forecast}")

        for item in data:
            item.__dict__['type'] = enum

        data = [LossesProjectModel(**item.__dict__) for item in data]

        original_df = pd.DataFrame([res.__dict__ for res in data])
        df = original_df

        logging.debug(f"beginning forecast SARIMAX preparation for category {enum}")

        # SARIMAX model fitting
        period = 45
        model = SARIMAX(df.added_on_day[:], order=(1, 1, 1), seasonal_order=(1, 1, 1, period))
        model_fit = model.fit()

        # Future forecast for PERIOD
        forecast_future = model_fit.get_forecast(steps=period)

        # starting with yesterday
        formatted_time = (date.today() - timedelta(days=1)).strftime("%Y-%m-%d")

        # merging dataframes
        future_dates = pd.date_range(start=formatted_time, periods=period, freq='D') + pd.DateOffset(days=1)
        forecast_df = pd.DataFrame(
            {'forecast_time': future_dates, 'forecast_added': forecast_future.predicted_mean.round()}
        )

        logging.debug("beginning forecast write")
        dictified = [
            ForecastsDataTable(
                **{
                    **item,
                    'parent_forecast': parent_forecast,
                    'forecast_type': enum
                }
            ) for item in forecast_df.to_dict('records')
        ]
        logging.debug(f"forecast data to write into db ${dictified}")

        # if DEBUG:
        #     import matplotlib
        #     from matplotlib import pyplot as plt
        #     matplotlib.use('TkAgg')
        #
        #     # dataframe concatenation
        #     df = pd.concat([df, forecast_df], ignore_index=True)
        #
        #     # visualization for debug
        #     plt.figure(figsize=(12, 6))
        #     plt.plot(df['time'][:-period], df['added_on_day'][:-period], label='Initial Data')
        #     plt.plot(df['forecast_dates'][-period:], df['forecast_losses'][-period:], label='Forecasting Data')
        #     plt.title('Losses Forecast')
        #     plt.xlabel('Date')
        #     plt.ylabel('Losses')
        #     plt.legend()
        #     plt.grid(True)
        #     plt.show()
        logging.debug("added forecast to session")
        logging.debug(f"forecast created for category {enum}")
        return dictified

    @classmethod
    async def create_all_forecasts_if_needed(cls, session: AsyncSession):
        logging.debug("create_all_forecasts_if_needed")
        # Given datetime
        forecast_time = await ForecastService.__get_last_forecast_date(session)

        # also need to make sure that the data worth preparing forecast
        last_record_time = await ForecastService.__get_last_forecast_date(session)

        logging.debug(f"last forecast date: {forecast_time}")

        # Current datetime
        current_datetime = datetime.now()

        # Check if the given datetime is on the current day
        if not forecast_time or (forecast_time.date() != current_datetime.date()) or (
                forecast_time.date() < last_record_time.date()):
            logging.debug("preparing new forecast")
            parent_forecast = ForecastService.create_parent_forecast(session)
            for losses_item in LossesProjectEnum.list():
                table = losses_enum_to_table_mapper(losses_item)
                data = (await session.execute(select(table).order_by(table.time))) \
                    .scalars() \
                    .all()

                forecast_data = ForecastService.prepare_forecast_for_category(
                    losses_item,
                    parent_forecast,
                    data
                )

                session.add_all(forecast_data)
        else:
            logging.debug("skipping forecast preparation; the date is same")

    @classmethod
    async def get_prediction(
        cls,
        session: AsyncSession,
        enum: LossesProjectEnum,
        base_loss: int
    ) -> List[LossDataPoint]:
        records = []
        result = await session.execute(
            select(ForecastsDataTable.parent_forecast_id).filter(ForecastsDataTable.forecast_type == enum).order_by(
                ForecastsDataTable.parent_forecast_id.desc()
            ).limit(1)
        )
        max_forecast_id = result.scalars().first()

        result = await session.execute(
            select(ForecastsDataTable).where(
                and_(
                    ForecastsDataTable.parent_forecast_id == max_forecast_id,
                    ForecastsDataTable.forecast_type == enum
                )
            )
        )

        # Assume incremental_value is the value you want to add incrementally
        losses_total = base_loss

        for item in result.scalars().all():
            item: ForecastsDataTable
            losses_total += item.forecast_added  # Increment the 'losses' total
            record = LossDataPoint(day_increment=item.forecast_added, losses=losses_total, time=item.forecast_time)
            records.append(record)

        return records
