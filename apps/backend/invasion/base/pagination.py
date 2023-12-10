from datetime import date

from invasion.config import INVASION_START


class PaginationParameters:
    def __init__(self, offset_from: date, offset_to: date):
        self.offset_from = offset_from
        self.offset_to = offset_to


class PaginationException(Exception):
    """Raised when the input value is less than 18"""
    pass


def pagination(date_from: date = INVASION_START, date_to: date = date.today()) -> PaginationParameters:
    if date_from < INVASION_START or date_to > date.today() or date_to < date_from:
        raise PaginationException
    return PaginationParameters(date_from, date_to)
