import {UseTranslation} from "next-i18next";
import {LossType} from "../redux/losses/models";

const mapCategoryToTranslation = (cat: LossType, t: UseTranslation): string => {
    switch (cat) {
        case LossType.AIRCRAFT: { return t('category_aircraft')}
        case LossType.AIRCRAFT_WARFARE: { return t('category_aircraft_warfare')}
        case LossType.APV: { return t('category_apv')}
        case LossType.ARTILLERY: { return t('category_artillery')}
        case LossType.FUEL_TANKS: { return t('category_fuel_tanks')}
        case LossType.HELICOPTERS: { return t('category_helicopters')}
        case LossType.MISSILES: { return t('category_missiles')}
        case LossType.MLRS: { return t('category_mlrs')}
        case LossType.PERSONNEL: { return t('category_personnel')}
        case LossType.SPECIAL_EQUIP: { return t('category_special_equipment')}
        case LossType.SUBMARINES: { return t('category_submarines')}
        case LossType.TANKS: { return t('category_tanks')}
        case LossType.UAV: { return t('category_uav')}
        case LossType.WARSHIPS: { return t('category_warships')}

        default: {
            //statements;
            break;
        }
    }
}

const mapCategoryToImage = (cat: LossType): string => {
    console.log(cat)
    return `images/emoji/${cat}.png`
}

export { mapCategoryToTranslation, mapCategoryToImage }