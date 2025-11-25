import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { ApiResponse, UserProfileResponse } from '../types';

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

export const api = createApi({
    reducerPath: 'api',
    baseQuery,
    tagTypes: ['User', 'Activity', 'Dashboard', 'Points', 'Leaderboard', 'Analytics', 'Summaries'],
    endpoints: (builder) => ({
        // Placeholder endpoints - will be implemented in upcoming weeks
        getUser: builder.query<ApiResponse<UserProfileResponse>, void>({
            query: () => '/api/users',
            providesTags: ['User'],
        }),
        getActivities: builder.query({
            query: (page = 1) => `/api/activities?page=${page}`,
            providesTags: ['Activity'],
        }),
        createActivity: builder.mutation({
            query: (body) => ({
                url: '/api/activities',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Activity', 'Dashboard'],
        }),
        deleteActivity: builder.mutation({
            query: (id) => ({
                url: `/api/activities/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Activity', 'Dashboard'],
        }),
        getDashboard: builder.query({
            query: () => '/api/dashboard',
            providesTags: ['Dashboard'],
        }),
        getPoints: builder.query({
            query: () => '/api/points',
            providesTags: ['Points'],
        }),
        redeemReward: builder.mutation({
            query: (body) => ({
                url: '/api/points/redeem',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Points', 'Dashboard'],
        }),
        getLeaderboard: builder.query({
            query: ({ type, period = 'all', limit = 10 }) =>
                `/api/leaderboard/${type}?period=${period}&limit=${limit}`,
            providesTags: ['Leaderboard'],
        }),
        getAnalyticsEmissions: builder.query({
            query: ({ period = '7d', groupBy = 'day' }) =>
                `/api/analytics/emissions?period=${period}&groupBy=${groupBy}`,
            providesTags: ['Analytics'],
        }),
        getAnalyticsBreakdown: builder.query({
            query: ({ period = '30d' }) =>
                `/api/analytics/breakdown?period=${period}`,
            providesTags: ['Analytics'],
        }),
        getSummaries: builder.query({
            query: () => '/api/summaries',
            providesTags: ['Summaries'],
        }),
        generateSummary: builder.mutation({
            query: () => ({
                url: '/api/summaries/generate',
                method: 'POST',
            }),
            invalidatesTags: ['Summaries'],
        }),
        getRedemptionHistory: builder.query({
            query: () => '/api/points/history',
            providesTags: ['Points'],
        }),
    }),
});

export const {
    useGetUserQuery,
    useGetActivitiesQuery,
    useCreateActivityMutation,
    useDeleteActivityMutation,
    useGetDashboardQuery,
    useGetPointsQuery,
    useRedeemRewardMutation,
    useGetLeaderboardQuery,
    useGetAnalyticsEmissionsQuery,
    useGetAnalyticsBreakdownQuery,
    useGetSummariesQuery,
    useGenerateSummaryMutation,
    useGetRedemptionHistoryQuery,
} = api;
