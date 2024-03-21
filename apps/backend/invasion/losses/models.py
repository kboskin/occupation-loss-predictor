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


class AggregationCategoryTotal(BaseModel):
    name: str
    value: int


class AggregationYearTotal(BaseModel):
    name: int
    value: int
    children: List[AggregationCategoryTotal]


class AggregationResult(BaseModel):
    children: List[AggregationYearTotal]


class AggregationDbLoss(BaseModel):
    year: int
    total: int
    type: LossesProjectEnum


class AggregationResponseModel(BaseModel):
    message: str = "OK"
    data: AggregationResult
