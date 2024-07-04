import {LossType} from "../redux/losses/models";

const mapCategoryToTranslation = (cat: LossType, t: any): string => {
    switch (cat) {
        case LossType.AIRCRAFT: { return t('common.category_aircraft')}
        case LossType.AIRCRAFT_WARFARE: { return t('common.category_aircraft_warfare')}
        case LossType.APV: { return t('common.category_apv')}
        case LossType.ARTILLERY: { return t('common.category_artillery')}
        case LossType.FUEL_TANKS: { return t('common.category_fuel_tanks')}
        case LossType.HELICOPTERS: { return t('common.category_helicopters')}
        case LossType.MISSILES: { return t('common.category_missiles')}
        case LossType.MLRS: { return t('common.category_mlrs')}
        case LossType.PERSONNEL: { return t('common.category_personnel')}
        case LossType.SPECIAL_EQUIP: { return t('common.category_special_equipment')}
        case LossType.SUBMARINES: { return t('common.category_submarines')}
        case LossType.TANKS: { return t('common.category_tanks')}
        case LossType.UAV: { return t('common.category_uav')}
        case LossType.WARSHIPS: { return t('common.category_warships')}
    }
}

const mapCategoryToImage = (cat: LossType): string => `/images/emoji/${cat}.png`

export { mapCategoryToTranslation, mapCategoryToImage }