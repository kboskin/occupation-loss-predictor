import datetime
from typing import List

from pydantic import BaseModel

from invasion.admin.base import LossesProjectEnum


class LossDataPoint(BaseModel):
    day_increment: int
    losses: int
    time: datetime.datetime


class Loss(BaseModel):
    type: LossesProjectEnum
    history: List[LossDataPoint]
    prediction: List[LossDataPoint]


class LossesResponseModel(BaseModel):
    message: str = "OK"
    data: List[Loss]
