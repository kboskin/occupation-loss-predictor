from datetime import datetime
from enum import Enum
from typing import List

from pydantic import BaseModel


class LossesProjectEnum(str, Enum):
    aircraft = 'aircraft'
    aircraft_warfare = 'aircraft_warfare'
    apv = 'apv'
    artillery = 'artillery'
    fuel_tanks = 'fuel_tanks'
    helicopters = 'helicopters'
    missiles = 'missiles'
    mlrs = 'mlrs'
    personnel = 'personnel'
    special_equipment = 'special_equipment'
    submarines = 'submarines'
    tanks = 'tanks'
    uav = 'uav'
    warships = 'warships'


class LossesProjectModel(BaseModel):
    time: datetime
    losses: int
    added_on_day: int
    type: LossesProjectEnum


class ScrapDataHolder(BaseModel):
    original_models: List[LossesProjectModel]
    tables_mapped: List[object]
