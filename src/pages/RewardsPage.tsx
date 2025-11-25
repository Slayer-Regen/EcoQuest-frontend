import { useGetPointsQuery, useRedeemRewardMutation } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { addToast } from '@/slices/uiSlice';
import { useDispatch } from 'react-redux';
import { Loader2, Gift, TreePine, Coffee, ShoppingBag } from 'lucide-react';

const REWARDS = [
    {
        id: 'tree-planting',
        name: 'Plant a Tree',
        cost: 100,
        description: 'We will plant a tree on your behalf.',
        icon: TreePine,
        color: 'text-green-600',
    },
    {
        id: 'coffee-discount',
        name: '$5 Coffee Voucher',
        cost: 500,
        description: 'Get a discount at participating cafes.',
        icon: Coffee,
        color: 'text-amber-700',
    },
    {
        id: 'eco-store-credit',
        name: '$10 Eco Store Credit',
        cost: 1000,
        description: 'Credit for sustainable products.',
        icon: ShoppingBag,
        color: 'text-blue-600',
    },
    {
        id: 'donation-wwf',
        name: '$20 WWF Donation',
        cost: 2000,
        description: 'Donate to World Wildlife Fund.',
        icon: Gift,
        color: 'text-red-600',
    },
];

export default function RewardsPage() {
    const { data, isLoading } = useGetPointsQuery(undefined);
    const [redeemReward, { isLoading: isRedeeming }] = useRedeemRewardMutation();
    const dispatch = useDispatch();

    const balance = data?.data?.balance || 0;

    const handleRedeem = async (reward: typeof REWARDS[0]) => {
        if (balance < reward.cost) {
            dispatch(addToast({ title: 'Error', description: 'Insufficient points', type: 'error' }));
            return;
        }

        if (!confirm(`Redeem ${reward.name} for ${reward.cost} points?`)) return;

        try {
            await redeemReward({
                rewardId: reward.id,
                cost: reward.cost,
                name: reward.name,
            }).unwrap();

            dispatch(addToast({ title: 'Success', description: `Redeemed: ${reward.name}`, type: 'success' }));
        } catch (error) {
            dispatch(addToast({ title: 'Error', description: 'Redemption failed', type: 'error' }));
        }
    };

    if (isLoading) {
        return <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Rewards</h1>
                    <p className="text-gray-500">Redeem your hard-earned points for eco-friendly rewards.</p>
                </div>
                <div className="bg-green-100 dark:bg-green-900 px-4 py-2 rounded-lg">
                    <span className="text-sm font-medium text-green-800 dark:text-green-200">Your Balance</span>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">{balance} pts</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {REWARDS.map((reward) => (
                    <Card key={reward.id} className="flex flex-col">
                        <CardHeader>
                            <div className={`w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4 ${reward.color}`}>
                                <reward.icon className="h-6 w-6" />
                            </div>
                            <CardTitle className="text-xl">{reward.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-gray-600 dark:text-gray-400 mb-4">{reward.description}</p>
                            <p className="font-bold text-lg">{reward.cost} pts</p>
                        </CardContent>
                        <CardFooter>
                            <Button
                                className="w-full"
                                onClick={() => handleRedeem(reward)}
                                disabled={balance < reward.cost || isRedeeming}
                                variant={balance < reward.cost ? "outline" : "default"}
                            >
                                {balance < reward.cost ? 'Insufficient Points' : 'Redeem'}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
