import {Loss, LossType} from "../../../redux/losses/models";
import {useEffect, useRef, useState} from "react";
import * as d3 from "d3";
import {useTranslation} from "next-i18next";
import {mapCategoryToTranslation} from "../../../utils/category";

interface YearChartProps {
    isLoading: Boolean
    data: AggregationResult
}

interface AggregationCategoryTotal {
    name: string;
    value: number;
}

interface AggregationYearTotal {
    name: number;
    value: number;
    children: AggregationCategoryTotal[];
}

interface AggregationResult {
    children: AggregationYearTotal[];
}

const YearlyGroupChart = (props: YearChartProps) => {

    if (!props.data) {
        return
    }

    const [data, setData] =
        useState({
                "name": "root",
                "children":
                    props.data.children.map((item) => ({
                        "name": item.name,
                        "children": item.children
                    }))
            }
        )

    const {t} = useTranslation()
    const svgRef = useRef(null);

    const breadcrumbWidth = 75
    const breadcrumbHeight = 30

    const width = 700
    const radius = width / 2

    useEffect(() => {
        if (!data) return;

        const partition = data =>
            d3.partition().size([2 * Math.PI, radius * radius])(
                d3
                    .hierarchy(data)
                    .sum((d) => {
                        return d.value
                    })
                    .sort((a, b) => b.name - a.name)
            )

        const color = d3
            .scaleOrdinal()
            .domain([
                LossType.AIRCRAFT,
                LossType.AIRCRAFT_WARFARE,
                LossType.APV,
                LossType.ARTILLERY,
                LossType.FUEL_TANKS,
                LossType.HELICOPTERS,
                LossType.MISSILES,
                LossType.MLRS,
                LossType.PERSONNEL,
                LossType.SPECIAL_EQUIP,
                LossType.SUBMARINES,
                LossType.TANKS,
                LossType.UAV,
                LossType.WARSHIPS,
                "2022",
                "2023",
                "2024",
                "2025",
                "2026"
            ])
            .range([
                "#5d85cf", "#7c6561", "#da7847", "#6fb971", "#9e70cf", "#bbbbbb",
                "#e6194B", "#f58231", "#ffe119", "#bfef45", "#3cb44b", "#42d4f4",
                "#4363d8", "#911eb4",
                // years
            ]);

        const arc = d3
            .arc()
            .startAngle((d) => d.x0)
            .endAngle(d => d.x1)
            .padAngle(1 / radius)
            .padRadius(radius)
            .innerRadius(d => Math.sqrt(d.y0))
            .outerRadius(d => Math.sqrt(d.y1) - 1)
        const mousearc = d3
            .arc()
            .startAngle(d => d.x0)
            .endAngle(d => d.x1)
            .innerRadius(d => Math.sqrt(d.y0))
            .outerRadius(radius)

        const root = partition(data);

        console.log(root)

        const svg = d3.select(svgRef.current)
        // Make this into a view, so that the currently hovered sequence is available to the breadcrumb
        const element = svg.node();
        element.value = {sequence: [], percentage: 0.0};

        const label = svg
            .append("text")
            .attr("text-anchor", "middle")
            .attr("fill", "#888")
            .style("visibility", "hidden");

        label
            .append("tspan")
            .attr("class", "percentage")
            .attr("x", 0)
            .attr("y", 0)
            .attr("dy", "-0.1em")
            .attr("font-size", "3em")
            .text("");

        label
            .append("tspan")
            .attr("x", 0)
            .attr("y", 0)
            .attr("dy", "1.5em")
            .text(t('losses_yearly_percentage_from_total'));

        svg
            .attr("viewBox", `${-radius} ${-radius} ${width} ${width}`)
            .style("max-width", `${width}px`)
            .style("font", "12px sans-serif");

        const path = svg
            .append("g")
            .selectAll("path")
            .data(
                root.descendants().filter(d => {
                    // Don't draw the root node, and for efficiency, filter out nodes that would be too small to see
                    return d.depth && d.x1 - d.x0 > 0.001;
                })
            )
            .join("path")
            .attr("fill", d => color(d.data.name))
            .attr("d", arc);

        svg
            .append("g")
            .attr("fill", "none")
            .attr("pointer-events", "all")
            .on("mouseleave", () => {
                path.attr("fill-opacity", 1);
                label.style("visibility", "hidden");
                // Update the value of this view
                element.value = {sequence: [], percentage: 0.0};
                element.dispatchEvent(new CustomEvent("input"));
            })
            .selectAll("path")
            .data(
                root.descendants().filter(d => {
                    // Don't draw the root node, and for efficiency, filter out nodes that would be too small to see
                    return d.depth && d.x1 - d.x0 > 0.001;
                })
            )
            .join("path")
            .attr("d", mousearc)
            .on("mouseenter", (event, d) => {
                // Get the ancestors of the current segment, minus the root
                const sequence = d
                    .ancestors()
                    .reverse()
                    .slice(1);
                // Highlight the ancestors
                path.attr("fill-opacity", node =>
                    sequence.indexOf(node) >= 0 ? 1.0 : 0.3
                );
                const percentage = ((100 * d.value) / root.value).toPrecision(3);

                console.log(d)
                label
                    .style("visibility", null)
                    .select(".percentage")
                    .text(() => {
                        let type: String = ""
                        const item = d.data.name
                        const parent = d.parent.data.name

                        if (typeof item == "number") {
                            type = item.toString()
                        } else {
                            if (typeof parent == "number") {
                                type = `${mapCategoryToTranslation(d.data.name as LossType, t)} ${parent}`
                            } else {
                                type = mapCategoryToTranslation(d.data.name as LossType, t)
                            }
                        }
                        return `${type}, ${percentage}%`
                    });
                // Update the value of this view with the currently hovered sequence and percentage
                element.value = {sequence, percentage};
                element.dispatchEvent(new CustomEvent("input"));
            });
    }, [data]);

    // Generate a string that describes the points of a breadcrumb SVG polygon.
    function breadcrumbPoints(d, i) {
        const tipWidth = 10;
        const points = [];
        points.push("0,0");
        points.push(`${breadcrumbWidth},0`);
        points.push(`${breadcrumbWidth + tipWidth},${breadcrumbHeight / 2}`);
        points.push(`${breadcrumbWidth},${breadcrumbHeight}`);
        points.push(`0,${breadcrumbHeight}`);
        if (i > 0) {
            // Leftmost breadcrumb; don't include 6th vertex.
            points.push(`${tipWidth},${breadcrumbHeight / 2}`);
        }
        return points.join(" ");
    }

    return <div className="text-center m-auto">
        <h3 className="text-2xl mb-8 mt-4 text-white">{t('losses_yearly_by_category')}</h3>
        <svg ref={svgRef} className="d-block m-auto mt-4"/>
    </div>;
}

export default YearlyGroupChart