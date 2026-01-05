import { useState, useCallback } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const useListingManagement = () => {
    const [loading, setLoading] = useState(false);

    const deleteListing = useCallback(async (listingId) => {
        try {
            setLoading(true);
            const response = await axios.delete(`https://adoptyco.vercel.app/listings/delete/${listingId}`);
            
            if (response.status === 200) {
                await Swal.fire({
                    title: 'Deleted!',
                    text: 'Listing has been deleted successfully',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                });
                return { success: true, data: response.data };
            }
        } catch (error) {
            console.error('Error deleting listing:', error);
            await Swal.fire({
                title: 'Error!',
                text: 'Failed to delete listing',
                icon: 'error'
            });
            return { success: false, error };
        } finally {
            setLoading(false);
        }
    }, []);

    const updateListing = useCallback(async (listingId, updateData) => {
        try {
            setLoading(true);
            const response = await axios.put(`https://adoptyco.vercel.app/listings/update/${listingId}`, updateData);
            
            if (response.status === 200) {
                await Swal.fire({
                    title: 'Updated!',
                    text: 'Listing has been updated successfully',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                });
                return { success: true, data: response.data };
            }
        } catch (error) {
            console.error('Error updating listing:', error);
            await Swal.fire({
                title: 'Error!',
                text: 'Failed to update listing',
                icon: 'error'
            });
            return { success: false, error };
        } finally {
            setLoading(false);
        }
    }, []);

    const confirmListingDeletion = useCallback(async (listingName) => {
        const result = await Swal.fire({
            title: 'Delete Listing?',
            html: `
                <div class="text-left">
                    <p>Are you sure you want to delete:</p>
                    <p><strong>"${listingName}"</strong></p>
                    <p class="text-red-600 mt-2">This action cannot be undone!</p>
                </div>
            `,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#556B2F',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        });

        return result.isConfirmed;
    }, []);

    const getListingAnalytics = useCallback((listings, orders) => {
        const analytics = listings.map(listing => {
            const listingOrders = orders.filter(order => order.productId === listing._id);
            const revenue = listingOrders.reduce((sum, order) => sum + (parseInt(order.price) || 0), 0);
            
            return {
                ...listing,
                orderCount: listingOrders.length,
                revenue,
                lastOrderDate: listingOrders.length > 0 
                    ? new Date(Math.max(...listingOrders.map(order => new Date(order.date))))
                    : null
            };
        });

        return analytics.sort((a, b) => b.orderCount - a.orderCount);
    }, []);

    const getVendorAnalytics = useCallback((listings, orders) => {
        const vendorMap = new Map();

        listings.forEach(listing => {
            const email = listing.email;
            if (!vendorMap.has(email)) {
                vendorMap.set(email, {
                    email,
                    listings: [],
                    totalOrders: 0,
                    totalRevenue: 0
                });
            }
            vendorMap.get(email).listings.push(listing);
        });

        orders.forEach(order => {
            const listing = listings.find(l => l._id === order.productId);
            if (listing) {
                const vendor = vendorMap.get(listing.email);
                if (vendor) {
                    vendor.totalOrders++;
                    vendor.totalRevenue += parseInt(order.price) || 0;
                }
            }
        });

        return Array.from(vendorMap.values()).sort((a, b) => b.totalRevenue - a.totalRevenue);
    }, []);

    return {
        loading,
        deleteListing,
        updateListing,
        confirmListingDeletion,
        getListingAnalytics,
        getVendorAnalytics
    };
};

export default useListingManagement;