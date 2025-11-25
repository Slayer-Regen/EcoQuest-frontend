import { useState } from 'react';
import { useGetAnalyticsEmissionsQuery, useGetAnalyticsBreakdownQuery } from '@/services/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, TrendingDown, PieChart as PieChartIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

type Period = '7d' | '30d' | '90d';

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function AnalyticsPage() {
    const [period, setPeriod] = useState<Period>('30d');
    const navigate = useNavigate();

    const { data: emissionsData, isLoading: emissionsLoading } = useGetAnalyticsEmissionsQuery({
        period,
        groupBy: 'day',
    });

    const { data: breakdownData, isLoading: breakdownLoading } = useGetAnalyticsBreakdownQuery({
        period,
    });

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <header className="bg-white dark:bg-gray-800 shadow-sm">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <TrendingDown className="h-6 w-6 text-green-600" />
                        <span className="text-2xl font-bold text-green-600">Analytics</span>
                    </div>
                    <Button variant="outline" onClick={() => navigate('/dashboard')}>
                        Back to Dashboard
                    </Button>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                {/* Period Selector */}
                <div className="flex justify-center space-x-2 mb-8">
                    <Button
                        size="sm"
                        variant={period === '7d' ? 'default' : 'ghost'}
                        onClick={() => setPeriod('7d')}
                    >
                        Last 7 Days
                    </Button>
                    <Button
                        size="sm"
                        variant={period === '30d' ? 'default' : 'ghost'}
                        onClick={() => setPeriod('30d')}
                    >
                        Last 30 Days
                    </Button>
                    <Button
                        size="sm"
                        variant={period === '90d' ? 'default' : 'ghost'}
                        onClick={() => setPeriod('90d')}
                    >
                        Last 90 Days
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Emissions Over Time */}
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Emissions Over Time</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {emissionsLoading && (
                                <div className="flex justify-center p-8">
                                    <Loader2 className="h-8 w-8 animate-spin text-green-600" />
                                </div>
                            )}

                            {!emissionsLoading && emissionsData?.data.timeSeries && (
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={emissionsData.data.timeSeries}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="period" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line
                                            type="monotone"
                                            dataKey="totalCo2"
                                            stroke="#10b981"
                                            strokeWidth={2}
                                            name="CO2 (kg)"
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            )}

                            {!emissionsLoading &&
                                emissionsData?.data.timeSeries?.length === 0 && (
                                    <p className="text-center text-gray-500 py-8">
                                        No emissions data for this period.
                                    </p>
                                )}
                        </CardContent>
                    </Card>

                    {/* Emissions Breakdown */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <PieChartIcon className="h-5 w-5" />
                                <span>Emissions by Type</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {breakdownLoading && (
                                <div className="flex justify-center p-8">
                                    <Loader2 className="h-8 w-8 animate-spin text-green-600" />
                                </div>
                            )}

                            {!breakdownLoading && breakdownData?.data.breakdown && (
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                            data={breakdownData.data.breakdown}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={({ type, percentage }) =>
                                                `${type}: ${percentage.toFixed(1)}%`
                                            }
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="totalCo2"
                                        >
                                            {breakdownData.data.breakdown.map(
                                                (_entry: any, index: number) => (
                                                    <Cell
                                                        key={`cell-${index}`}
                                                        fill={COLORS[index % COLORS.length]}
                                                    />
                                                )
                                            )}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            )}

                            {!breakdownLoading &&
                                breakdownData?.data.breakdown?.length === 0 && (
                                    <p className="text-center text-gray-500 py-8">
                                        No breakdown data for this period.
                                    </p>
                                )}
                        </CardContent>
                    </Card>

                    {/* Breakdown Table */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Detailed Breakdown</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {breakdownLoading && (
                                <div className="flex justify-center p-8">
                                    <Loader2 className="h-8 w-8 animate-spin text-green-600" />
                                </div>
                            )}

                            {!breakdownLoading && breakdownData?.data.breakdown && (
                                <div className="space-y-3">
                                    {breakdownData.data.breakdown.map(
                                        (item: any, index: number) => (
                                            <div
                                                key={item.type}
                                                className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700"
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <div
                                                        className="w-4 h-4 rounded"
                                                        style={{
                                                            backgroundColor:
                                                                COLORS[index % COLORS.length],
                                                        }}
                                                    />
                                                    <div>
                                                        <p className="font-medium capitalize">
                                                            {item.type}
                                                        </p>
                                                        <p className="text-sm text-gray-500">
                                                            {item.activityCount} activities
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold text-green-700 dark:text-green-500">
                                                        {item.totalCo2.toFixed(2)} kg
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {item.percentage.toFixed(1)}%
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    )}
                                    <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                                        <div className="flex justify-between items-center">
                                            <p className="font-bold">Total</p>
                                            <p className="font-bold text-lg text-green-700 dark:text-green-500">
                                                {breakdownData.data.total.toFixed(2)} kg CO₂
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {!breakdownLoading &&
                                breakdownData?.data.breakdown?.length === 0 && (
                                    <p className="text-center text-gray-500 py-8">
                                        No data for this period.
                                    </p>
                                )}
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}
