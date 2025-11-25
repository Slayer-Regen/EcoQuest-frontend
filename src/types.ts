export interface User {
    id: string;
    email: string;
    displayName: string;
    avatarUrl?: string;
    countryCode?: string;
    gridEmissionFactor?: number;
    createdAt: string;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    error?: {
        message: string;
        code?: string;
    };
}

export interface Activity {
    id: string;
    userId: string;
    type: string;
    activityDate: string;
    co2Kg: number;
    payload: any;
    createdAt: string;
}

export interface LeaderboardEntry {
    userId: string;
    displayName: string;
    avatarUrl?: string;
    totalPoints: number;
    rank: number;
}

export interface AnalyticsData {
    period: string;
    totalEmissions: number;
    breakdown: {
        type: string;
        co2Kg: number;
        percentage: number;
    }[];
    history: {
        date: string;
        co2Kg: number;
    }[];
}

export interface SummaryData {
    id: string;
    userId: string;
    weekStartDate: string;
    weekEndDate: string;
    totalCo2Kg: number;
    totalPointsEarned: number;
    activityCount: number;
    createdAt: string;
}

export interface Redemption {
    id: string;
    userId: string;
    rewardId: string;
    pointsSpent: number;
    redeemedAt: string;
    reward: {
        title: string;
        description: string;
    };
}
