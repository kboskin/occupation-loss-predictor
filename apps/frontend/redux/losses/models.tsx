export enum LossType {
    AIRCRAFT = 'aircraft',
    AIRCRAFT_WARFARE = 'aircraft_warfare',
    APV = 'apv',
    ARTILLERY = 'artillery',
    FUEL_TANKS = 'fuel_tanks',
    HELICOPTERS = 'helicopters',
    MISSILES = 'missiles',
    MLRS = 'mlrs',
    PERSONNEL = 'personnel',
    SPECIAL_EQUIP = 'special_equipment',
    SUBMARINES = 'submarines',
    TANKS = 'tanks',
    UAV = 'uav',
    WARSHIPS = 'warships'
}

export interface LossDataPoint {
    day_increment: number
    losses: number
    time: String
}

export interface Loss {
    type: LossType
    history: LossDataPoint[]
    prediction: LossDataPoint[]
}