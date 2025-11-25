import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, TrendingDown, Award, Users } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default function LoginPage() {
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    const handleGoogleLogin = () => {
        // Redirect to backend OAuth endpoint
        window.location.href = `${API_URL}/api/auth/google`;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <div className="container mx-auto px-4 py-16">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center mb-4">
                        <Leaf className="h-12 w-12 text-green-600 mr-3" />
                        <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
                            Carbon Footprint Tracker
                        </h1>
                    </div>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Track your impact, earn rewards, and help save the planet 🌍
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
                    <Card className="border-green-200 dark:border-green-800">
                        <CardHeader>
                            <TrendingDown className="h-8 w-8 text-green-600 mb-2" />
                            <CardTitle>Track Your Impact</CardTitle>
                            <CardDescription>
                                Log daily activities and see your carbon footprint in real-time
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    <Card className="border-blue-200 dark:border-blue-800">
                        <CardHeader>
                            <Award className="h-8 w-8 text-blue-600 mb-2" />
                            <CardTitle>Earn Rewards</CardTitle>
                            <CardDescription>
                                Get points for low-carbon choices and redeem with partners
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    <Card className="border-purple-200 dark:border-purple-800">
                        <CardHeader>
                            <Users className="h-8 w-8 text-purple-600 mb-2" />
                            <CardTitle>Join Community</CardTitle>
                            <CardDescription>
                                Compete on leaderboards and share sustainable tips
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </div>

                {/* Login Card */}
                <Card className="max-w-md mx-auto shadow-xl">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl">Get Started</CardTitle>
                        <CardDescription>
                            Sign in to start tracking your carbon footprint
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button
                            onClick={handleGoogleLogin}
                            className="w-full h-12 text-lg bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 shadow-sm"
                            variant="outline"
                        >
                            <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24">
                                <path
                                    fill="#4285F4"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="#EA4335"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                            Continue with Google
                        </Button>

                        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                            By continuing, you agree to our Terms of Service and Privacy Policy
                        </div>
                    </CardContent>
                </Card>

                {/* Stats */}
                <div className="mt-16 text-center">
                    <p className="text-gray-600 dark:text-gray-400 mb-4">Join thousands making a difference</p>
                    <div className="flex justify-center gap-12 text-center">
                        <div>
                            <div className="text-3xl font-bold text-green-600">10K+</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Active Users</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-blue-600">500K</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">kg CO₂ Saved</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-purple-600">50+</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Partner Brands</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
