import { useState } from 'react';
import { useCreateActivityMutation } from '@/services/api';
import { addToast } from '@/slices/uiSlice';
import { useDispatch } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Car, Zap, Plane, Utensils } from 'lucide-react';

interface ActivityLogModalProps {
    onClose: () => void;
}

export default function ActivityLogModal({ onClose }: ActivityLogModalProps) {
    const [type, setType] = useState('commute');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [details, setDetails] = useState<any>({});
    const [createActivity, { isLoading }] = useCreateActivityMutation();
    const dispatch = useDispatch();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createActivity({
                type,
                date,
                details,
            }).unwrap();

            dispatch(
                addToast({
                    title: 'Success',
                    description: 'Activity logged successfully',
                    type: 'success',
                })
            );
            onClose();
        } catch (error) {
            dispatch(
                addToast({
                    title: 'Error',
                    description: 'Failed to log activity',
                    type: 'error',
                })
            );
        }
    };

    const renderForm = () => {
        switch (type) {
            case 'commute':
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Mode</label>
                            <select
                                className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                                value={details.mode || ''}
                                onChange={(e) => setDetails({ ...details, mode: e.target.value })}
                                required
                            >
                                <option value="">Select Mode</option>
                                <option value="car">Car (Gas)</option>
                                <option value="electric_car">Electric Car</option>
                                <option value="bus">Bus</option>
                                <option value="train">Train</option>
                                <option value="bike">Bike (0 CO2)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Distance (km)</label>
                            <input
                                type="number"
                                className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                                value={details.distance || ''}
                                onChange={(e) => setDetails({ ...details, distance: e.target.value })}
                                required
                                min="0"
                            />
                        </div>
                    </div>
                );
            case 'electricity':
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Usage (kWh)</label>
                            <input
                                type="number"
                                className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                                value={details.kwh || ''}
                                onChange={(e) => setDetails({ ...details, kwh: e.target.value })}
                                required
                                min="0"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Country Code</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                                value={details.countryCode || 'US'}
                                onChange={(e) => setDetails({ ...details, countryCode: e.target.value })}
                                required
                                maxLength={2}
                            />
                        </div>
                    </div>
                );
            case 'flight':
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Distance (km)</label>
                            <input
                                type="number"
                                className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                                value={details.distance || ''}
                                onChange={(e) => setDetails({ ...details, distance: e.target.value })}
                                required
                                min="0"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Class</label>
                            <select
                                className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                                value={details.class || 'economy'}
                                onChange={(e) => setDetails({ ...details, class: e.target.value })}
                                required
                            >
                                <option value="economy">Economy</option>
                                <option value="business">Business</option>
                                <option value="first">First Class</option>
                            </select>
                        </div>
                    </div>
                );
            case 'food':
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Type</label>
                            <select
                                className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                                value={details.type || ''}
                                onChange={(e) => setDetails({ ...details, type: e.target.value })}
                                required
                            >
                                <option value="">Select Type</option>
                                <option value="beef">Beef</option>
                                <option value="pork">Pork</option>
                                <option value="chicken">Chicken</option>
                                <option value="fish">Fish</option>
                                <option value="vegetables">Vegetables</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Weight (kg)</label>
                            <input
                                type="number"
                                className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                                value={details.weight || ''}
                                onChange={(e) => setDetails({ ...details, weight: e.target.value })}
                                required
                                min="0"
                                step="0.1"
                            />
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <Card className="w-full max-w-md mx-4 animate-in fade-in zoom-in duration-200">
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <span>Log Activity</span>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            ✕
                        </button>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Activity Type Selector */}
                        <div className="grid grid-cols-4 gap-2">
                            <button
                                type="button"
                                onClick={() => { setType('commute'); setDetails({}); }}
                                className={`flex flex-col items-center p-3 rounded-lg border transition-colors ${type === 'commute'
                                        ? 'bg-green-50 border-green-500 text-green-700'
                                        : 'hover:bg-gray-50 border-gray-200'
                                    }`}
                            >
                                <Car className="h-6 w-6 mb-1" />
                                <span className="text-xs">Commute</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => { setType('electricity'); setDetails({}); }}
                                className={`flex flex-col items-center p-3 rounded-lg border transition-colors ${type === 'electricity'
                                        ? 'bg-yellow-50 border-yellow-500 text-yellow-700'
                                        : 'hover:bg-gray-50 border-gray-200'
                                    }`}
                            >
                                <Zap className="h-6 w-6 mb-1" />
                                <span className="text-xs">Energy</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => { setType('flight'); setDetails({}); }}
                                className={`flex flex-col items-center p-3 rounded-lg border transition-colors ${type === 'flight'
                                        ? 'bg-blue-50 border-blue-500 text-blue-700'
                                        : 'hover:bg-gray-50 border-gray-200'
                                    }`}
                            >
                                <Plane className="h-6 w-6 mb-1" />
                                <span className="text-xs">Flight</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => { setType('food'); setDetails({}); }}
                                className={`flex flex-col items-center p-3 rounded-lg border transition-colors ${type === 'food'
                                        ? 'bg-orange-50 border-orange-500 text-orange-700'
                                        : 'hover:bg-gray-50 border-gray-200'
                                    }`}
                            >
                                <Utensils className="h-6 w-6 mb-1" />
                                <span className="text-xs">Food</span>
                            </button>
                        </div>

                        {/* Date Picker */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Date</label>
                            <input
                                type="date"
                                className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />
                        </div>

                        {/* Dynamic Form Fields */}
                        {renderForm()}

                        {/* Submit Button */}
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Calculating...
                                </>
                            ) : (
                                'Log Activity'
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
