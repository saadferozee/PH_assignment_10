import { useState, useEffect, useCallback } from 'react';
import { FaUsers, FaShoppingBag, FaEye, FaHeart, FaChartLine, FaCalendarAlt } from 'react-icons/fa';
import { FaUserCog } from 'react-icons/fa';
import { MdPets, MdTrendingUp, MdAttachMoney, MdPendingActions, MdCheckCircle, MdCancel } from 'react-icons/md';
import { TbCoinTaka } from 'react-icons/tb';
import { Line, Bar, Doughnut, Pie } from 'react-chartjs-2';
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
        revenueThisMonth: 0,
        // New enhanced stats
        pendingOrders: 0,
        completedOrders: 0,
        cancelledOrders: 0,
        averageOrderValue: 0,
        totalRevenue: 0,
        activeListings: 0,
        freeListings: 0,
        paidListings: 0,
        adminUsers: 0,
        regularUsers: 0,
        recentUsers: 0,
        topCategory: '',
        conversionRate: 0,
        growthRate: 0
    });
    const [userGrowthData, setUserGrowthData] = useState(null);
    const [categoryData, setCategoryData] = useState(null);
    const [orderTrends, setOrderTrends] = useState(null);
    const [orderStatusData, setOrderStatusData] = useState(null);
    const [revenueData, setRevenueData] = useState(null);

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

        // Order status distribution
        const statusCount = orders.reduce((acc, order) => {
            const status = order.status || 'pending';
            acc[status] = (acc[status] || 0) + 1;
            return acc;
        }, {});

        setOrderStatusData({
            labels: Object.keys(statusCount).map(status => 
                status.charAt(0).toUpperCase() + status.slice(1)
            ),
            datasets: [createDoughnutDataset(Object.values(statusCount))]
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

        // Revenue trends (last 30 days)
        const revenueTrend = last30Days.map(date => {
            const dayRevenue = orders.filter(order => {
                const orderDate = safeParseDate(order.date);
                if (!orderDate) return false;
                return orderDate.toISOString().split('T')[0] === date;
            }).reduce((sum, order) => sum + (parseInt(order.price) || 0), 0);
            return dayRevenue;
        });

        setRevenueData({
            labels: last30Days.map((date, index) => index % 5 === 0 ? new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''),
            datasets: [createLineDataset('Revenue (৳)', revenueTrend, brandColors.secondary)]
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
                .reduce((sum, order) => sum + (parseInt(order.price) || 0), 0);

            // Enhanced stats calculations
            const pendingOrders = orders.filter(order => (order.status || 'pending') === 'pending').length;
            const completedOrders = orders.filter(order => (order.status || 'pending') === 'completed').length;
            const cancelledOrders = orders.filter(order => (order.status || 'pending') === 'cancelled').length;
            
            const totalRevenue = orders.reduce((sum, order) => sum + (parseInt(order.price) || 0), 0);
            const averageOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;
            
            const activeListings = listings.filter(listing => listing.price !== undefined).length;
            const freeListings = listings.filter(listing => listing.price === 0).length;
            const paidListings = listings.filter(listing => listing.price > 0).length;
            
            const adminUsers = users.filter(user => user.role === 'admin').length;
            const regularUsers = users.filter(user => user.role !== 'admin').length;
            
            const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            const recentUsers = users.filter(user => {
                const userDate = safeParseDate(user.createdAt || user.registrationDate);
                return userDate && userDate >= last7Days;
            }).length;
            
            // Find top category
            const categoryCount = listings.reduce((acc, listing) => {
                acc[listing.category] = (acc[listing.category] || 0) + 1;
                return acc;
            }, {});
            const topCategory = Object.keys(categoryCount).reduce((a, b) => 
                categoryCount[a] > categoryCount[b] ? a : b, 'pet'
            );
            
            // Calculate conversion rate (orders/listings ratio)
            const conversionRate = listings.length > 0 ? (orders.length / listings.length) * 100 : 0;
            
            // Calculate growth rate (new users this month vs last month)
            const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
            const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
            const lastMonthUsers = users.filter(user => {
                const userDate = safeParseDate(user.createdAt || user.registrationDate);
                return userDate && userDate >= lastMonth && userDate <= lastMonthEnd;
            }).length;
            const growthRate = lastMonthUsers > 0 ? ((newUsersThisMonth - lastMonthUsers) / lastMonthUsers) * 100 : 0;

            setStats({
                totalUsers: users.length,
                totalListings: listings.length,
                totalOrders: orders.length,
                newUsersThisMonth,
                newListingsThisWeek,
                ordersToday,
                revenueThisMonth,
                pendingOrders,
                completedOrders,
                cancelledOrders,
                averageOrderValue,
                totalRevenue,
                activeListings,
                freeListings,
                paidListings,
                adminUsers,
                regularUsers,
                recentUsers,
                topCategory,
                conversionRate,
                growthRate
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
                <p className="text-gray-600 dark:text-gray-300">
                    Monitor your platform's performance and growth with comprehensive analytics
                </p>
            </div>

            {/* Primary Stats Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Total Users"
                    value={stats.totalUsers.toLocaleString()}
                    icon={<FaUsers />}
                    trend={stats.growthRate >= 0 ? "up" : "down"}
                    trendValue={`${stats.growthRate >= 0 ? '+' : ''}${stats.growthRate.toFixed(1)}% growth`}
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
                    title="Total Revenue"
                    value={`৳${stats.totalRevenue.toLocaleString()}`}
                    icon={<TbCoinTaka />}
                    trend="up"
                    trendValue={`৳${stats.revenueThisMonth.toLocaleString()} this month`}
                    color="bg-[#9ACD32]"
                />
            </div>

            {/* Secondary Stats Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Pending Orders"
                    value={stats.pendingOrders.toLocaleString()}
                    icon={<MdPendingActions />}
                    trend="neutral"
                    trendValue="Awaiting processing"
                    color="bg-yellow-500"
                />
                <StatsCard
                    title="Completed Orders"
                    value={stats.completedOrders.toLocaleString()}
                    icon={<MdCheckCircle />}
                    trend="up"
                    trendValue={`${((stats.completedOrders / stats.totalOrders) * 100).toFixed(1)}% completion rate`}
                    color="bg-green-500"
                />
                <StatsCard
                    title="Average Order Value"
                    value={`৳${stats.averageOrderValue.toFixed(0)}`}
                    icon={<MdAttachMoney />}
                    trend="up"
                    trendValue="Per order"
                    color="bg-blue-500"
                />
                <StatsCard
                    title="Conversion Rate"
                    value={`${stats.conversionRate.toFixed(1)}%`}
                    icon={<FaChartLine />}
                    trend={stats.conversionRate > 50 ? "up" : "neutral"}
                    trendValue="Orders per listing"
                    color="bg-purple-500"
                />
            </div>

            {/* Tertiary Stats Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-600 border-opacity-30">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Admin Users</p>
                            <p className="text-2xl font-bold text-[#556B2F]">{stats.adminUsers}</p>
                        </div>
                        <FaUserCog className="text-2xl text-[#556B2F] opacity-70" />
                    </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-600 border-opacity-30">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Free Listings</p>
                            <p className="text-2xl font-bold text-green-600">{stats.freeListings}</p>
                        </div>
                        <FaHeart className="text-2xl text-green-600 opacity-70" />
                    </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-600 border-opacity-30">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Paid Listings</p>
                            <p className="text-2xl font-bold text-blue-600">{stats.paidListings}</p>
                        </div>
                        <TbCoinTaka className="text-2xl text-blue-600 opacity-70" />
                    </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-600 border-opacity-30">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Recent Users</p>
                            <p className="text-2xl font-bold text-purple-600">{stats.recentUsers}</p>
                        </div>
                        <FaCalendarAlt className="text-2xl text-purple-600 opacity-70" />
                    </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-600 border-opacity-30">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Top Category</p>
                            <p className="text-lg font-bold text-orange-600 capitalize">{stats.topCategory}</p>
                        </div>
                        <MdTrendingUp className="text-2xl text-orange-600 opacity-70" />
                    </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-600 border-opacity-30">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Cancelled</p>
                            <p className="text-2xl font-bold text-red-600">{stats.cancelledOrders}</p>
                        </div>
                        <MdCancel className="text-2xl text-red-600 opacity-70" />
                    </div>
                </div>
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

                <ChartCard title="Order Status Distribution">
                    {orderStatusData && (
                        <Pie data={orderStatusData} options={doughnutChartOptions} />
                    )}
                </ChartCard>

                <ChartCard title="Revenue Trends (Last 30 Days)">
                    {revenueData && (
                        <Line data={revenueData} options={lineChartOptions} />
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

            {/* Performance Insights */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-600 border-opacity-30">
                <h3 className="text-xl font-semibold text-[#556B2F] dark:text-[#F7F3E9] mb-4">
                    Performance Insights
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">User Engagement</h4>
                        <p className="text-sm text-blue-600 dark:text-blue-300">
                            {stats.recentUsers} new users joined in the last 7 days, showing {stats.growthRate >= 0 ? 'positive' : 'negative'} growth trend.
                        </p>
                    </div>
                    <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 rounded-lg p-4">
                        <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Order Performance</h4>
                        <p className="text-sm text-green-600 dark:text-green-300">
                            {((stats.completedOrders / stats.totalOrders) * 100).toFixed(1)}% order completion rate with ৳{stats.averageOrderValue.toFixed(0)} average value.
                        </p>
                    </div>
                    <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 rounded-lg p-4">
                        <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">Market Activity</h4>
                        <p className="text-sm text-purple-600 dark:text-purple-300">
                            {stats.topCategory} is the most popular category with {stats.conversionRate.toFixed(1)}% conversion rate.
                        </p>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-600 border-opacity-30">
                <h3 className="text-xl font-semibold text-[#556B2F] dark:text-[#F7F3E9] mb-4">
                    Quick Actions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <button className="p-4 bg-[#556B2F] text-[#F7F3E9] rounded-lg hover:bg-[#6B8E23] transition-colors flex items-center gap-2">
                        <FaEye />
                        View All Orders
                    </button>
                    <button className="p-4 bg-[#556B2F] text-[#F7F3E9] rounded-lg hover:bg-[#6B8E23] transition-colors flex items-center gap-2">
                        <FaUsers />
                        Manage Users
                    </button>
                    <button className="p-4 bg-[#556B2F] text-[#F7F3E9] rounded-lg hover:bg-[#6B8E23] transition-colors flex items-center gap-2">
                        <MdPets />
                        View Listings
                    </button>
                    <button className="p-4 bg-[#556B2F] text-[#F7F3E9] rounded-lg hover:bg-[#6B8E23] transition-colors flex items-center gap-2">
                        <FaChartLine />
                        Export Report
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;