import datetime
import logging
from typing import List

import pandas as pd
from sqlalchemy import select, desc, exists

from invasion.admin.mapper import minfin_to_losses_mapper, losses_enum_to_table_mapper
from invasion.admin.models import LossesProjectModel, ScrapDataHolder
from invasion.db.engine import async_session
from invasion.db.models import PersonnelLossesTable
from invasion.integrations.minfin import scrap_minfin_data


class AdminService:

    @classmethod
    async def update_statistic(cls):
        invasion_start = 2022
        present_date = datetime.date.today()
        present_year = present_date.year
        present_month = present_date.month
        months = list(range(1, 13))
        years = list(range(invasion_start, present_year - (present_year - invasion_start) + 2))

        last_personnel_record = await async_session.execute(
            select(PersonnelLossesTable).order_by(desc(PersonnelLossesTable.time)).limit(1)
        )

        last_personnel_record: PersonnelLossesTable = last_personnel_record.scalars().one()
        if last_personnel_record is not None:
            # db already has something, sync missing days between last record and present day
            last_record_time = last_personnel_record.time
            time_diff = [
                pd.to_datetime(last_record_time).normalize() + datetime.timedelta(days=x)
                for x in range(
                    (pd.to_datetime(present_date).normalize() - pd.to_datetime(last_record_time).normalize()).days
                )
            ]
            time_diff = list(set([(item.year, item.month) for item in time_diff]))
            time_diff.reverse()

            logging.debug(f"time diff {time_diff} last personnel record {last_record_time}")

            year_to_start = last_record_time.year
            month_to_start = last_record_time.month
            day_to_start = last_record_time.day

            for pair in time_diff:
                logging.debug(f"current pair f{pair}")
                # sync only missing days
                scrap_results = AdminService._scrap(pair[0], pair[1])
                table_models: List[object] = scrap_results.tables_mapped
                available_models: List[LossesProjectModel] = scrap_results.original_models

                logging.debug(f"starting from year, month, day {year_to_start, month_to_start, day_to_start}")

                for index in range(len(available_models)):
                    # but filter tables that should require update
                    table_model = table_models[index]
                    table_class = table_model.__class__
                    record_present = (
                        await async_session.execute(
                            exists().where(table_class.time == table_model.time).select()
                        )
                    ).scalars().one()
                    # insert only if model with such time didn't exist
                    logging.debug(f"record present? {table_model.__class__}, {table_model.time}, {record_present}")
                    if not record_present:
                        logging.debug(f"record wasn't present {table_model.__class__}, {table_model.time}")
                        async_session.add(table_model)
        else:
            # db is empty
            for year in years:
                for month in months:
                    if year >= present_year and month > present_month:
                        # break if month > one in curr year
                        break
                    elif year == invasion_start and month < 2:
                        continue
                    else:
                        async_session.add_all(AdminService._scrap(year, month).tables_mapped)
        await async_session.commit()

    @classmethod
    def _scrap(cls, year, month) -> ScrapDataHolder:
        logging.debug(f"scrapping data for {year}-{month}")
        models: List[LossesProjectModel] = minfin_to_losses_mapper(scrap_minfin_data(year, month))
        updated_models = [losses_enum_to_table_mapper(model) for model in models]
        logging.debug(f"models after scrapping {updated_models}")

        return ScrapDataHolder(**{"original_models": models, "tables_mapped": updated_models})
