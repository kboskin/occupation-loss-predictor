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


interface CategoryChartProps {
    isLoading: Boolean
    data: ChartAggregationResult
}

interface ChartAggregationResult {
    children: AggregationCategory[];
}

interface AggregationCategory {
    category: string;
    total: number;
    children: AggregationCategoryYear[];
}

interface AggregationCategoryYear {
    year: string;
    value: number;
}
