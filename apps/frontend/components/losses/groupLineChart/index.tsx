// @ts-nocheck

import {Loss, LossType} from "../../../redux/losses/models";
import {useTranslation} from "next-i18next";
import LineChart from "./lineChart";

interface GroupChartProps {
    data: Loss[]
}

const SLICE = -14
const FORECAST_SLICE = 7
const GroupChart = (props: GroupChartProps) => {
    const {t} = useTranslation()

    if (!props.data) {
        return
    }
    const trendingItems = select2UniqueCategories(props.data)
    const flatTrendingItems = [...trendingItems[0], ...trendingItems[1]]
    const sortableList = props.data.slice()
    const filteredSortableList = sortableList.filter(n => !flatTrendingItems.includes(n))

    const skipCategories = []
    return (
        <div className="text-center sm:px-2 md:px-4 lg:gap-4 md:gap-2" id="forecast-charts">
            {props.data && sortableList.sort((a, b) => {
                if (a.type == LossType.PERSONNEL) {
                    return -1
                } else if (a.type == LossType.MISSILES
                    || a.type == LossType.AIRCRAFT
                    || a.type == LossType.HELICOPTERS
                    || a.type == LossType.WARSHIPS) {
                    return 1
                } else {
                    return 0
                }
            }).map((dataItem) => {
                    if (dataItem.type == LossType.PERSONNEL) {
                        return (
                            <>
                                <h2 className="text-3xl lg:text-4xl mt-16 font-bold">{t('main_page.forecast_trending')}</h2>
                                <LineChart
                                    key={dataItem.type}
                                    width={window.innerWidth - window.innerWidth * 0.12}
                                    data={dataItem.history.slice(SLICE)}
                                    forecast={dataItem.prediction.slice(0, FORECAST_SLICE)}
                                    category={dataItem.type}
                                    showHeader={true}
                                />
                            </>
                        )
                    } else if (
                        dataItem.type == LossType.MISSILES
                        || dataItem.type == LossType.AIRCRAFT
                        || dataItem.type == LossType.HELICOPTERS
                        || dataItem.type == LossType.WARSHIPS
                    ) {
                        if (skipCategories.includes(dataItem.type)) {
                            return (<div key={dataItem.type}/>)
                        } else {
                            skipCategories.push(LossType.MISSILES, LossType.AIRCRAFT, LossType.HELICOPTERS, LossType.WARSHIPS)
                            return (
                                <>
                                    <h2 className="text-3xl lg:text-4xl mt-16 lg:mt-16 font-bold">{t('main_page.forecast_unique')}</h2>
                                    {
                                        trendingItems.map((items) => {
                                            return (
                                                <>
                                                    <div className="md:grid md:grid-cols-2 mt-4" key={dataItem.type}>
                                                        {
                                                            items.map((dataItem) =>
                                                                <LineChart
                                                                    width={(window.innerWidth / getSupportedColumnsCount() - window.innerWidth * 0.1)}
                                                                    key={dataItem.type}
                                                                    data={dataItem.history.slice(SLICE)}
                                                                    forecast={dataItem.prediction.slice(0, FORECAST_SLICE)}
                                                                    category={dataItem.type} showHeader/>
                                                            )
                                                        }
                                                    </div>
                                                </>
                                            )
                                        })}
                                </>
                            )
                        }
                    } else {
                        if (skipCategories.includes(dataItem.type)) {
                            return (<div key={dataItem.type}/>)
                        } else {
                            skipCategories.push(...filteredSortableList.map((item) => item.type))
                            return (
                                <>
                                    <h2 className="text-3xl lg:text-4xl mt-16 lg:mt-16 font-bold">{t('main_page.forecast_other')}</h2>
                                    <div className="md:grid md:grid-cols-2 lg:grid-cols-3 mt-4">
                                        {filteredSortableList.map((dataItem) => {
                                            return (
                                                <LineChart
                                                    width={(window.innerWidth / getSupportedColumnsCount() - window.innerWidth * 0.1)}
                                                    key={dataItem.type}
                                                    data={dataItem.history.slice(SLICE)}
                                                    forecast={dataItem.prediction.slice(0, FORECAST_SLICE)}
                                                    category={dataItem.type} showHeader/>
                                            )
                                        })}

                                    </div>
                                </>
                            )
                        }
                    }

                }
            )}

        </div>
    )
}

const select2UniqueCategories = (losses: Loss[]): Loss[][] => {
    const filtered = losses.filter((dataItem) => dataItem.type == LossType.MISSILES
        || dataItem.type == LossType.AIRCRAFT
        || dataItem.type == LossType.HELICOPTERS
        || dataItem.type == LossType.WARSHIPS
    )

    const list = []
    filtered.forEach((item) => {

        if (list.length == 0) {
            list.push([], [])
        }

        if (list[0].length == 2) {
            list[1].push(item)
        } else {
            if (list[0].length > 0) {
                list[0].push(item)
            } else {
                list[0].push(item)
            }
        }
    })
    return list

}

function getSupportedColumnsCount(): number {
    const width = Math.max(
        document.documentElement.clientWidth,
        window.innerWidth || 0
    )
    if (width <= 576) return 1
    if (width <= 768) return 1
    if (width <= 992) return 2
    if (width <= 1200) return 2
    if (width <= 1400) return 3
    return 3
}

export default GroupChart