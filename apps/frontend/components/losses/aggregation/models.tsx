interface RadialChartProps {
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