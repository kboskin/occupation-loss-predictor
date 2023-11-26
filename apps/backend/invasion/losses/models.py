from typing import List

from pydantic import BaseModel


class SingleResponseLoss(BaseModel):
    type: str
    history: List[float]
    prediction: List[float]


class LossesResponseModel(BaseModel):
    message: str
    data: List[SingleResponseLoss]
