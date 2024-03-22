import datetime
from typing import List

from pydantic import BaseModel

from invasion.admin.base import LossesProjectEnum


# "losses"

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


# "losses" end


# "/yearly/aggregation"
class AggregationCategoryTotal(BaseModel):
    name: LossesProjectEnum
    value: int


class AggregationYearTotal(BaseModel):
    name: int
    value: int
    children: List[AggregationCategoryTotal]


class AggregationYearResult(BaseModel):
    children: List[AggregationYearTotal]


class AggregationYearlyResponseModel(BaseModel):
    message: str = "OK"
    data: AggregationYearResult


# "losses/yearly/aggregation" end


# "/category/aggregation"

class AggregationCategoryYearly(BaseModel):
    name: LossesProjectEnum
    value: int
    children: List[AggregationYearTotal]


class AggregationCategoryResult(BaseModel):
    children: List[AggregationCategoryYearly]


class AggregationCategoryResponseModel(BaseModel):
    message: str = "OK"
    data: AggregationCategoryResult

# "/category/aggregation" end
