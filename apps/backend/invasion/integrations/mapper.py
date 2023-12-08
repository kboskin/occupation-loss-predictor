from invasion.admin.models import LossesProjectEnum
from invasion.integrations.minfin import MinFinEnum


def minfin_enum_to_project_mapper(model_type: MinFinEnum) -> LossesProjectEnum:
    match model_type:
        case MinFinEnum.aircraft:
            return LossesProjectEnum.aircraft
        case MinFinEnum.aircraft_warfare:
            return LossesProjectEnum.aircraft_warfare
        case MinFinEnum.aircraft_warfare_2:
            return LossesProjectEnum.aircraft_warfare
        case MinFinEnum.apv:
            return LossesProjectEnum.apv
        case MinFinEnum.artillery:
            return LossesProjectEnum.artillery
        case MinFinEnum.fuel_tanks:
            return LossesProjectEnum.fuel_tanks
        case MinFinEnum.fuel_tanks_2:
            return LossesProjectEnum.fuel_tanks
        case MinFinEnum.fuel_tanks_3:
            return LossesProjectEnum.fuel_tanks
        case MinFinEnum.helicopters:
            return LossesProjectEnum.helicopters
        case MinFinEnum.missiles:
            return LossesProjectEnum.missiles
        case MinFinEnum.mlrs:
            return LossesProjectEnum.mlrs
        case MinFinEnum.mlrs_2:
            return LossesProjectEnum.mlrs
        case MinFinEnum.uav:
            return LossesProjectEnum.uav
        case MinFinEnum.personnel:
            return LossesProjectEnum.personnel
        case MinFinEnum.special_equipment:
            return LossesProjectEnum.special_equipment
        case MinFinEnum.ballistic:
            #special case
            return LossesProjectEnum.special_equipment
        case MinFinEnum.submarines:
            return LossesProjectEnum.submarines
        case MinFinEnum.tanks:
            return LossesProjectEnum.tanks
        case MinFinEnum.warships:
            return LossesProjectEnum.warships