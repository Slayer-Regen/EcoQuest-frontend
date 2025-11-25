import { useGetRedemptionHistoryQuery } from '@/services/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, History, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function RedemptionHistoryPage() {
    const navigate = useNavigate();
    const { data, isLoading, error } = useGetRedemptionHistoryQuery(undefined);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <header className="bg-white dark:bg-gray-800 shadow-sm">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <History className="h-6 w-6 text-green-600" />
                        <span className="text-2xl font-bold text-green-600">Redemption History</span>
                    </div>
                    <Button variant="outline" onClick={() => navigate('/rewards')}>
                        Back to Rewards
                    </Button>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8 max-w-4xl">
                <Card>
                    <CardHeader>
                        <CardTitle>Your Redemptions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {isLoading && (
                            <div className="flex justify-center p-8">
                                <Loader2 className="h-8 w-8 animate-spin text-green-600" />
                            </div>
                        )}

                        {error && (
                            <div className="text-center text-red-500 p-8">
                                Failed to load redemption history.
                            </div>
                        )}

                        {data?.data && data.data.length === 0 && (
                            <div className="text-center py-12">
                                <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    No redemptions yet
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400 mb-4">
                                    Start earning points and redeem rewards!
                                </p>
                                <Button onClick={() => navigate('/rewards')} className="bg-green-600 hover:bg-green-700">
                                    Browse Rewards
                                </Button>
                            </div>
                        )}

                        {data?.data && data.data.length > 0 && (
                            <div className="space-y-3">
                                {data.data.map((redemption: any) => (
                                    <div
                                        key={redemption.id}
                                        className="flex justify-between items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                    >
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-gray-900 dark:text-white">
                                                {redemption.rewardName}
                                            </h4>
                                            {redemption.rewardDescription && (
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    {redemption.rewardDescription}
                                                </p>
                                            )}
                                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                                {formatDate(redemption.redeemedAt)}
                                            </p>
                                        </div>
                                        <div className="text-right ml-4">
                                            <p className="text-lg font-bold text-red-600 dark:text-red-500">
                                                -{redemption.pointsSpent} pts
                                            </p>
                                            <span
                                                className={`text-xs px-2 py-1 rounded ${redemption.status === 'completed'
                                                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                                                    }`}
                                            >
                                                {redemption.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}

                                {/* Total Summary */}
                                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <div className="flex justify-between items-center">
                                        <p className="font-semibold text-gray-700 dark:text-gray-300">
                                            Total Redeemed
                                        </p>
                                        <p className="text-xl font-bold text-red-600 dark:text-red-500">
                                            -{data.data.reduce((sum: number, r: any) => sum + r.pointsSpent, 0)} pts
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
