from pydantic import BaseModel

from invasion import LossesProjectEnum


class AggregationDbLoss(BaseModel):
    year: int
    total: int
    type: LossesProjectEnum
