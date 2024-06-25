import logging
from datetime import date
from typing import Optional

from invasion.config import INVASION_START


class PaginationParameters:
    def __init__(self, offset_from: date, offset_to: date):
        self.offset_from = offset_from
        self.offset_to = offset_to


class PaginationException(Exception):
    """Raised when the input value is less than 18"""
    pass


def pagination(date_from: date = INVASION_START, date_to: Optional[date] = None) -> PaginationParameters:
    logging.debug(f"Pagination request parameters: \n from {date_from} \n to {date_to}")

    if date_to is None:
        date_to = date.today()

    logging.debug(f"Pagination request parameters wrapped: \n from {date_from} \n to {date_to}")

    if date_from < INVASION_START or date_to > date.today() or date_to < date_from:
        raise PaginationException
    return PaginationParameters(date_from, date_to)
