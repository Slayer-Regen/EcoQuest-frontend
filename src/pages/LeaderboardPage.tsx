import { useState } from 'react';
import { useGetLeaderboardQuery } from '@/services/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Trophy, Medal, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type LeaderboardType = 'global' | 'points';
type Period = 'week' | 'month' | 'all';

export default function LeaderboardPage() {
    const [type, setType] = useState<LeaderboardType>('global');
    const [period, setPeriod] = useState<Period>('month');
    const navigate = useNavigate();

    const { data, isLoading, error } = useGetLeaderboardQuery({ type, period, limit: 20 });

    const getRankIcon = (rank: number) => {
        if (rank === 1) return <Trophy className="h-6 w-6 text-yellow-500" />;
        if (rank === 2) return <Medal className="h-6 w-6 text-gray-400" />;
        if (rank === 3) return <Award className="h-6 w-6 text-amber-600" />;
        return <span className="text-lg font-bold text-gray-400">#{rank}</span>;
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <header className="bg-white dark:bg-gray-800 shadow-sm">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <Trophy className="h-6 w-6 text-green-600" />
                        <span className="text-2xl font-bold text-green-600">Leaderboard</span>
                    </div>
                    <Button variant="outline" onClick={() => navigate('/dashboard')}>
                        Back to Dashboard
                    </Button>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                {/* Type Selector */}
                <div className="flex justify-center space-x-4 mb-6">
                    <Button
                        variant={type === 'global' ? 'default' : 'outline'}
                        onClick={() => setType('global')}
                        className={type === 'global' ? 'bg-green-600 hover:bg-green-700' : ''}
                    >
                        Lowest Emissions
                    </Button>
                    <Button
                        variant={type === 'points' ? 'default' : 'outline'}
                        onClick={() => setType('points')}
                        className={type === 'points' ? 'bg-green-600 hover:bg-green-700' : ''}
                    >
                        Top Points
                    </Button>
                </div>

                {/* Period Selector */}
                <div className="flex justify-center space-x-2 mb-8">
                    <Button
                        size="sm"
                        variant={period === 'week' ? 'default' : 'ghost'}
                        onClick={() => setPeriod('week')}
                    >
                        This Week
                    </Button>
                    <Button
                        size="sm"
                        variant={period === 'month' ? 'default' : 'ghost'}
                        onClick={() => setPeriod('month')}
                    >
                        This Month
                    </Button>
                    <Button
                        size="sm"
                        variant={period === 'all' ? 'default' : 'ghost'}
                        onClick={() => setPeriod('all')}
                    >
                        All Time
                    </Button>
                </div>

                {/* Leaderboard Card */}
                <Card className="max-w-3xl mx-auto">
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <span>
                                {type === 'global' ? 'Eco Champions' : 'Points Leaders'}
                            </span>
                            {data?.data.userRank && (
                                <span className="text-sm font-normal text-gray-500">
                                    Your Rank: #{data.data.userRank.rank}
                                </span>
                            )}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {isLoading && (
                            <div className="flex justify-center p-8">
                                <Loader2 className="h-8 w-8 animate-spin text-green-600" />
                            </div>
                        )}

                        {error && (
                            <div className="text-center text-red-500 p-4">
                                Failed to load leaderboard.
                            </div>
                        )}

                        {data?.data.leaderboard && data.data.leaderboard.length === 0 && (
                            <p className="text-center text-gray-500 py-8">
                                No data available for this period.
                            </p>
                        )}

                        {data?.data.leaderboard && data.data.leaderboard.length > 0 && (
                            <div className="space-y-2">
                                {data.data.leaderboard.map((entry: any) => (
                                    <div
                                        key={entry.userId}
                                        className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${entry.isCurrentUser
                                                ? 'bg-green-50 border-green-500 dark:bg-green-900/20'
                                                : 'hover:bg-gray-50 dark:hover:bg-gray-800 border-gray-200 dark:border-gray-700'
                                            }`}
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 flex justify-center">
                                                {getRankIcon(entry.rank)}
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                {entry.avatarUrl ? (
                                                    <img
                                                        src={entry.avatarUrl}
                                                        alt={entry.displayName}
                                                        className="h-10 w-10 rounded-full"
                                                    />
                                                ) : (
                                                    <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                                                        <span className="text-green-600 font-bold">
                                                            {entry.displayName?.charAt(0).toUpperCase()}
                                                        </span>
                                                    </div>
                                                )}
                                                <div>
                                                    <p className="font-medium">
                                                        {entry.displayName || 'Anonymous'}
                                                        {entry.isCurrentUser && (
                                                            <span className="ml-2 text-xs text-green-600 font-semibold">
                                                                (You)
                                                            </span>
                                                        )}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {type === 'global'
                                                            ? `${entry.activityCount} activities`
                                                            : ''}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xl font-bold text-green-700 dark:text-green-500">
                                                {type === 'global'
                                                    ? `${entry.totalCo2.toFixed(1)} kg`
                                                    : `${entry.totalPoints} pts`}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
