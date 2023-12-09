from typing import List

from pydantic import BaseModel


class SingleResponseLoss(BaseModel):
    type: str
    history: List[float]
    prediction: List[float]


class SingleResponseLossNoHistory(BaseModel):
    type: str
    history: List[float]


class LossesResponseModel(BaseModel):
    message: str = "Ok"
    data: List[SingleResponseLoss]


class LossesAggregationModel(BaseModel):
    message: str = "Ok"
    data: List[SingleResponseLossNoHistory] = []
