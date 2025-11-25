import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Coins, Gift, Flame } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function HowItWorksPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <header className="bg-white dark:bg-gray-800 shadow-sm">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <BookOpen className="h-6 w-6 text-green-600" />
                        <span className="text-2xl font-bold text-green-600">How It Works</span>
                    </div>
                    <Button variant="outline" onClick={() => navigate('/dashboard')}>
                        Back to Dashboard
                    </Button>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Introduction */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        Understanding Points & Rewards
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        Learn how to earn points by logging your carbon footprint activities and redeem them for rewards!
                    </p>
                </div>

                {/* Earning Points */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <Coins className="h-5 w-5 text-green-600" />
                            <span>Earning Points</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-gray-700 dark:text-gray-300">
                            You earn points for every activity you log. The number of points depends on the activity type:
                        </p>

                        <div className="space-y-3">
                            <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                <div>
                                    <p className="font-semibold text-gray-900 dark:text-white">🚗 Commute</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Car, bus, train, bike, walk</p>
                                </div>
                                <span className="text-xl font-bold text-green-600">10 pts</span>
                            </div>

                            <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                <div>
                                    <p className="font-semibold text-gray-900 dark:text-white">⚡ Electricity</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Home energy usage</p>
                                </div>
                                <span className="text-xl font-bold text-blue-600">15 pts</span>
                            </div>

                            <div className="flex justify-between items-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                                <div>
                                    <p className="font-semibold text-gray-900 dark:text-white">🍽️ Diet</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Meals and food choices</p>
                                </div>
                                <span className="text-xl font-bold text-orange-600">8 pts</span>
                            </div>

                            <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                <div>
                                    <p className="font-semibold text-gray-900 dark:text-white">🗑️ Waste</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Recycling and waste management</p>
                                </div>
                                <span className="text-xl font-bold text-purple-600">12 pts</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Streak Bonuses */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <Flame className="h-5 w-5 text-orange-500" />
                            <span>Streak Bonuses</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-gray-700 dark:text-gray-300">
                            Log in daily to build your streak and earn bonus points at milestones:
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="p-3 border-2 border-orange-200 dark:border-orange-800 rounded-lg">
                                <p className="text-2xl font-bold text-orange-600">🔥 7 Days</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">+50 bonus points</p>
                            </div>
                            <div className="p-3 border-2 border-orange-300 dark:border-orange-700 rounded-lg">
                                <p className="text-2xl font-bold text-orange-600">🔥 30 Days</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">+250 bonus points</p>
                            </div>
                            <div className="p-3 border-2 border-orange-400 dark:border-orange-600 rounded-lg">
                                <p className="text-2xl font-bold text-orange-600">🔥 100 Days</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">+1,000 bonus points</p>
                            </div>
                            <div className="p-3 border-2 border-orange-500 dark:border-orange-500 rounded-lg">
                                <p className="text-2xl font-bold text-orange-600">🔥 365 Days</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">+5,000 bonus points</p>
                            </div>
                        </div>

                        <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                            💡 Tip: Log in every day to maintain your streak and maximize your points!
                        </p>
                    </CardContent>
                </Card>

                {/* Redeeming Points */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <Gift className="h-5 w-5 text-purple-600" />
                            <span>Redeeming Points</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-gray-700 dark:text-gray-300">
                            Use your earned points to redeem rewards in the Rewards section:
                        </p>

                        <ul className="space-y-2 list-disc list-inside text-gray-700 dark:text-gray-300">
                            <li>Browse available rewards in the Rewards page</li>
                            <li>Each reward has a point cost</li>
                            <li>Click "Redeem" when you have enough points</li>
                            <li>View your redemption history in Settings</li>
                        </ul>

                        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                            <p className="text-sm text-yellow-800 dark:text-yellow-200">
                                <strong>Note:</strong> Points are deducted immediately upon redemption and cannot be refunded.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Tips */}
                <Card>
                    <CardHeader>
                        <CardTitle>💡 Pro Tips</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                            <li>✅ Log activities daily to build your streak</li>
                            <li>✅ Track all activity types for maximum points</li>
                            <li>✅ Check the leaderboard to see how you compare</li>
                            <li>✅ Aim for lower emissions to rank higher</li>
                            <li>✅ Save points for bigger rewards</li>
                        </ul>
                    </CardContent>
                </Card>

                {/* CTA */}
                <div className="mt-8 text-center">
                    <Button
                        onClick={() => navigate('/dashboard')}
                        className="bg-green-600 hover:bg-green-700"
                        size="lg"
                    >
                        Start Earning Points
                    </Button>
                </div>
            </main>
        </div>
    );
}
