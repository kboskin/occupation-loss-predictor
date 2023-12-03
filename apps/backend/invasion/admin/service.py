import datetime
from sqlalchemy import select

from invasion.db.engine import async_session
from invasion.db.models import PersonnelLossesTable
from invasion.integrations.minfin import scrap_minfin_data


class AdminService:

    @classmethod
    async def update_statistic(cls):
        invasion_start = 2022
        present_year = datetime.date.today().year
        months = list(range(1, 13))
        years = list(range(invasion_start, present_year - (present_year - invasion_start) + 2))

        last_personnel_record = await async_session.execute(
            select(PersonnelLossesTable).order_by(PersonnelLossesTable.c.id).limit(1)
        )

        last_personnel_record = last_personnel_record.fetchone()
        if last_personnel_record is not None:
            # db already has something
            day = last_personnel_record.added_on_day
            print(day)

        for year in years:
            for month in months:
                if year == invasion_start and month < 2:
                    continue
                else:
                    scrap_minfin_data(year, month)