from enum import Enum


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

    @classmethod
    def list(cls):
        return list(map(lambda c: c.value, cls))
