import React, { useState, useEffect } from 'react';
import { FaStore, FaPaw, FaShoppingBag, FaEye, FaEdit, FaTrash, FaSearch, FaUser } from 'react-icons/fa';
import { MdPets, MdFastfood, MdToys, MdHealthAndSafety, MdCategory } from 'react-icons/md';
import { TbCoinTaka } from 'react-icons/tb';
import axios from 'axios';
import Swal from 'sweetalert2';
import Loading from './Loading';
import ReactTooltip from '../Elements/ReactTooltip';
import ListingModal from '../Components/ListingModal';
import useListingManagement from '../Hooks/useListingManagement';

const ManageListings = () => {
    const [listings, setListings] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedListing, setSelectedListing] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [priceFilter, setPriceFilter] = useState('all');

    const { 
        loading: _actionLoading, 
        deleteListing, 
        confirmListingDeletion 
    } = useListingManagement();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [listingsRes, ordersRes] = await Promise.all([
                axios.get('https://adoptyco.vercel.app/listings'),
                axios.get('https://adoptyco.vercel.app/orders')
            ]);
            setListings(listingsRes.data);
            setOrders(ordersRes.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to fetch listings data',
                icon: 'error'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleViewListing = (listing) => {
        setSelectedListing(listing);
        setShowModal(true);
    };

    const handleDeleteListing = async (listingId, listingName) => {
        const confirmed = await confirmListingDeletion(listingName);
        if (confirmed) {
            const result = await deleteListing(listingId);
            if (result.success) {
                setListings(listings.filter(listing => listing._id !== listingId));
            }
        }
    };

    const getOrderCountForListing = (listingId) => {
        return orders.filter(order => order.productId === listingId).length;
    };

    const getVendorStats = (vendorEmail) => {
        const vendorListings = listings.filter(listing => listing.email === vendorEmail);
        const vendorOrders = orders.filter(order => 
            vendorListings.some(listing => listing._id === order.productId)
        );
        return {
            totalListings: vendorListings.length,
            totalOrders: vendorOrders.length,
            totalRevenue: vendorOrders.reduce((sum, order) => sum + (parseInt(order.price) || 0), 0)
        };
    };

    const filteredListings = listings.filter(listing => {
        const matchesSearch = listing.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            listing.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            listing.location?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'all' || listing.category === categoryFilter;
        const matchesPrice = priceFilter === 'all' || 
                           (priceFilter === 'free' && listing.price === 0) ||
                           (priceFilter === 'paid' && listing.price > 0);
        return matchesSearch && matchesCategory && matchesPrice;
    });

    const getListingStats = () => {
        const totalListings = listings.length;
        const petListings = listings.filter(listing => listing.category === 'pet').length;
        const paidListings = listings.filter(listing => listing.price > 0).length;
        const freeListings = listings.filter(listing => listing.price === 0).length;
        const uniqueVendors = [...new Set(listings.map(listing => listing.email))].length;
        const totalRevenue = orders.reduce((sum, order) => sum + (parseInt(order.price) || 0), 0);
        
        return { 
            totalListings, 
            petListings, 
            paidListings, 
            freeListings, 
            uniqueVendors,
            totalRevenue,
            totalOrders: orders.length
        };
    };

    const getCategoryIcon = (category) => {
        switch (category) {
            case 'pet': return <MdPets />;
            case 'pet-food': return <MdFastfood />;
            case 'accessories': return <MdToys />;
            case 'care-products': return <MdHealthAndSafety />;
            default: return <MdCategory />;
        }
    };

    const getCategoryName = (category) => {
        switch (category) {
            case 'pet': return 'Pets';
            case 'pet-food': return 'Pet Food';
            case 'accessories': return 'Accessories';
            case 'care-products': return 'Care Products';
            default: return category;
        }
    };

    const stats = getListingStats();

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <Loading viewHeight={60} color={'#556B2F'} />
            </div>
        );
    }

    return (
        <div className="p-3 sm:p-4 lg:p-6 space-y-4 lg:space-y-6">
            <title>AdoptyCo | Manage Listings</title>
            
            {/* Header */}
            <div className="mb-4 lg:mb-8">
                <p className="text-gray-600 dark:text-gray-300 text-sm lg:text-base">
                    Manage product listings, vendors, and marketplace analytics
                </p>
            </div>

            {/* Stats Cards - Mobile: 2 columns, Desktop: 4 columns */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-4 lg:mb-6">
                <div className="bg-[#556B2F] rounded-xl lg:rounded-2xl p-3 lg:p-6 text-[#F7F3E9] shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                            <p className="text-xs lg:text-sm opacity-80 mb-1">Listings</p>
                            <p className="text-lg lg:text-3xl font-bold">{stats.totalListings}</p>
                            <p className="text-xs opacity-70 mt-1 truncate">{stats.petListings} pets</p>
                        </div>
                        <FaStore className="text-2xl lg:text-4xl opacity-70 flex-shrink-0" />
                    </div>
                </div>
                
                <div className="bg-[#6B8E23] rounded-xl lg:rounded-2xl p-3 lg:p-6 text-[#F7F3E9] shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                            <p className="text-xs lg:text-sm opacity-80 mb-1">Vendors</p>
                            <p className="text-lg lg:text-3xl font-bold">{stats.uniqueVendors}</p>
                            <p className="text-xs opacity-70 mt-1 truncate">Unique sellers</p>
                        </div>
                        <FaUser className="text-2xl lg:text-4xl opacity-70 flex-shrink-0" />
                    </div>
                </div>

                <div className="bg-[#8FBC8F] rounded-xl lg:rounded-2xl p-3 lg:p-6 text-[#F7F3E9] shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                            <p className="text-xs lg:text-sm opacity-80 mb-1">Orders</p>
                            <p className="text-lg lg:text-3xl font-bold">{stats.totalOrders}</p>
                            <p className="text-xs opacity-70 mt-1 truncate">All time</p>
                        </div>
                        <FaShoppingBag className="text-2xl lg:text-4xl opacity-70 flex-shrink-0" />
                    </div>
                </div>

                <div className="bg-[#9ACD32] rounded-xl lg:rounded-2xl p-3 lg:p-6 text-[#F7F3E9] shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                            <p className="text-xs lg:text-sm opacity-80 mb-1">Revenue</p>
                            <p className="text-base lg:text-2xl font-bold flex items-center">
                                ৳{stats.totalRevenue.toLocaleString()}
                            </p>
                            <p className="text-xs opacity-70 mt-1 truncate">{stats.freeListings} free items</p>
                        </div>
                        <TbCoinTaka className="text-2xl lg:text-4xl opacity-70 flex-shrink-0" />
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-lg border border-gray-200 dark:border-gray-600 border-opacity-30">
                <div className="flex flex-col gap-3 lg:gap-4 mb-4 lg:mb-6">
                    <div className="flex-1 relative">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search listings..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 lg:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#556B2F] focus:border-transparent text-sm lg:text-base"
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#556B2F] focus:border-transparent"
                        >
                            <option value="all">All Categories</option>
                            <option value="pet">Pets</option>
                            <option value="pet-food">Pet Food</option>
                            <option value="accessories">Accessories</option>
                            <option value="care-products">Care Products</option>
                        </select>
                        <select
                            value={priceFilter}
                            onChange={(e) => setPriceFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#556B2F] focus:border-transparent"
                        >
                            <option value="all">All Prices</option>
                            <option value="free">Free</option>
                            <option value="paid">Paid</option>
                        </select>
                    </div>
                </div>

                {/* Listings Table */}
                <div className="overflow-x-auto border border-gray-200 dark:border-gray-600 border-opacity-30 rounded-xl">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th className="text-left py-3 px-4 font-semibold text-[#556B2F] dark:text-[#F7F3E9]">Product</th>
                                <th className="text-left py-3 px-4 font-semibold text-[#556B2F] dark:text-[#F7F3E9]">Vendor</th>
                                <th className="text-left py-3 px-4 font-semibold text-[#556B2F] dark:text-[#F7F3E9]">Category</th>
                                <th className="text-left py-3 px-4 font-semibold text-[#556B2F] dark:text-[#F7F3E9]">Price</th>
                                <th className="text-left py-3 px-4 font-semibold text-[#556B2F] dark:text-[#F7F3E9]">Orders</th>
                                <th className="text-left py-3 px-4 font-semibold text-[#556B2F] dark:text-[#F7F3E9]">Date</th>
                                <th className="text-center py-3 px-4 font-semibold text-[#556B2F] dark:text-[#F7F3E9]">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredListings.map((listing) => {
                                const orderCount = getOrderCountForListing(listing._id);
                                const vendorStats = getVendorStats(listing.email);
                                
                                return (
                                    <tr key={listing._id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="py-4 px-4">
                                            <div className="w-64 flex items-center space-x-3">
                                                <img
                                                    src={listing.photoURL || 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=50&h=50&fit=crop&crop=center'}
                                                    alt="Product"
                                                    className="w-12 h-12 rounded-lg object-cover border-2 border-[#556B2F]"
                                                />
                                                <div>
                                                    <p className="font-medium text-gray-900 dark:text-gray-100">
                                                        {listing.name}
                                                    </p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        {listing.location}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div>
                                                <p className="text-gray-800 dark:text-gray-200 text-sm">
                                                    {listing.email}
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    {vendorStats.totalListings} listings • {vendorStats.totalOrders} orders
                                                </p>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="flex justify-center items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-[#556B2F] text-[#F7F3E9]">
                                                {getCategoryIcon(listing.category)}
                                                {getCategoryName(listing.category)}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center">
                                                {listing.price === 0 ? (
                                                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                                                        Free
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center font-medium text-gray-900 dark:text-gray-100">
                                                        ৳{listing.price.toLocaleString()}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className={`px-2 py-1 w-18 rounded-full text-xs font-medium flex justify-center ${
                                                orderCount > 0 
                                                    ? 'bg-blue-100 text-blue-800' 
                                                    : 'bg-gray-100 text-gray-600'
                                            }`}>
                                                {orderCount} orders
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 text-gray-600 dark:text-gray-300 text-sm">
                                            {new Date(listing.date).toLocaleDateString()}
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center justify-center space-x-2">
                                                <ReactTooltip id={`view-${listing._id}`} content="View Details" place="top">
                                                    <button
                                                        onClick={() => handleViewListing(listing)}
                                                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                                                    >
                                                        <FaEye />
                                                    </button>
                                                </ReactTooltip>
                                                
                                                <ReactTooltip id={`delete-${listing._id}`} content="Delete Listing" place="top">
                                                    <button
                                                        onClick={() => handleDeleteListing(listing._id, listing.name)}
                                                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </ReactTooltip>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    
                    {filteredListings.length === 0 && (
                        <div className="text-center py-8">
                            <p className="text-gray-500 dark:text-gray-400">No listings found matching your criteria.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Listing Details Modal */}
            <ListingModal
                listing={selectedListing}
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onDeleteListing={handleDeleteListing}
                orderCount={selectedListing ? getOrderCountForListing(selectedListing._id) : 0}
                vendorStats={selectedListing ? getVendorStats(selectedListing.email) : null}
            />
        </div>
    );
};

export default ManageListings;