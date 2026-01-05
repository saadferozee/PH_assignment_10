import React from 'react';
import { FaStore, FaUser, FaCalendarAlt, FaMapMarkerAlt, FaTag, FaShoppingBag } from 'react-icons/fa';
import { MdPets, MdFastfood, MdToys, MdHealthAndSafety, MdCategory, MdClose } from 'react-icons/md';
import { TbCoinTaka } from 'react-icons/tb';

const ListingModal = ({ listing, isOpen, onClose, onDeleteListing, orderCount, vendorStats }) => {
    if (!isOpen || !listing) return null;

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
            case 'pet': return 'Pet';
            case 'pet-food': return 'Pet Food';
            case 'accessories': return 'Accessories';
            case 'care-products': return 'Care Products';
            default: return category;
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handleDelete = () => {
        onDeleteListing(listing._id, listing.name);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                {/* Header */}
                <div className="bg-gradient-to-r from-[#556B2F] to-[#6B8E23] p-6 rounded-t-2xl">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <img
                                src={listing.photoURL || 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=80&h=80&fit=crop&crop=center'}
                                alt="Product"
                                className="w-20 h-20 rounded-xl object-cover border-4 border-[#F7F3E9] shadow-lg"
                            />
                            <div>
                                <h2 className="text-2xl font-bold text-[#F7F3E9]">
                                    {listing.name}
                                </h2>
                                <p className="text-[#F7F3E9] opacity-90 flex items-center gap-1">
                                    <FaMapMarkerAlt className="text-sm" />
                                    {listing.location}
                                </p>
                                <div className="flex items-center mt-2 gap-3">
                                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#F7F3E9] text-[#556B2F] rounded-full text-sm font-medium">
                                        {getCategoryIcon(listing.category)}
                                        {getCategoryName(listing.category)}
                                    </span>
                                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#F7F3E9] bg-opacity-20 text-[#F7F3E9] rounded-full text-sm font-medium">
                                        <FaShoppingBag />
                                        {orderCount} orders
                                    </span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-[#F7F3E9] hover:text-white transition-colors p-2 hover:bg-white hover:bg-opacity-20 rounded-full"
                        >
                            <MdClose size={24} />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Product Details Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Product Information */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                                <h3 className="text-xl font-semibold text-[#556B2F] dark:text-[#F7F3E9] mb-4 flex items-center gap-2">
                                    <FaStore />
                                    Product Information
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Product Name</p>
                                        <p className="text-gray-800 dark:text-gray-200 font-medium">{listing.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Category</p>
                                        <div className="flex items-center gap-2">
                                            {getCategoryIcon(listing.category)}
                                            <span className="text-gray-800 dark:text-gray-200">{getCategoryName(listing.category)}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Price</p>
                                        <p className="text-gray-800 dark:text-gray-200 font-bold text-lg flex items-center gap-1">
                                            {listing.price === 0 ? (
                                                <span className="text-green-600">Free</span>
                                            ) : (
                                                <>
                                                    <TbCoinTaka />
                                                    {listing.price.toLocaleString()}
                                                </>
                                            )}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Location</p>
                                        <p className="text-gray-800 dark:text-gray-200 flex items-center gap-1">
                                            <FaMapMarkerAlt className="text-sm text-gray-500" />
                                            {listing.location}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Listed Date</p>
                                        <p className="text-gray-800 dark:text-gray-200 flex items-center gap-1">
                                            <FaCalendarAlt className="text-sm text-gray-500" />
                                            {formatDate(listing.date)}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Product ID</p>
                                        <p className="text-gray-800 dark:text-gray-200 font-mono text-xs break-all">
                                            {listing._id}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                                <h3 className="text-xl font-semibold text-[#556B2F] dark:text-[#F7F3E9] mb-4">
                                    Description
                                </h3>
                                <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                                    {listing.description || 'No description provided for this product.'}
                                </p>
                            </div>

                            {/* Product Image */}
                            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                                <h3 className="text-xl font-semibold text-[#556B2F] dark:text-[#F7F3E9] mb-4">
                                    Product Image
                                </h3>
                                <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4">
                                    <img
                                        src={listing.photoURL || 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=300&h=200&fit=crop&crop=center'}
                                        alt="Full Product"
                                        className="w-full md:w-64 h-48 rounded-xl object-cover border-4 border-[#556B2F] shadow-lg"
                                    />
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Image URL:</p>
                                        <p className="text-xs text-gray-600 dark:text-gray-300 break-all bg-gray-100 dark:bg-gray-600 p-3 rounded-lg">
                                            {listing.photoURL || 'No image URL provided'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Vendor & Performance Stats */}
                        <div className="space-y-6">
                            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                                <h3 className="text-xl font-semibold text-[#556B2F] dark:text-[#F7F3E9] mb-4 flex items-center gap-2">
                                    <FaUser />
                                    Vendor Information
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Vendor Email</p>
                                        <p className="text-gray-800 dark:text-gray-200 break-all">{listing.email}</p>
                                    </div>
                                    <div className="pt-2 border-t border-gray-200 dark:border-gray-600">
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Vendor Statistics</p>
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-600 dark:text-gray-300">Total Listings</span>
                                                <span className="font-semibold text-[#556B2F] dark:text-[#F7F3E9]">
                                                    {vendorStats?.totalListings || 0}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-600 dark:text-gray-300">Total Orders</span>
                                                <span className="font-semibold text-[#556B2F] dark:text-[#F7F3E9]">
                                                    {vendorStats?.totalOrders || 0}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-600 dark:text-gray-300">Total Revenue</span>
                                                <span className="font-semibold text-[#556B2F] dark:text-[#F7F3E9] flex items-center gap-1">
                                                    <TbCoinTaka />
                                                    {(vendorStats?.totalRevenue || 0).toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                                <h3 className="text-xl font-semibold text-[#556B2F] dark:text-[#F7F3E9] mb-4 flex items-center gap-2">
                                    <FaShoppingBag />
                                    Product Performance
                                </h3>
                                <div className="space-y-4">
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-[#556B2F] dark:text-[#F7F3E9] mb-1">
                                            {orderCount}
                                        </div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Total Orders</p>
                                    </div>
                                    
                                    {(parseInt(listing.price) || 0) > 0 && (
                                        <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-600">
                                            <div className="text-2xl font-bold text-[#556B2F] dark:text-[#F7F3E9] mb-1 flex items-center justify-center gap-1">
                                                <TbCoinTaka />
                                                {((parseInt(listing.price) || 0) * orderCount).toLocaleString()}
                                            </div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Revenue Generated</p>
                                        </div>
                                    )}

                                    <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
                                        <div className={`text-center p-3 rounded-lg ${
                                            orderCount > 0 
                                                ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                                                : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                                        }`}>
                                            <p className="text-sm font-medium">
                                                {orderCount > 0 
                                                    ? `Popular item with ${orderCount} orders` 
                                                    : 'No orders yet - needs promotion'
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="border-t border-gray-200 dark:border-gray-600 pt-6">
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={handleDelete}
                                className="flex-1 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                            >
                                <FaStore />
                                Delete Listing
                            </button>
                            <button
                                onClick={onClose}
                                className="flex-1 px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListingModal;