import { createApi } from '@reduxjs/toolkit/query/react'
import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import type {Loss} from './models'
import {API_URL} from "../../api/apiUrl";

// Define a service using a base URL and expected endpoints
export const lossesApi = createApi({
    reducerPath: 'lossesPath',
    baseQuery: fetchBaseQuery({baseUrl: API_URL}),
    endpoints: (builder) => ({
        getLosses: builder.query<Loss[], string>({
            transformResponse: (response, meta, arg) => response['data'],
            query: ({category, dateFrom, dateTo}) => `/losses/${paramsToFunction(category, dateFrom, dateTo)}`,
        }),
        getYearlyAggregation: builder.query({
            transformResponse: (response, meta, args) => response['data'],
            query: () => `/losses/yearly/aggregation`
        }),
        getCategoryAggregation: builder.query({
            transformResponse: (response, meta, args) => response['data'],
            query: () => `/losses/category/aggregation`
        })
    })
})

const paramsToFunction = (category?: string, dateFrom?: string, dateTo?: string): string => {
    let result: string = "";
    if (category) {
        result += `cat=${category}`
    }
    if (dateFrom) {
        if (result.length > 0) {
            result += "&"
        }
        result += `date_from=${dateFrom}`
    }
    if (dateTo) {
        if (result.length > 0) {
            result += "&"
        }
        result += `date_to=${dateTo}`
    }

    if (result.length > 0){
        result = "?" + result
    }

    return result
}

export const {useGetLossesQuery, useGetYearlyAggregationQuery, useGetCategoryAggregationQuery} = lossesApi