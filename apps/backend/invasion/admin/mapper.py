from invasion.db.models import AircraftLossesTable, AircraftWarfareLossesTable, APVLossesTable, ArtilleryLossesTable
from invasion.db.models import FuelTanksLossesTable, HelicoptersLossesTable, MissilesLossesTable, MLRSLossesTable
from invasion.db.models import PersonnelLossesTable, SpecialLossesTable, SubmarinesLossesTable, TanksLossesTable
from invasion.db.models import UAVLossesTable, WarshipsLossesTable
from invasion.db.models import GenericLossTable

from invasion.admin.models import LossesProjectModel
from invasion.admin.base import LossesProjectEnum
from invasion.integrations.mapper import minfin_enum_to_project_mapper
from pydantic.typing import List

from invasion.integrations.minfin import MinFinModel


def losses_to_orm_mapper(model: LossesProjectModel) -> GenericLossTable:
    dictified = dict(model)
    del dictified['type']
    match model.type:
        case LossesProjectEnum.aircraft:
            return AircraftLossesTable(**dictified)
        case LossesProjectEnum.aircraft_warfare:
            return AircraftWarfareLossesTable(**dictified)
        case LossesProjectEnum.apv:
            return APVLossesTable(**dictified)
        case LossesProjectEnum.artillery:
            return ArtilleryLossesTable(**dictified)
        case LossesProjectEnum.fuel_tanks:
            return FuelTanksLossesTable(**dictified)
        case LossesProjectEnum.helicopters:
            return HelicoptersLossesTable(**dictified)
        case LossesProjectEnum.missiles:
            return MissilesLossesTable(**dictified)
        case LossesProjectEnum.mlrs:
            return MLRSLossesTable(**dictified)
        case LossesProjectEnum.personnel:
            return PersonnelLossesTable(**dictified)
        case LossesProjectEnum.special_equipment:
            return SpecialLossesTable(**dictified)
        case LossesProjectEnum.submarines:
            return SubmarinesLossesTable(**dictified)
        case LossesProjectEnum.tanks:
            return TanksLossesTable(**dictified)
        case LossesProjectEnum.uav:
            return UAVLossesTable(**dictified)
        case LossesProjectEnum.warships:
            return WarshipsLossesTable(**dictified)


def losses_enum_to_table_mapper(enum: LossesProjectEnum) -> GenericLossTable:
    match enum:
        case LossesProjectEnum.aircraft:
            return AircraftLossesTable
        case LossesProjectEnum.aircraft_warfare:
            return AircraftWarfareLossesTable
        case LossesProjectEnum.apv:
            return APVLossesTable
        case LossesProjectEnum.artillery:
            return ArtilleryLossesTable
        case LossesProjectEnum.fuel_tanks:
            return FuelTanksLossesTable
        case LossesProjectEnum.helicopters:
            return HelicoptersLossesTable
        case LossesProjectEnum.missiles:
            return MissilesLossesTable
        case LossesProjectEnum.mlrs:
            return MLRSLossesTable
        case LossesProjectEnum.personnel:
            return PersonnelLossesTable
        case LossesProjectEnum.special_equipment:
            return SpecialLossesTable
        case LossesProjectEnum.submarines:
            return SubmarinesLossesTable
        case LossesProjectEnum.tanks:
            return TanksLossesTable
        case LossesProjectEnum.uav:
            return UAVLossesTable
        case LossesProjectEnum.warships:
            return WarshipsLossesTable


def minfin_to_losses_mapper(models: List[MinFinModel]) -> List[LossesProjectModel]:
    return [LossesProjectModel(**{
        "time": model.date,
        "type": minfin_enum_to_project_mapper(model.type),
        "added_on_day": model.losses_increase,
        "losses": model.losses
    }) for model in models]
