import React, { useState, useEffect, useCallback } from 'react';
import { FaUsers, FaShoppingBag } from 'react-icons/fa';
import { MdPets, MdTrendingUp } from 'react-icons/md';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import StatsCard from '../Components/Dashboard/StatsCard';
import ChartCard from '../Components/Dashboard/ChartCard';
import Loading from './Loading';
import axios from 'axios';
import { 
    defaultChartOptions, 
    doughnutOptions, 
    lineChartOptions,
    createLineDataset,
    createBarDataset,
    createDoughnutDataset,
    brandColors
} from '../Utils/chartConfig';

// Chart.js is already registered in chartConfig.js

const AdminDashboard = () => {
    // Utility function to safely parse dates
    const safeParseDate = useCallback((dateStr) => {
        if (!dateStr) return null;
        const date = new Date(dateStr);
        return isNaN(date.getTime()) ? null : date;
    }, []);

    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalListings: 0,
        totalOrders: 0,
        newUsersThisMonth: 0,
        newListingsThisWeek: 0,
        ordersToday: 0,
        revenueThisMonth: 0
    });
    const [userGrowthData, setUserGrowthData] = useState(null);
    const [categoryData, setCategoryData] = useState(null);
    const [orderTrends, setOrderTrends] = useState(null);

    const prepareChartData = useCallback((users, listings, orders) => {
        // User growth data (last 7 days)
        const last7Days = Array.from({ length: 7 }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - (6 - i));
            return date.toISOString().split('T')[0];
        });

        const userGrowth = last7Days.map(date => {
            const count = users.filter(user => {
                const userDate = safeParseDate(user.createdAt || user.registrationDate);
                if (!userDate) return false;
                
                return userDate.toISOString().split('T')[0] === date;
            }).length;
            return count;
        });

        setUserGrowthData({
            labels: last7Days.map(date => new Date(date).toLocaleDateString('en-US', { weekday: 'short' })),
            datasets: [createLineDataset('New Users', userGrowth, brandColors.primary)]
        });

        // Category distribution
        const categoryCount = listings.reduce((acc, listing) => {
            acc[listing.category] = (acc[listing.category] || 0) + 1;
            return acc;
        }, {});

        setCategoryData({
            labels: Object.keys(categoryCount).map(cat => 
                cat === 'pet' ? 'Pets' : 
                cat === 'pet-food' ? 'Pet Food' : 
                cat === 'accessories' ? 'Accessories' : 
                cat === 'care-products' ? 'Care Products' : cat
            ),
            datasets: [createDoughnutDataset(Object.values(categoryCount))]
        });

        // Order trends (last 30 days)
        const last30Days = Array.from({ length: 30 }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - (29 - i));
            return date.toISOString().split('T')[0];
        });

        const orderTrend = last30Days.map(date => {
            const count = orders.filter(order => {
                const orderDate = safeParseDate(order.date);
                if (!orderDate) return false;
                
                return orderDate.toISOString().split('T')[0] === date;
            }).length;
            return count;
        });

        setOrderTrends({
            labels: last30Days.map((date, index) => index % 5 === 0 ? new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''),
            datasets: [createBarDataset('Orders', orderTrend, brandColors.primary)]
        });
    }, [safeParseDate]);

    const fetchDashboardData = useCallback(async () => {
        try {
            setLoading(true);
            
            // Fetch basic stats from your existing endpoints
            const [usersRes, listingsRes, ordersRes] = await Promise.all([
                axios.get('https://adoptyco.vercel.app/users'),
                axios.get('https://adoptyco.vercel.app/listings'),
                axios.get('https://adoptyco.vercel.app/orders')
            ]);

            const users = usersRes.data;
            const listings = listingsRes.data;
            const orders = ordersRes.data;

            // Calculate stats
            const now = new Date();
            const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
            const thisWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

            // Filter data by time periods with safe date parsing
            const newUsersThisMonth = users.filter(user => {
                const userDate = safeParseDate(user.createdAt || user.registrationDate);
                return userDate && userDate >= thisMonth;
            }).length;

            const newListingsThisWeek = listings.filter(listing => {
                const listingDate = safeParseDate(listing.date);
                return listingDate && listingDate >= thisWeek;
            }).length;

            const ordersToday = orders.filter(order => {
                const orderDate = safeParseDate(order.date);
                return orderDate && orderDate >= today;
            }).length;

            const revenueThisMonth = orders
                .filter(order => {
                    const orderDate = safeParseDate(order.date);
                    return orderDate && orderDate >= thisMonth;
                })
                .reduce((sum, order) => sum + (order.price || 0), 0);

            setStats({
                totalUsers: users.length,
                totalListings: listings.length,
                totalOrders: orders.length,
                newUsersThisMonth,
                newListingsThisWeek,
                ordersToday,
                revenueThisMonth
            });

            // Prepare chart data
            prepareChartData(users, listings, orders);
            
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    }, [prepareChartData, safeParseDate]);

    useEffect(() => {
        fetchDashboardData();
    }, [fetchDashboardData]);

    const chartOptions = defaultChartOptions;
    const doughnutChartOptions = doughnutOptions;

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <Loading viewHeight={60} color={'#556B2F'} />
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-[#556B2F] dark:text-[#F7F3E9] mb-2">
                    Dashboard Overview
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                    Monitor your platform's performance and growth
                </p>
            </div>

            {/* Stats Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Total Users"
                    value={stats.totalUsers.toLocaleString()}
                    icon={<FaUsers />}
                    trend="up"
                    trendValue={`+${stats.newUsersThisMonth} this month`}
                    color="bg-[#556B2F]"
                />
                <StatsCard
                    title="Total Listings"
                    value={stats.totalListings.toLocaleString()}
                    icon={<MdPets />}
                    trend="up"
                    trendValue={`+${stats.newListingsThisWeek} this week`}
                    color="bg-[#6B8E23]"
                />
                <StatsCard
                    title="Total Orders"
                    value={stats.totalOrders.toLocaleString()}
                    icon={<FaShoppingBag />}
                    trend="up"
                    trendValue={`${stats.ordersToday} today`}
                    color="bg-[#8FBC8F]"
                />
                <StatsCard
                    title="Revenue (BDT)"
                    value={`৳${stats.revenueThisMonth.toLocaleString()}`}
                    icon={<MdTrendingUp />}
                    trend="up"
                    trendValue="This month"
                    color="bg-[#9ACD32]"
                />
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartCard title="User Growth (Last 7 Days)">
                    {userGrowthData && (
                        <Line data={userGrowthData} options={lineChartOptions} />
                    )}
                </ChartCard>

                <ChartCard title="Listing Categories">
                    {categoryData && (
                        <Doughnut data={categoryData} options={doughnutChartOptions} />
                    )}
                </ChartCard>
            </div>

            {/* Order Trends Chart */}
            <div className="grid grid-cols-1 gap-6">
                <ChartCard title="Order Trends (Last 30 Days)" className="col-span-full">
                    {orderTrends && (
                        <Bar data={orderTrends} options={chartOptions} />
                    )}
                </ChartCard>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-[#556B2F] dark:text-[#F7F3E9] mb-4">
                    Quick Actions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button className="p-4 bg-[#556B2F] text-[#F7F3E9] rounded-lg hover:bg-[#6B8E23] transition-colors">
                        Export User Data
                    </button>
                    <button className="p-4 bg-[#556B2F] text-[#F7F3E9] rounded-lg hover:bg-[#6B8E23] transition-colors">
                        Generate Report
                    </button>
                    <button className="p-4 bg-[#556B2F] text-[#F7F3E9] rounded-lg hover:bg-[#6B8E23] transition-colors">
                        View Analytics
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;