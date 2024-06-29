from datetime import timedelta, datetime, date

from pydantic import BaseModel


class DateRange(BaseModel):
    start_date: date
    end_date: datetime


def datetime_range(date_range: DateRange):
    start_date = date_range.start_date
    current_date = datetime(start_date.year, start_date.month, start_date.day)
    while current_date <= date_range.end_date:
        yield current_date
        current_date += timedelta(days=1)
