import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/slices/authSlice';
import { addToast } from '@/slices/uiSlice';
import { Loader2 } from 'lucide-react';

export default function AuthCallbackPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const token = searchParams.get('token');
        const refreshToken = searchParams.get('refreshToken');
        const error = searchParams.get('error');

        if (error) {
            dispatch(
                addToast({
                    title: 'Authentication Failed',
                    description: getErrorMessage(error),
                    type: 'error',
                })
            );
            navigate('/login');
            return;
        }

        if (token && refreshToken) {
            // Store tokens
            localStorage.setItem('refreshToken', refreshToken);

            // Fetch user profile
            fetchUserProfile(token)
                .then((user) => {
                    dispatch(
                        setCredentials({
                            user,
                            token,
                        })
                    );

                    dispatch(
                        addToast({
                            title: 'Welcome!',
                            description: `Signed in as ${user.email}`,
                            type: 'success',
                        })
                    );

                    navigate('/dashboard');
                })
                .catch((err) => {
                    console.error('Failed to fetch user profile:', err);
                    // Log the full error details
                    if (err instanceof Error) {
                        console.error('Error message:', err.message);
                        console.error('Error stack:', err.stack);
                    }
                    dispatch(
                        addToast({
                            title: 'Error',
                            description: 'Failed to load user profile. Check console for details.',
                            type: 'error',
                        })
                    );
                    // Delay redirect to allow seeing the error
                    setTimeout(() => navigate('/login'), 3000);
                });
        } else {
            dispatch(
                addToast({
                    title: 'Error',
                    description: 'No authentication tokens received',
                    type: 'error',
                })
            );
            navigate('/login');
        }
    }, [searchParams, navigate, dispatch]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
            <div className="text-center">
                <Loader2 className="h-12 w-12 animate-spin text-green-600 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Signing you in...</h2>
                <p className="text-gray-600">Please wait while we complete your authentication</p>
            </div>
        </div>
    );
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

async function fetchUserProfile(token: string) {
    // Direct call to backend (CORS is enabled)
    const response = await fetch(`${API_URL}/api/users`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch user profile');
    }

    const data = await response.json();
    return {
        id: data.data.user.id,
        email: data.data.user.email,
        displayName: data.data.user.displayName,
        avatarUrl: data.data.user.avatarUrl,
        totalCo2: data.data.stats?.totalCo2Kg || 0,
        pointsBalance: data.data.stats?.currentBalance || 0,
        totalActivities: data.data.stats?.totalActivities || 0,
    };
}

function getErrorMessage(error: string): string {
    switch (error) {
        case 'oauth_failed':
            return 'OAuth authentication failed. Please try again.';
        case 'no_user':
            return 'Could not retrieve user information.';
        case 'server_error':
            return 'Server error occurred. Please try again later.';
        default:
            return 'An unknown error occurred.';
    }
}
