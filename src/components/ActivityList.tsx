import { useGetActivitiesQuery, useDeleteActivityMutation } from '@/services/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Trash2, Car, Zap, Plane, Utensils } from 'lucide-react';
import { format } from 'date-fns';

export default function ActivityList() {
    const { data, isLoading, error } = useGetActivitiesQuery(1);
    const [deleteActivity] = useDeleteActivityMutation();

    if (isLoading) {
        return (
            <div className="flex justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-green-600" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500 p-4">
                Failed to load activities.
            </div>
        );
    }

    const activities = data?.data || [];

    const getIcon = (type: string) => {
        switch (type) {
            case 'commute': return <Car className="h-5 w-5 text-green-600" />;
            case 'electricity': return <Zap className="h-5 w-5 text-yellow-600" />;
            case 'flight': return <Plane className="h-5 w-5 text-blue-600" />;
            case 'food': return <Utensils className="h-5 w-5 text-orange-600" />;
            default: return <Car className="h-5 w-5" />;
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this activity?')) {
            await deleteActivity(id);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
                {activities.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">No activities logged yet.</p>
                ) : (
                    <div className="space-y-4">
                        {activities.map((activity: any) => (
                            <div
                                key={activity.id}
                                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                                        {getIcon(activity.type)}
                                    </div>
                                    <div>
                                        <p className="font-medium capitalize">{activity.type}</p>
                                        <p className="text-sm text-gray-500">
                                            {format(new Date(activity.activity_date), 'MMM d, yyyy')} • {activity.payload.mode || activity.payload.type || `${activity.payload.kwh} kWh`}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="text-right">
                                        <p className="font-bold text-green-700">
                                            {parseFloat(activity.co2_kg).toFixed(2)} kg CO₂
                                        </p>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-gray-400 hover:text-red-500"
                                        onClick={() => handleDelete(activity.id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
