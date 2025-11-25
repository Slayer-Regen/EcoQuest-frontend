import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings as SettingsIcon, Download, User, FileText, Calendar as CalendarIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export default function SettingsPage() {
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.auth.user);
    const token = useSelector((state: RootState) => state.auth.token);
    const [emailEnabled, setEmailEnabled] = useState(false);
    const [isExportingActivities, setIsExportingActivities] = useState(false);
    const [isExportingSummaries, setIsExportingSummaries] = useState(false);

    const handleExportActivities = async () => {
        try {
            setIsExportingActivities(true);
            const response = await fetch('http://localhost:3000/api/export/activities', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Export failed');
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `carbon-activities-${new Date().toISOString().split('T')[0]}.csv`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Export failed:', error);
            alert('Failed to export activities. Please try again.');
        } finally {
            setIsExportingActivities(false);
        }
    };

    const handleExportSummaries = async () => {
        try {
            setIsExportingSummaries(true);
            const response = await fetch('http://localhost:3000/api/export/summaries', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Export failed');
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `carbon-summaries-${new Date().toISOString().split('T')[0]}.csv`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Export failed:', error);
            alert('Failed to export summaries. Please try again.');
        } finally {
            setIsExportingSummaries(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <header className="bg-white dark:bg-gray-800 shadow-sm">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <SettingsIcon className="h-6 w-6 text-green-600" />
                        <span className="text-2xl font-bold text-green-600">Settings</span>
                    </div>
                    <Button variant="outline" onClick={() => navigate('/dashboard')}>
                        Back to Dashboard
                    </Button>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8 max-w-3xl">
                {/* Profile Settings */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <User className="h-5 w-5" />
                            <span>Profile</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Display Name
                            </label>
                            <p className="text-lg text-gray-900 dark:text-white">
                                {user?.displayName || 'Not set'}
                            </p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Email
                            </label>
                            <p className="text-lg text-gray-900 dark:text-white">
                                {user?.email || 'Not set'}
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Notification Settings */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Notifications</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Weekly Summary Emails</p>
                                <p className="text-sm text-gray-500">
                                    Receive weekly carbon footprint summaries via email
                                </p>
                            </div>
                            <Button
                                variant={emailEnabled ? 'default' : 'outline'}
                                onClick={() => setEmailEnabled(!emailEnabled)}
                            >
                                {emailEnabled ? 'Enabled' : 'Disabled'}
                            </Button>
                        </div>
                        <p className="text-xs text-gray-500">
                            Note: Email notifications require SMTP configuration in backend
                        </p>
                    </CardContent>
                </Card>

                {/* Data Export */}
                <Card>
                    <CardHeader>
                        <CardTitle>Data Export</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium flex items-center">
                                    <FileText className="h-4 w-4 mr-2" />
                                    Export Activities
                                </p>
                                <p className="text-sm text-gray-500">
                                    Download all your logged activities as CSV
                                </p>
                            </div>
                            <Button
                                onClick={handleExportActivities}
                                variant="outline"
                                disabled={isExportingActivities}
                            >
                                <Download className="h-4 w-4 mr-2" />
                                {isExportingActivities ? 'Exporting...' : 'Export'}
                            </Button>
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t">
                            <div>
                                <p className="font-medium flex items-center">
                                    <CalendarIcon className="h-4 w-4 mr-2" />
                                    Export Summaries
                                </p>
                                <p className="text-sm text-gray-500">
                                    Download all your weekly summaries as CSV
                                </p>
                            </div>
                            <Button
                                onClick={handleExportSummaries}
                                variant="outline"
                                disabled={isExportingSummaries}
                            >
                                <Download className="h-4 w-4 mr-2" />
                                {isExportingSummaries ? 'Exporting...' : 'Export'}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
