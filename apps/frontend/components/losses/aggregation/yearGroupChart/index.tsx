// @ts-nocheck

import {useEffect, useRef} from "react";
import * as d3 from "d3";
import {useTranslation} from "next-i18next";
import {LossType} from "../../../../redux/losses/models";
import {mapCategoryToTranslation} from "../../../../utils/category";

const RadialGroupChart = ({ isLoading, data }: RadialChartProps) => {

    const {t} = useTranslation()
    const svgRef = useRef(null);

    const breadcrumbWidth = 120
    const breadcrumbHeight = 50

    const width = 700
    const radius = width / 2

    const color: any = d3
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

    useEffect(() => {
        if (!data || isLoading) return;

        const chartData = {
            "name": "root",
            "children": data.children.map((item) => ({
                "name": item.name,
                "children": item.children
            }))
        }

        const partition = (data: any) =>
            d3.partition().size([2 * Math.PI, radius * radius])(
                d3
                    .hierarchy(data)
                    .sum((d) => d.value as number)
                    .sort((a, b) => (b as any).name as any - (a as any).name as any)
            )

        const arc: any = d3
            .arc()
            .startAngle((d: any) => d.x0)
            .endAngle((d: any) => d.x1)
            .padAngle(1 / radius)
            .padRadius(radius)
            .innerRadius((d: any) => Math.sqrt(d.y0))
            .outerRadius((d: any) => Math.sqrt(d.y1) - 1)

        const mousearc: any = d3
            .arc()
            .startAngle((d: any) => d.x0)
            .endAngle((d: any) => d.x1)
            .innerRadius((d: any) => Math.sqrt(d.y0))
            .outerRadius(radius)

        const root: any = partition(chartData);
        const svg = d3.select(svgRef.current)
        // Make this into a view, so that the currently hovered sequence is available to the breadcrumb
        const element: any = svg.node();
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
            .attr("font-size", "2.8em")
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
            .data(root.descendants().filter((d: any) => d.depth && d.x1 - d.x0 > 0.001))
            .join("path")
            .attr("fill", (d: any) => color((d.data as any).name))
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

                updateBreadcrumbs([], 0);
            })
            .selectAll("path")
            .data(
                root.descendants().filter((d: any) => {
                    // Don't draw the root node, and for efficiency, filter out nodes that would be too small to see
                    return d.depth && d.x1 - d.x0 > 0.001;
                })
            )
            .join("path")
            .attr("d", mousearc)
            .on("mouseenter", (event, d: any) => {
                // Get the ancestors of the current segment, minus the root
                const sequence: any = d
                    .ancestors()
                    .reverse()
                    .slice(1);
                // Highlight the ancestors
                path.attr("fill-opacity", node =>
                    sequence.indexOf(node) >= 0 ? 1.0 : 0.3
                );
                const percentage = ((100 * d.value as number) / root.value as number).toPrecision(3);

                label
                    .style("visibility", null)
                    .select(".percentage")
                    .text(() => {
                        const type = itemToText(d)
                        return `${type}, ${percentage}%`
                    });
                // Update the value of this view with the currently hovered sequence and percentage
                element.value = {sequence, percentage};
                element.dispatchEvent(new CustomEvent("input"));
                updateBreadcrumbs(sequence, percentage);
            })

        // Cleanup function to remove the SVG when the component unmounts
        return () => {
            d3.select(svgRef.current).selectAll("*").remove();
        };

    }, [data]);

    const itemToText = (d: any, noYear: Boolean = false) => {

        const item = d.data.name
        const parent = d.parent.data.name
        let type: string
        if (typeof item == "number") {
            type = item.toString()
        } else {

            if (typeof parent == "number" && !noYear) {
                type = `${mapCategoryToTranslation(d.data.name as LossType, t)} ${parent}`
            } else {
                type = mapCategoryToTranslation(d.data.name as LossType, t)
            }
        }
        return type
    }

    // Function to update breadcrumbs
    const updateBreadcrumbs = (sequence, percentage) => {
        const breadcrumbs: any = d3.select("#breadcrumbs")
            .selectAll("g")
            .data(sequence, d => d.data.name);

        const enter = breadcrumbs.enter().append("g");

        enter.append("polygon")
            .attr("points", breadcrumbPoints)
            .style("fill", d => color(d.data.name));

        enter.append("text")
            .attr("x", (breadcrumbWidth + 10) / 2)
            .attr("y", breadcrumbHeight / 2)
            .attr("dy", "0.35em")
            .attr("text-anchor", "middle")
            .text(d => itemToText(d, true));

        enter.merge(breadcrumbs)
            .attr("transform", (d, i) => `translate(${i * (breadcrumbWidth + 10)}, 0)`);

        breadcrumbs.exit().remove();
    }

    // Generate a string that describes the points of a breadcrumb SVG polygon
    const breadcrumbPoints = (d, i) => {
        const tipWidth = 10;
        const points = [];
        points.push("0,0");
        points.push(`${breadcrumbWidth},0`);
        points.push(`${breadcrumbWidth + tipWidth},${breadcrumbHeight / 2}`);
        points.push(`${breadcrumbWidth},${breadcrumbHeight}`);
        points.push(`0,${breadcrumbHeight}`);
        if (i > 0) {
            points.push(`${tipWidth},${breadcrumbHeight / 2}`);
        }
        return points.join(" ");
    }

    return <div className="text-center m-auto">
        <h3 className="text-2xl mb-8 mt-4 text-white">{t('losses_yearly_by_category')}</h3>
        <svg id="breadcrumbs" className="d-block m-auto mt-4"/>
        <svg ref={svgRef} className="d-block m-auto mt-4"/>
    </div>;
}

export default RadialGroupChart