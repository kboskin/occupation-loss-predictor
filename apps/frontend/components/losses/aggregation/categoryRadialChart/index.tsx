const CategoryRadialChart = (props: YearChartProps) => {

    const width = 928;
    const height = width;
    const innerRadius = 180;
    const outerRadius = Math.min(width, height) / 2;

    if (!props.data) {
        return
    }
}