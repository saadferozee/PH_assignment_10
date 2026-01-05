import { useState } from 'react';
import { FaTimes, FaUser, FaBox, FaCalendar, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { MdPending, MdLocalShipping, MdDone, MdCancel } from 'react-icons/md';
import { TbCoinTaka } from 'react-icons/tb';

const OrderModal = ({ order, productInfo, customerInfo, isOpen, onClose, onStatusChange }) => {
    const [selectedStatus, setSelectedStatus] = useState('');

    if (!isOpen || !order) return null;

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending': return <MdPending className="text-yellow-600" />;
            case 'processing': return <MdLocalShipping className="text-blue-600" />;
            case 'completed': return <MdDone className="text-green-600" />;
            case 'cancelled': return <MdCancel className="text-red-600" />;
            default: return <MdPending className="text-gray-600" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'processing': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'completed': return 'bg-green-100 text-green-800 border-green-200';
            case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const handleStatusUpdate = () => {
        if (selectedStatus && selectedStatus !== order.status) {
            onStatusChange(order._id, selectedStatus);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                    <div>
                        <h2 className="text-2xl font-bold text-[#556B2F] dark:text-[#F7F3E9]">
                            Order Details
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 font-mono text-sm">
                            #{order._id.slice(-8).toUpperCase()}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                        <FaTimes className="text-gray-500" />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {/* Order Status */}
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                Order Status
                            </h3>
                            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(order.status || 'pending')}`}>
                                {getStatusIcon(order.status || 'pending')}
                                {((order.status || 'pending').charAt(0).toUpperCase() + (order.status || 'pending').slice(1))}
                            </span>
                        </div>
                        
                        {/* Status Update */}
                        <div className="flex items-center gap-3">
                            <select
                                value={selectedStatus || order.status || 'pending'}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#556B2F] focus:border-transparent"
                            >
                                <option value="pending">Pending</option>
                                <option value="processing">Processing</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                            <button
                                onClick={handleStatusUpdate}
                                disabled={!selectedStatus || selectedStatus === (order.status || 'pending')}
                                className="px-4 py-2 bg-[#556B2F] text-white rounded-lg hover:bg-[#6B8E23] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Update Status
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Customer Information */}
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                                <FaUser className="text-[#556B2F]" />
                                Customer Information
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center space-x-3">
                                    <img
                                        src={customerInfo?.photoURL || 'https://img.icons8.com/ink/96/556B2F/user-male-circle.png'}
                                        alt="Customer"
                                        className={`w-12 h-12 rounded-full object-cover ${customerInfo.photoURL && 'border-2 border-[#556B2F]'}`}
                                    />
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-gray-100">
                                            {order.buyerName || customerInfo?.name || 'Unknown Customer'}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                            <FaEnvelope className="text-xs" />
                                            {order.buyerEmail}
                                        </p>
                                    </div>
                                </div>
                                
                                {order.phoneNumber && (
                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                        <FaPhone className="text-[#556B2F]" />
                                        {order.phoneNumber}
                                    </div>
                                )}
                                
                                {order.address && (
                                    <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                                        <FaMapMarkerAlt className="text-[#556B2F] mt-0.5" />
                                        <span>{order.address}</span>
                                    </div>
                                )}
                                
                                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                    <FaCalendar className="text-[#556B2F]" />
                                    Ordered on {new Date(order.date).toLocaleDateString('en-US', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Product Information */}
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                                <FaBox className="text-[#556B2F]" />
                                Product Information
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center space-x-3">
                                    <img
                                        src={productInfo?.photoURL || 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=60&h=60&fit=crop&crop=center'}
                                        alt="Product"
                                        className="w-16 h-16 rounded-lg object-cover border-2 border-[#556B2F]"
                                    />
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-gray-100">
                                            {order.productName || productInfo?.name || 'Product Not Found'}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Category: {productInfo?.category || 'N/A'}
                                        </p>
                                        {productInfo?.location && (
                                            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                                <FaMapMarkerAlt className="text-xs" />
                                                {productInfo.location}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                
                                <div className="bg-white dark:bg-gray-600 rounded-lg p-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600 dark:text-gray-300">Order Total:</span>
                                        <div className="flex items-center">
                                            {parseInt(order.price) === 0 ? (
                                                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                                                    Free
                                                </span>
                                            ) : (
                                                <span className="flex items-center text-lg font-bold text-[#556B2F]">
                                                    <TbCoinTaka className="mr-1" />
                                                    {parseInt(order.price).toLocaleString()}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                
                                {productInfo?.description && (
                                    <div>
                                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description:</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-600 rounded-lg p-3">
                                            {productInfo.description}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Order Timeline */}
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                            Order Timeline
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 bg-[#556B2F] rounded-full"></div>
                                <div>
                                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Order Placed</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {new Date(order.date).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                            
                            {(order.status || 'pending') !== 'pending' && (
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Order Processing</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Status updated</p>
                                    </div>
                                </div>
                            )}
                            
                            {(order.status || 'pending') === 'completed' && (
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Order Completed</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Successfully delivered</p>
                                    </div>
                                </div>
                            )}
                            
                            {(order.status || 'pending') === 'cancelled' && (
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Order Cancelled</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Order was cancelled</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Additional Notes */}
                    {order.note && (
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                                Order Notes
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {order.note}
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderModal;