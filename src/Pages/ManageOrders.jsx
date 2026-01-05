import { useState, useEffect } from 'react';
import { FaShoppingBag, FaClock, FaCheckCircle, FaEye, FaEdit, FaSearch } from 'react-icons/fa';
import { MdPending, MdLocalShipping, MdDone, MdCancel } from 'react-icons/md';
import { TbCoinTaka } from 'react-icons/tb';
import axios from 'axios';
import Swal from 'sweetalert2';
import Loading from './Loading';
import ReactTooltip from '../Elements/ReactTooltip';
import OrderModal from '../Components/OrderModal';
import useOrderManagement from '../Hooks/useOrderManagement';

const ManageOrders = () => {
    const [orders, setOrders] = useState([]);
    const [listings, setListings] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [dateFilter, setDateFilter] = useState('all');

    const { 
        loading: _actionLoading, 
        updateOrderStatus: _updateOrderStatus, 
        confirmStatusChange: _confirmStatusChange 
    } = useOrderManagement();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [ordersRes, listingsRes, usersRes] = await Promise.all([
                axios.get('https://adoptyco.vercel.app/orders'),
                axios.get('https://adoptyco.vercel.app/listings'),
                axios.get('https://adoptyco.vercel.app/users')
            ]);

            setOrders(ordersRes.data);
            setListings(listingsRes.data);
            setUsers(usersRes.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to fetch orders data',
                icon: 'error'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleViewOrder = (order) => {
        setSelectedOrder(order);
        setShowModal(true);
    };

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            const result = await Swal.fire({
                title: 'Update Order Status?',
                text: `Are you sure you want to change this order status to ${newStatus}?`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#556B2F',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, update it!'
            });

            if (result.isConfirmed) {
                const response = await axios.put(`https://adoptyco.vercel.app/orders/status/${orderId}`, {
                    status: newStatus
                });

                if (response.status === 200) {
                    setOrders(orders.map(order => 
                        order._id === orderId ? { ...order, status: newStatus } : order
                    ));

                    Swal.fire({
                        title: 'Success!',
                        text: `Order status updated to ${newStatus}`,
                        icon: 'success'
                    });
                }
            }
        } catch (error) {
            console.error('Error updating order status:', error);
            console.error('Error details:', error.response?.data);
            Swal.fire({
                title: 'Error!',
                text: error.response?.data?.error || 'Failed to update order status',
                icon: 'error'
            });
        }
    };

    const getProductInfo = (productId) => {
        return listings.find(listing => listing._id === productId) || {};
    };

    const getCustomerInfo = (buyerEmail) => {
        return users.find(user => user.email === buyerEmail) || {};
    };

    const filteredOrders = orders.filter(order => {
        const productInfo = getProductInfo(order.productId);
        const customerInfo = getCustomerInfo(order.buyerEmail);
        
        const matchesSearch = order.buyerEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            order.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            order.buyerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            productInfo.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            customerInfo.name?.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = statusFilter === 'all' || (order.status || 'pending') === statusFilter;
        
        const matchesDate = dateFilter === 'all' || (() => {
            const orderDate = new Date(order.date);
            const now = new Date();
            const daysDiff = Math.floor((now - orderDate) / (1000 * 60 * 60 * 24));
            
            switch (dateFilter) {
                case 'today': return daysDiff === 0;
                case 'week': return daysDiff <= 7;
                case 'month': return daysDiff <= 30;
                default: return true;
            }
        })();
        
        return matchesSearch && matchesStatus && matchesDate;
    });

    const getOrderStats = () => {
        const totalOrders = orders.length;
        const pendingOrders = orders.filter(order => (order.status || 'pending') === 'pending').length;
        const processingOrders = orders.filter(order => (order.status || 'pending') === 'processing').length;
        const completedOrders = orders.filter(order => (order.status || 'pending') === 'completed').length;
        const cancelledOrders = orders.filter(order => (order.status || 'pending') === 'cancelled').length;
        const totalRevenue = orders
            .filter(order => (order.status || 'pending') === 'completed')
            .reduce((sum, order) => sum + (parseInt(order.price) || 0), 0);
        
        return { 
            totalOrders, 
            pendingOrders, 
            processingOrders, 
            completedOrders, 
            cancelledOrders,
            totalRevenue
        };
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending': return <MdPending className="text-yellow-600" />;
            case 'processing': return <MdLocalShipping className="text-blue-600" />;
            case 'completed': return <MdDone className="text-green-600" />;
            case 'cancelled': return <MdCancel className="text-red-600" />;
            default: return <FaClock className="text-gray-600" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'processing': return 'bg-blue-100 text-blue-800';
            case 'completed': return 'bg-green-100 text-green-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const stats = getOrderStats();

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <Loading viewHeight={60} color={'#556B2F'} />
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            <title>AdoptyCo | Manage Orders</title>
            
            {/* Header */}
            <div className="mb-8">
                <p className="text-gray-600 dark:text-gray-300">
                    Manage customer orders, track status, and monitor sales performance
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="bg-[#556B2F] rounded-2xl p-6 text-[#F7F3E9] shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm opacity-80 mb-1">Total Orders</p>
                            <p className="text-3xl font-bold">{stats.totalOrders}</p>
                            <p className="text-xs opacity-70 mt-1">All time</p>
                        </div>
                        <FaShoppingBag className="text-4xl opacity-70" />
                    </div>
                </div>
                
                <div className="bg-[#6B8E23] rounded-2xl p-6 text-[#F7F3E9] shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm opacity-80 mb-1">Pending Orders</p>
                            <p className="text-3xl font-bold">{stats.pendingOrders}</p>
                            <p className="text-xs opacity-70 mt-1">Awaiting processing</p>
                        </div>
                        <FaClock className="text-4xl opacity-70" />
                    </div>
                </div>

                <div className="bg-[#8FBC8F] rounded-2xl p-6 text-[#F7F3E9] shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm opacity-80 mb-1">Completed Orders</p>
                            <p className="text-3xl font-bold">{stats.completedOrders}</p>
                            <p className="text-xs opacity-70 mt-1">Successfully delivered</p>
                        </div>
                        <FaCheckCircle className="text-4xl opacity-70" />
                    </div>
                </div>

                <div className="bg-[#9ACD32] rounded-2xl p-6 text-[#F7F3E9] shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm opacity-80 mb-1">Total Revenue</p>
                            <p className="text-2xl font-bold flex items-center">
                                ৳{stats.totalRevenue.toLocaleString()}
                            </p>
                            <p className="text-xs opacity-70 mt-1">From completed orders</p>
                        </div>
                        <TbCoinTaka className="text-4xl opacity-70" />
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-600 border-opacity-30">
                <div className="flex flex-col lg:flex-row gap-4 mb-6">
                    <div className="flex-1 relative">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search orders by customer, product, or order details..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#556B2F] focus:border-transparent"
                        />
                    </div>
                    <div className="flex gap-3">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#556B2F] focus:border-transparent"
                        >
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                        <select
                            value={dateFilter}
                            onChange={(e) => setDateFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#556B2F] focus:border-transparent"
                        >
                            <option value="all">All Time</option>
                            <option value="today">Today</option>
                            <option value="week">This Week</option>
                            <option value="month">This Month</option>
                        </select>
                    </div>
                </div>

                {/* Orders Table */}
                <div className="overflow-x-auto border border-gray-200 dark:border-gray-600 border-opacity-30 rounded-xl">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th className="text-left py-3 px-4 font-semibold text-[#556B2F] dark:text-[#F7F3E9]">Order ID</th>
                                <th className="text-left py-3 px-4 font-semibold text-[#556B2F] dark:text-[#F7F3E9]">Customer</th>
                                <th className="text-left py-3 px-4 font-semibold text-[#556B2F] dark:text-[#F7F3E9]">Product</th>
                                <th className="text-left py-3 px-4 font-semibold text-[#556B2F] dark:text-[#F7F3E9]">Price</th>
                                <th className="text-left py-3 px-4 font-semibold text-[#556B2F] dark:text-[#F7F3E9]">Status</th>
                                <th className="text-left py-3 px-4 font-semibold text-[#556B2F] dark:text-[#F7F3E9]">Date</th>
                                <th className="text-center py-3 px-4 font-semibold text-[#556B2F] dark:text-[#F7F3E9]">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map((order) => {
                                const productInfo = getProductInfo(order.productId);
                                const customerInfo = getCustomerInfo(order.buyerEmail);
                                
                                return (
                                    <tr key={order._id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="py-4 px-4">
                                            <div className="font-mono text-sm text-gray-600 dark:text-gray-300">
                                                #{order._id.slice(-8).toUpperCase()}
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center space-x-3">
                                                <img
                                                    src={customerInfo.photoURL || 'https://img.icons8.com/ink/96/556B2F/user-male-circle.png'}
                                                    alt="Customer"
                                                    className={`w-10 h-10 rounded-full object-cover ${ customerInfo.photoURL && 'border-2 border-[#556B2F]'}`}
                                                />
                                                <div>
                                                    <p className="font-medium text-gray-900 dark:text-gray-100">
                                                        {order.buyerName || customerInfo.name || 'Unknown Customer'}
                                                    </p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        {order.buyerEmail}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center space-x-3">
                                                <img
                                                    src={productInfo.photoURL || 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=50&h=50&fit=crop&crop=center'}
                                                    alt="Product"
                                                    className="w-12 h-12 rounded-lg object-cover border-2 border-[#556B2F]"
                                                />
                                                <div>
                                                    <p className="font-medium text-gray-900 dark:text-gray-100">
                                                        {order.productName || productInfo.name || 'Product Not Found'}
                                                    </p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        {productInfo.category || 'N/A'}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center">
                                                {parseInt(order.price) === 0 ? (
                                                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                                                        Free
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center font-medium text-gray-900 dark:text-gray-100">
                                                        ৳{parseInt(order.price).toLocaleString()}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status || 'pending')}`}>
                                                {getStatusIcon(order.status || 'pending')}
                                                {((order.status || 'pending').charAt(0).toUpperCase() + (order.status || 'pending').slice(1))}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 text-gray-600 dark:text-gray-300 text-sm">
                                            {new Date(order.date).toLocaleDateString()}
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center justify-center space-x-2">
                                                <ReactTooltip id={`view-${order._id}`} content="View Details" place="top">
                                                    <button
                                                        onClick={() => handleViewOrder(order)}
                                                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                                                    >
                                                        <FaEye />
                                                    </button>
                                                </ReactTooltip>
                                                
                                                <ReactTooltip id={`status-${order._id}`} content="Update Status" place="top">
                                                    <button
                                                        onClick={() => {
                                                            const currentStatus = order.status || 'pending';
                                                            const nextStatus = currentStatus === 'pending' ? 'processing' :
                                                                             currentStatus === 'processing' ? 'completed' :
                                                                             currentStatus === 'completed' ? 'pending' : 'pending';
                                                            handleStatusChange(order._id, nextStatus);
                                                        }}
                                                        className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                                                    >
                                                        <FaEdit />
                                                    </button>
                                                </ReactTooltip>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    
                    {filteredOrders.length === 0 && (
                        <div className="text-center py-8">
                            <p className="text-gray-500 dark:text-gray-400">No orders found matching your criteria.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Order Details Modal */}
            <OrderModal
                order={selectedOrder}
                productInfo={selectedOrder ? getProductInfo(selectedOrder.productId) : null}
                customerInfo={selectedOrder ? getCustomerInfo(selectedOrder.buyerEmail) : null}
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onStatusChange={handleStatusChange}
            />
        </div>
    );
};

export default ManageOrders;