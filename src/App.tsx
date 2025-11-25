import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store';
import { setDarkMode } from './slices/darkModeSlice';
import LoginPage from './pages/LoginPage';
import AuthCallbackPage from './pages/AuthCallbackPage';
import DashboardPage from './pages/DashboardPage';
import RewardsPage from './pages/RewardsPage';
import LeaderboardPage from './pages/LeaderboardPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SummariesPage from './pages/SummariesPage';
import SettingsPage from './pages/SettingsPage';
import HowItWorksPage from './pages/HowItWorksPage';
import RedemptionHistoryPage from './pages/RedemptionHistoryPage';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, token } = useSelector((state: RootState) => state.auth);

    if (!isAuthenticated || !token) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

function App() {
    const dispatch = useDispatch();

    // Initialize dark mode from localStorage
    useEffect(() => {
        const isDark = localStorage.getItem('darkMode') === 'true';
        dispatch(setDarkMode(isDark));
    }, [dispatch]);

    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/oauth/callback" element={<AuthCallbackPage />} />
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <DashboardPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/rewards"
                element={
                    <ProtectedRoute>
                        <RewardsPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/leaderboard"
                element={
                    <ProtectedRoute>
                        <LeaderboardPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/analytics"
                element={
                    <ProtectedRoute>
                        <AnalyticsPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/summaries"
                element={
                    <ProtectedRoute>
                        <SummariesPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/settings"
                element={
                    <ProtectedRoute>
                        <SettingsPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/how-it-works"
                element={
                    <ProtectedRoute>
                        <HowItWorksPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/redemption-history"
                element={
                    <ProtectedRoute>
                        <RedemptionHistoryPage />
                    </ProtectedRoute>
                }
            />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
    );
}

export default App;
