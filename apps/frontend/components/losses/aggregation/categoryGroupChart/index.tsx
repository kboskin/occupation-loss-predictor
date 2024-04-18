/* eslint-plugin-disable */

import {useEffect, useRef} from "react";
import * as d3 from "d3";
import {useTranslation} from "next-i18next";
import {NumberValue} from "d3";
import {ScaleBand} from "d3-scale";
import {mapCategoryToTranslation} from "../../../../utils/category";

const CategoryBarGroupChart = ({ isLoading, data }: CategoryChartProps) => {
    const svgRef = useRef(null);
    const { t } = useTranslation();

    const width = 1080;
    const height = 800;
    const marginTop = 30;
    const marginRight = 10;
    const marginBottom = 150;
    const marginLeft = 40;

    useEffect(() => {
        if (isLoading || !data) {
            return;
        }

        const fx = d3.scaleBand()
            .domain(data.children.map(d => mapCategoryToTranslation(d.category, t)))
            .rangeRound([marginLeft, width - marginRight])
            .paddingInner(0.1);

        const years = new Set(data.children.flatMap(d => d.children.map(c => c.year)));

        const x: ScaleBand<string> = d3.scaleBand()
            .domain(Array.from(years))
            .rangeRound([0, fx.bandwidth()])
            .padding(0.05);

        const color = d3.scaleOrdinal()
            .domain(Array.from(years))
            .range(d3.schemePurples[years.size])
            .unknown("#ccc");

        const y = d3.scaleLinear()
            .domain([0, d3.max(data.children.flatMap(d => d.children.map(c => c.value)))] as Iterable<NumberValue>).nice()
            .rangeRound([height - marginBottom, marginTop]);

        const svg = d3.select(svgRef.current)
            .attr("viewBox", [0, 0, width, height])
            .style("max-width", `${width}px`)
            .style("font", "12px sans-serif");

        const barGroups = svg.append("g")
            .selectAll("g")
            .data(data.children)
            .join("g")
            .attr("transform", d => `translate(${fx(mapCategoryToTranslation(d.category, t))},-1)`);

        barGroups.selectAll("rect")
            .data(d => d.children)
            .join("rect")
            .attr("x", d => x(d.year) as number)
            .attr("y", d => y(d.value))
            .attr("width", x.bandwidth())
            .attr("height", d => y(0) - y(d.value))
            .attr("fill", d => color(d.year) as string);

        // Add labels for each bar
        barGroups.selectAll("text")
            .data(d => d.children)
            .join("text")
            .attr("x", d => x(d.year) as number)
            .attr("y", d => y(d.value)) // Position the label above the bar
            .attr("text-anchor", "middle")
            .attr("transform", d => `rotate(90, ${x(d.year) as number + x.bandwidth() / 2}, ${y(d.value) - 5})`) // Rotate the label by 90 degrees
            .attr("fill", "white") // Change the color if needed
            .text(d => d.year);

        svg.append("g")
            .attr("transform", `translate(0,${height - marginBottom})`)
            .call(d3.axisBottom(fx).tickSizeOuter(0))
            .call(g => g.selectAll(".domain").remove())
            .selectAll("text")
            .attr("transform", "rotate(-65)")
            .attr("text-anchor", "end")
            .attr("x", -5)
            .attr("y", -5)
            .style("font-size", "14px");

        svg.append("g")
            .attr("transform", `translate(${marginLeft},0)`)
            .call(d3.axisLeft(y).ticks(null, "s"))
            .call(g => g.selectAll(".domain").remove());

        // Cleanup function to remove the SVG when the component unmounts
        return () => {
            d3.select(svgRef.current).selectAll("*").remove();
        };
    }, [isLoading, data]);

    return (
        <div className="text-center m-auto">
            <h3 className="text-3xl lg:text-4xl mt-4 lg:mt-4 font-bold mb-8 mt-4 text-white">{t('losses_category_by_year')}</h3>
            <svg ref={svgRef} className="m-auto mt-4" />
        </div>
    );
};

export default CategoryBarGroupChart;