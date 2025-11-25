import { useGetSummariesQuery, useGenerateSummaryMutation } from '@/services/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Calendar, TrendingDown, TrendingUp, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SummariesPage() {
    const navigate = useNavigate();
    const { data, isLoading, error } = useGetSummariesQuery(undefined);
    const [generateSummary, { isLoading: isGenerating }] = useGenerateSummaryMutation();

    const handleGenerate = async () => {
        try {
            await generateSummary(undefined).unwrap();
            // Summaries will auto-refresh due to cache invalidation
        } catch (err) {
            console.error('Failed to generate summary:', err);
        }
    };

    const getTrendIcon = (current: number, previous?: number) => {
        if (!previous) return <Minus className="h-4 w-4 text-gray-400" />;
        if (current < previous) return <TrendingDown className="h-4 w-4 text-green-600" />;
        if (current > previous) return <TrendingUp className="h-4 w-4 text-red-600" />;
        return <Minus className="h-4 w-4 text-gray-400" />;
    };

    const formatDateRange = (start: string, end: string) => {
        const startDate = new Date(start);
        const endDate = new Date(end);
        return `${startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <header className="bg-white dark:bg-gray-800 shadow-sm">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <Calendar className="h-6 w-6 text-green-600" />
                        <span className="text-2xl font-bold text-green-600">Weekly Summaries</span>
                    </div>
                    <Button variant="outline" onClick={() => navigate('/dashboard')}>
                        Back to Dashboard
                    </Button>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                {/* Generate Button */}
                <div className="flex justify-between items-center mb-6">
                    <p className="text-gray-600 dark:text-gray-400">
                        View your weekly carbon footprint summaries
                    </p>
                    <Button
                        onClick={handleGenerate}
                        disabled={isGenerating}
                        className="bg-green-600 hover:bg-green-700"
                    >
                        {isGenerating ? (
                            <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Generating...
                            </>
                        ) : (
                            'Generate Now'
                        )}
                    </Button>
                </div>

                {/* Loading State */}
                {isLoading && (
                    <div className="flex justify-center p-12">
                        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="text-center text-red-500 p-8">
                        Failed to load summaries. Please try again.
                    </div>
                )}

                {/* Summaries Grid */}
                {data?.data && data.data.length === 0 && (
                    <Card>
                        <CardContent className="p-12 text-center">
                            <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                No summaries yet
                            </h3>
                            <p className="text-gray-500 mb-4">
                                Click "Generate Now" to create your first weekly summary
                            </p>
                        </CardContent>
                    </Card>
                )}

                {data?.data && data.data.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data.data.map((summary: any, index: number) => {
                            const previousSummary = data.data[index + 1];
                            return (
                                <Card
                                    key={summary.id}
                                    className="hover:shadow-lg transition-shadow"
                                >
                                    <CardHeader>
                                        <CardTitle className="text-lg">
                                            {formatDateRange(summary.weekStart, summary.weekEnd)}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {/* CO2 Emissions */}
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="text-sm text-gray-500">Total Emissions</p>
                                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                                    {summary.totalCo2Kg.toFixed(1)} kg
                                                </p>
                                            </div>
                                            {getTrendIcon(
                                                summary.totalCo2Kg,
                                                previousSummary?.totalCo2Kg
                                            )}
                                        </div>

                                        {/* Points */}
                                        <div className="flex justify-between items-center pt-3 border-t">
                                            <div>
                                                <p className="text-sm text-gray-500">Points Earned</p>
                                                <p className="text-xl font-semibold text-green-600">
                                                    {summary.totalPoints} pts
                                                </p>
                                            </div>
                                        </div>

                                        {/* Activities */}
                                        <div className="flex justify-between items-center pt-3 border-t">
                                            <div>
                                                <p className="text-sm text-gray-500">Activities</p>
                                                <p className="text-xl font-semibold text-blue-600">
                                                    {summary.activityCount}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                )}
            </main>
        </div>
    );
}
