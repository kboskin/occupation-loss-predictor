from datetime import datetime
from zoneinfo import ZoneInfo


def time_now_assuming_tz() -> datetime:
    return datetime.now(ZoneInfo("Europe/Kiev"))
