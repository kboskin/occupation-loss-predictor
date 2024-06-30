import React, {useEffect, useState} from "react";
import {useTranslation} from "next-i18next";
import LineChart from "./lineChart";
import {Loss, LossType} from "../../../redux/losses/models";

interface GroupChartProps {
    data: Loss[];
}

const SLICE = -14;
const FORECAST_SLICE = 7;

const GroupChart = (props: GroupChartProps) => {
    const {t} = useTranslation();
    const [windowWidth, setWindowWidth] = useState<number | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setWindowWidth(window.innerWidth);

            // Optionally, update windowWidth on resize
            const handleResize = () => setWindowWidth(window.innerWidth);
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }
    }, []);

    if (!props.data) {
        return null;
    }

    const trendingItems = select2UniqueCategories(props.data);
    const flatTrendingItems = [...trendingItems[0], ...trendingItems[1]];
    const sortableList = props.data.slice();
    const filteredSortableList = sortableList.filter(n => !flatTrendingItems.includes(n));
    const skipCategories: string[] = [];

    return (
        <div className="text-center sm:px-2 md:px-4 lg:gap-4 md:gap-2" id="forecast-charts">
            {sortableList
                .sort((a, b) => {
                    if (a.type === LossType.PERSONNEL) {
                        return -1;
                    } else if (
                        a.type === LossType.MISSILES ||
                        a.type === LossType.AIRCRAFT ||
                        a.type === LossType.HELICOPTERS ||
                        a.type === LossType.WARSHIPS
                    ) {
                        return 1;
                    } else {
                        return 0;
                    }
                })
                .map(dataItem => {
                    if (dataItem.type === LossType.PERSONNEL) {
                        return (
                            <React.Fragment key={dataItem.type}>
                                <h2 className="text-3xl lg:text-4xl mt-16 font-bold">{t("main_page.forecast_trending")}</h2>
                                {windowWidth && (
                                    <LineChart
                                        key={dataItem.type}
                                        width={windowWidth - windowWidth * 0.12}
                                        data={dataItem.history.slice(SLICE)}
                                        forecast={dataItem.prediction.slice(0, FORECAST_SLICE)}
                                        category={dataItem.type}
                                        showHeader={true}
                                    />
                                )}
                            </React.Fragment>
                        );
                    } else if (
                        dataItem.type === LossType.MISSILES ||
                        dataItem.type === LossType.AIRCRAFT ||
                        dataItem.type === LossType.HELICOPTERS ||
                        dataItem.type === LossType.WARSHIPS
                    ) {
                        if (skipCategories.includes(dataItem.type)) {
                            return <div key={dataItem.type}/>;
                        } else {
                            skipCategories.push(LossType.MISSILES, LossType.AIRCRAFT, LossType.HELICOPTERS, LossType.WARSHIPS);
                            return (
                                <React.Fragment key={dataItem.type}>
                                    <h2 className="text-3xl lg:text-4xl mt-16 lg:mt-16 font-bold">{t("main_page.forecast_unique")}</h2>
                                    {trendingItems.map((items, index) => (
                                        <div className="md:grid md:grid-cols-2 mt-4" key={index}>
                                            {items.map(dataItem => (
                                                windowWidth && (
                                                    <LineChart
                                                        width={(windowWidth / getSupportedColumnsCount(windowWidth)) - windowWidth * 0.1}
                                                        key={dataItem.type}
                                                        data={dataItem.history.slice(SLICE)}
                                                        forecast={dataItem.prediction.slice(0, FORECAST_SLICE)}
                                                        category={dataItem.type}
                                                        showHeader={true}
                                                    />
                                                )
                                            ))}
                                        </div>
                                    ))}
                                </React.Fragment>
                            );
                        }
                    } else {
                        if (skipCategories.includes(dataItem.type)) {
                            return <div key={dataItem.type}/>;
                        } else {
                            skipCategories.push(...filteredSortableList.map(item => item.type));
                            return (
                                <React.Fragment key={dataItem.type}>
                                    <h2 className="text-3xl lg:text-4xl mt-16 lg:mt-16 font-bold">{t("main_page.forecast_other")}</h2>
                                    <div className="md:grid md:grid-cols-2 lg:grid-cols-3 mt-4">
                                        {filteredSortableList.map(dataItem => (
                                            windowWidth && (
                                                <LineChart
                                                    width={(windowWidth / getSupportedColumnsCount(windowWidth)) - windowWidth * 0.1}
                                                    key={dataItem.type}
                                                    data={dataItem.history.slice(SLICE)}
                                                    forecast={dataItem.prediction.slice(0, FORECAST_SLICE)}
                                                    category={dataItem.type}
                                                    showHeader={true}
                                                />
                                            )
                                        ))}
                                    </div>
                                </React.Fragment>
                            );
                        }
                    }
                })}
        </div>
    );
};

const select2UniqueCategories = (losses: Loss[]): Loss[][] => {
    const filtered = losses.filter(dataItem =>
        [LossType.MISSILES, LossType.AIRCRAFT, LossType.HELICOPTERS, LossType.WARSHIPS].includes(dataItem.type)
    );

    const list: Loss[][] = [[], []];
    filtered.forEach(item => {
        if (list[0].length < 2) {
            list[0].push(item);
        } else {
            list[1].push(item);
        }
    });
    return list;
};

function getSupportedColumnsCount(windowWidth: number | null): number {
    if (windowWidth === null) return 1;
    if (windowWidth <= 576) return 1;
    if (windowWidth <= 768) return 1;
    if (windowWidth <= 992) return 2;
    if (windowWidth <= 1200) return 2;
    if (windowWidth <= 1400) return 3;
    return 3;
}

export default GroupChart;
