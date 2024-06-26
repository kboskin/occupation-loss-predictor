from datetime import datetime
from typing import List

from pydantic import BaseModel

from invasion.admin.base import LossesProjectEnum
from invasion.db.models import GenericLossTable


class LossesProjectModel(BaseModel):
    time: datetime
    losses: int
    added_on_day: int
    type: LossesProjectEnum


class ScrapDataHolder(BaseModel):
    original_models: List[LossesProjectModel]
    tables_mapped: List[GenericLossTable]

    class Config:
        arbitrary_types_allowed = True
