import { Flame } from 'lucide-react';
import { Card, CardContent } from './ui/card';

interface StreakDisplayProps {
    currentStreak: number;
    longestStreak: number;
    nextMilestone?: { days: number; points: number } | null;
}

export default function StreakDisplay({ currentStreak, longestStreak, nextMilestone }: StreakDisplayProps) {
    const getStreakColor = (streak: number) => {
        if (streak >= 365) return 'text-purple-600';
        if (streak >= 100) return 'text-red-600';
        if (streak >= 30) return 'text-orange-600';
        if (streak >= 7) return 'text-yellow-600';
        return 'text-gray-600';
    };

    return (
        <Card className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-orange-200 dark:border-orange-800">
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <Flame className={`h-8 w-8 ${getStreakColor(currentStreak)}`} />
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Current Streak</p>
                            <p className={`text-3xl font-bold ${getStreakColor(currentStreak)}`}>
                                {currentStreak} {currentStreak === 1 ? 'day' : 'days'}
                            </p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Longest</p>
                        <p className="text-xl font-semibold text-gray-900 dark:text-white">
                            {longestStreak} {longestStreak === 1 ? 'day' : 'days'}
                        </p>
                    </div>
                </div>

                {nextMilestone && (
                    <div className="mt-4 pt-4 border-t border-orange-200 dark:border-orange-800">
                        <div className="flex justify-between items-center">
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                Next milestone: <span className="font-semibold">{nextMilestone.days} days</span>
                            </p>
                            <p className="text-sm font-bold text-green-600">
                                +{nextMilestone.points} pts
                            </p>
                        </div>
                        <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                                className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all"
                                style={{ width: `${(currentStreak / nextMilestone.days) * 100}%` }}
                            />
                        </div>
                    </div>
                )}

                {!nextMilestone && currentStreak >= 365 && (
                    <div className="mt-4 pt-4 border-t border-orange-200 dark:border-orange-800">
                        <p className="text-sm text-center text-purple-600 dark:text-purple-400 font-semibold">
                            🎉 You've reached all milestones! Keep it up!
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
