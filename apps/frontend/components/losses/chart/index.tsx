import {useEffect, useRef, useState} from "react";
import * as d3 from "d3";
import { LossDataPoint, LossType} from "../../../redux/losses/models";
import {useTranslation} from "next-i18next";
import {mapCategoryToTranslation} from "../../../utils/category";
import {curveLinear} from "d3-shape";


interface LineChartProps {
    data: LossDataPoint[]
    forecast: LossDataPoint[]
    category: LossType
}

const LineChart = (props: LineChartProps) => {
    const [data, setData] = useState(props.data.map((item) => item.day_increment))
    const {t} = useTranslation()

    const svgRef = useRef();
    useEffect(() => {
        // setting up svg
        console.log("rendering")

        const w = getChartWidth();
        const h = window.innerHeight / 3;
        const svg = d3
            .select(svgRef.current)
            .attr("width", w)
            .attr("height", h)
            .style("overflow", "visible")

        // setting the scaleing
        // xscales
        const xScale = d3
            .scaleLinear()
            .domain([0, data.length - 1])
            .range([0, w]);
        //yscales
        const yScale = d3.scaleLinear()
            .domain([0, Math.max(...data)])
            .range([h, 0]);

        //  Setup functions to draw Lines ---------------//
        const generateScaledLine = d3
            .line()
            .x((d, i) => xScale(i))
            .y(yScale)
            .curve(d3.curveLinear);

        // setting the axes
        const xAxis = d3
            .axisBottom(xScale)
            .ticks(1 + data.length)
            .tickFormat((i) => i + 1);

        const yAxis = d3.axisLeft(yScale).ticks(10);

        svg
            .append("g")
            .call(yAxis)
            .attr("stroke", "red");

        svg
            .append("g")
            .call(xAxis)
            .attr("transform", `translate(0, ${h})`)
            // .attr("transform", `translate(0,${h})`)
            .attr("stroke", "red")
        // setting up the data for the svg
        svg
            .selectAll(".line")
            .data([data])
            .join("path")
            .attr("d", (d) => generateScaledLine(d))
            .attr("fill", "none")
            .attr("stroke", "#96b85d")
    }, [data]);
    return (
        <div className="text-center">
            <h2 className="text-2xl font-bold mb-8 mt-4 text-white">{`${t('forecast_chart_title')} ${mapCategoryToTranslation(props.category, t)}`}</h2>
            <svg ref={svgRef} style={{display: "block", margin: "auto", marginBottom: "30px"}} className="mt-8"/>
        </div>
    );
};

const getChartWidth = () => {
    if (window.innerWidth >= 1200) {
        return (window.innerWidth - 200) / 2
    } else {
        return window.innerWidth - 100
    }
}

export default LineChart;