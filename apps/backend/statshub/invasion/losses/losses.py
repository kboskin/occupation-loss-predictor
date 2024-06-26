import logging
from typing import List

import sentry_sdk

from invasion.admin.base import LossesProjectEnum


class BrokenLossTypeException(Exception):
    """Raised when hash of category is not equal to anything"""
    pass


def check_losses_category(cat: str | None = None) -> List[LossesProjectEnum]:
    tables = [e for e in LossesProjectEnum]
    if cat:
        try:
            enumed = LossesProjectEnum(cat)
            if enumed not in tables:
                raise BrokenLossTypeException
        except Exception as e:
            logging.debug(f"decoding exception {e}")
            sentry_sdk.capture_exception(e)
            raise BrokenLossTypeException

    categories: List[LossesProjectEnum] = []
    if cat:
        categories.append(enumed)
    else:
        categories = [item.value for item in LossesProjectEnum]

    return categories
