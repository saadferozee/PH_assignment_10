import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const useOrderManagement = () => {
    const [loading, setLoading] = useState(false);

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            setLoading(true);
            const response = await axios.put(`https://adoptyco.vercel.app/orders/status/${orderId}`, {
                status: newStatus
            });
            
            if (response.status === 200) {
                return { success: true, data: response.data };
            }
            return { success: false, error: 'Failed to update order status' };
        } catch (error) {
            console.error('Error updating order status:', error);
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };

    const confirmStatusChange = async (currentStatus, newStatus) => {
        const result = await Swal.fire({
            title: 'Update Order Status?',
            text: `Change status from "${currentStatus}" to "${newStatus}"?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#556B2F',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, update it!'
        });
        
        return result.isConfirmed;
    };

    const deleteOrder = async (orderId) => {
        try {
            setLoading(true);
            const response = await axios.delete(`https://adoptyco.vercel.app/orders/${orderId}`);
            
            if (response.status === 200) {
                return { success: true, data: response.data };
            }
            return { success: false, error: 'Failed to delete order' };
        } catch (error) {
            console.error('Error deleting order:', error);
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };

    const confirmOrderDeletion = async (orderInfo) => {
        const result = await Swal.fire({
            title: 'Delete Order?',
            text: `Are you sure you want to delete order #${orderInfo}? This action cannot be undone!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#556B2F',
            confirmButtonText: 'Yes, delete it!'
        });
        
        return result.isConfirmed;
    };

    const getOrderAnalytics = (orders) => {
        const totalOrders = orders.length;
        const pendingOrders = orders.filter(order => order.status === 'pending').length;
        const processingOrders = orders.filter(order => order.status === 'processing').length;
        const completedOrders = orders.filter(order => order.status === 'completed').length;
        const cancelledOrders = orders.filter(order => order.status === 'cancelled').length;
        
        const totalRevenue = orders
            .filter(order => order.status === 'completed')
            .reduce((sum, order) => sum + (parseInt(order.price) || 0), 0);
        
        const averageOrderValue = completedOrders > 0 ? totalRevenue / completedOrders : 0;
        
        // Calculate completion rate
        const completionRate = totalOrders > 0 ? (completedOrders / totalOrders) * 100 : 0;
        
        // Get recent orders (last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const recentOrders = orders.filter(order => 
            new Date(order.orderDate) >= sevenDaysAgo
        ).length;
        
        return {
            totalOrders,
            pendingOrders,
            processingOrders,
            completedOrders,
            cancelledOrders,
            totalRevenue,
            averageOrderValue,
            completionRate,
            recentOrders
        };
    };

    return {
        loading,
        updateOrderStatus,
        confirmStatusChange,
        deleteOrder,
        confirmOrderDeletion,
        getOrderAnalytics
    };
};

export default useOrderManagement;