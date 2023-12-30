import {useEffect, useRef, useState} from "react";
import * as d3 from "d3";
import {LossDataPoint, LossType} from "../../../redux/losses/models";
import {useTranslation} from "next-i18next";
import {mapCategoryToTranslation} from "../../../utils/category";

enum DataType {
    REGULAR_DATA,
    FORECAST
}

interface LineChartProps {
    data: LossDataPoint[]
    forecast: LossDataPoint[]
    category: LossType
    width?: number
    showHeader: boolean
}

interface ChartData {
    dayIncr: number
    day: Date
    type: DataType
}

const LineChart = (props: LineChartProps) => {

    const [chartData, setChartData] = useState<ChartData[]>(
        props.data.map((item) => {
            return {dayIncr: item.day_increment, day: d3.isoParse(item.time), type: DataType.REGULAR_DATA}
        })
    )
    const {t} = useTranslation()

    const svgRef = useRef();
    useEffect(() => {
        // setting up svg
        const w = props.width ?? getChartWidth();
        const h = window.innerHeight / 3;

        const xAccessor = d => d.day
        const yAccessor = d => d.dayIncr

        const svg = d3
            .select(svgRef.current)
            .attr("width", w)
            .attr("height", h)
            .attr("stroke-width", 1.5)
            .style("overflow", "visible")

        // setting the scaling
        const xScale = d3.scaleTime()
            .domain(d3.extent(chartData, xAccessor))
            .range([0, w])

        //yscales
        const yScale = d3.scaleLinear()
            .domain(d3.extent(chartData, yAccessor))
            .range([h, 0])
            .nice()

        // line function
        const generateScaledLine = d3
            .line()
            .x((d) => xScale(xAccessor(d)))
            .y((d) => yScale(yAccessor(d)))
            .curve(d3.curveMonotoneX);

        // setting the axes
        const xAxis = d3
            .axisBottom(xScale)
            .ticks(chartData.length)
            .tickFormat(d3.timeFormat("%m-%d"))

        const yAxis = d3
            .axisLeft(yScale)
            .ticks(chartData.length);

        svg
            .append("g")
            .call(yAxis)
            .attr("stroke", "color-light");

        svg
            .append("g")
            .call(xAxis)
            .attr("transform", `translate(0, ${h})`)
            .attr("stroke", "color-light")

        // setting up the data for the svg
        svg
            .selectAll(".line")
            .data([chartData])
            .enter()
            .append('path')
            .attr("d", generateScaledLine)
            .attr("stroke", "#96b85d")

    }, [chartData]);
    return (
        <div className="text-center">
            {props.showHeader && <h3 className="text-2xl font-bold mb-8 mt-4 text-white">{`${t('forecast_chart_title')} ${mapCategoryToTranslation(props.category, t)}`}</h3> }
            <svg ref={svgRef} style={{display: "block", margin: "auto", marginBottom: "30px"}} className="mt-8"/>
        </div>
    );
};

const getChartWidth = () => {
    if (window.innerWidth >= 1200) {
        return (window.innerWidth - 200) / 3
    } else {
        return window.innerWidth - 100
    }
}

export default LineChart;