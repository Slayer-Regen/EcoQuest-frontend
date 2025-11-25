import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { Button } from '@/components/ui/button';
import ActivityList from '@/components/ActivityList';
import ActivityLogModal from '@/components/ActivityLogModal';
import DarkModeToggle from '@/components/DarkModeToggle';
import StreakDisplay from '@/components/StreakDisplay';
import { Plus, LogOut, Gift, Trophy, TrendingDown, Calendar, Settings, BookOpen } from 'lucide-react';
import { useGetMeQuery } from '@/services/api';
import { setCredentials } from '@/slices/authSlice';

import { useNavigate } from 'react-router-dom';

export default function DashboardPage() {
    const user = useSelector((state: RootState) => state.auth.user);
    const token = useSelector((state: RootState) => state.auth.token);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Fetch fresh user stats
    const { data: meData } = useGetMeQuery(undefined, {
        skip: !token,
    });

    // Update user stats when data changes
    useEffect(() => {
        if (meData?.data && token) {
            dispatch(
                setCredentials({
                    user: {
                        id: meData.data.user.id,
                        email: meData.data.user.email,
                        displayName: meData.data.user.displayName,
                        avatarUrl: meData.data.user.avatarUrl,
                        totalCo2: meData.data.stats?.totalCo2Kg || 0,
                        pointsBalance: meData.data.stats?.currentBalance || 0,
                        totalActivities: meData.data.stats?.totalActivities || 0,
                    },
                    token,
                })
            );
        }
    }, [meData, token, dispatch]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
    };

    const streakData = meData?.data?.streak;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <header className="bg-white dark:bg-gray-800 shadow-sm">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-green-600">EcoQuest</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => navigate('/how-it-works')}>
                            <BookOpen className="h-4 w-4 mr-2" />
                            How It Works
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => navigate('/leaderboard')}>
                            <Trophy className="h-4 w-4 mr-2" />
                            Leaderboard
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => navigate('/analytics')}>
                            <TrendingDown className="h-4 w-4 mr-2" />
                            Analytics
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => navigate('/summaries')}>
                            <Calendar className="h-4 w-4 mr-2" />
                            Summaries
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => navigate('/settings')}>
                            <Settings className="h-4 w-4 mr-2" />
                            Settings
                        </Button>
                        <DarkModeToggle />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                            {user?.displayName}
                        </span>
                        <Button variant="ghost" size="sm" onClick={handleLogout}>
                            <LogOut className="h-4 w-4 mr-2" />
                            Logout
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                        <p className="text-gray-500 dark:text-gray-400">Track and reduce your carbon footprint.</p>
                    </div>
                    <div className="flex space-x-2">
                        <Button variant="outline" onClick={() => navigate('/rewards')}>
                            <Gift className="h-4 w-4 mr-2" />
                            Rewards
                        </Button>
                        <Button onClick={() => setIsModalOpen(true)} className="bg-green-600 hover:bg-green-700">
                            <Plus className="h-4 w-4 mr-2" />
                            Log Activity
                        </Button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Total Emissions</h3>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white">
                            {user?.totalCo2?.toFixed(1) || '0.0'} <span className="text-sm font-normal text-gray-500">kg</span>
                        </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Points Earned</h3>
                        <p className="text-3xl font-bold text-green-600">
                            {user?.pointsBalance || 0} <span className="text-sm font-normal text-gray-500">pts</span>
                        </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Activities Logged</h3>
                        <p className="text-3xl font-bold text-blue-600">
                            {user?.totalActivities || 0}
                        </p>
                    </div>
                </div>

                {/* Streak Display */}
                {streakData && (
                    <div className="mb-8">
                        <StreakDisplay
                            currentStreak={streakData.currentStreak}
                            longestStreak={streakData.longestStreak}
                            nextMilestone={streakData.nextMilestone}
                        />
                    </div>
                )}

                {/* Activity List */}
                <ActivityList />
            </main>

            {/* Modal */}
            {isModalOpen && <ActivityLogModal onClose={() => setIsModalOpen(false)} />}
        </div>
    );
}
