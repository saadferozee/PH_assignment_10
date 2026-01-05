import { useContext, useState, useEffect } from 'react';
import AuthContext from '../Contexts/AuthContext';
import { FaUser, FaEnvelope, FaEdit, FaSave, FaTimes, FaCamera, FaCalendarAlt, FaShieldAlt, FaHeart, FaShoppingBag, FaStore } from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';

const MyProfile = () => {
    const { user, updateUser, role } = useContext(AuthContext);
    const [formOpen, setFormOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        photoURL: ''
    });
    const [stats] = useState({
        listings: 12,
        orders: 8,
        favorites: 24
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.displayName || '',
                photoURL: user.photoURL || ''
            });
            setImagePreview(user.photoURL || '');
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        if (name === 'photoURL') {
            setImagePreview(value);
        }
    };

    const handleUpdateProfileForm = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            await updateUser(formData.name, formData.photoURL);
            setFormOpen(false);
            // Show success message (you can add a toast notification here)
        } catch (error) {
            console.error('Error updating profile:', error);
            // Show error message (you can add a toast notification here)
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setFormOpen(false);
        setFormData({
            name: user.displayName || '',
            photoURL: user.photoURL || ''
        });
        setImagePreview(user.photoURL || '');
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Not available';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getRoleBadge = (userRole) => {
        const roleConfig = {
            admin: { color: 'bg-red-500', text: 'Admin', icon: FaShieldAlt },
            user: { color: 'bg-blue-500', text: 'User', icon: FaUser }
        };
        
        const config = roleConfig[userRole] || roleConfig.user;
        const IconComponent = config.icon;
        
        return (
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-white text-sm font-medium ${config.color}`}>
                <IconComponent className="text-xs" />
                {config.text}
            </div>
        );
    };

    if (!user) {
        return (
            <div className='min-h-screen flex items-center justify-center bg-linear-to-br from-[#F7F3E9] to-[#E8E0D0]'>
                <div className='text-center p-8 bg-white rounded-2xl shadow-xl'>
                    <FaUser className='text-6xl text-[#556B2F] mx-auto mb-4 opacity-50' />
                    <h1 className='text-2xl font-bold text-[#556B2F] mb-2'>Not Logged In</h1>
                    <p className='text-gray-600'>Please log in to view your profile.</p>
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-linear-to-br from-[#F7F3E9] to-[#E8E0D0] py-8 px-4'>
            <div className='max-w-4xl mx-auto'>
                {/* Header */}
                <div className='text-center mb-8'>
                    <h1 className='text-4xl font-bold text-[#556B2F] mb-2'>My Profile</h1>
                    <p className='text-gray-600'>Manage your account information and preferences</p>
                </div>

                {/* Main Profile Card */}
                <div className='bg-white rounded-3xl shadow-2xl overflow-hidden mb-8'>
                    {/* Cover Section */}
                    <div className='h-32 bg-linear-to-r from-[#556B2F] to-[#6B8E23] relative'>
                        <div className='absolute inset-0 bg-black bg-opacity-20'></div>
                        <div className='absolute bottom-4 right-4'>
                            {getRoleBadge(role)}
                        </div>
                    </div>

                    {/* Profile Content */}
                    <div className='relative px-8 pb-8'>
                        {/* Profile Picture */}
                        <div className='flex justify-center -mt-16 mb-6'>
                            <div className='relative group'>
                                <div className='w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gray-100'>
                                    {(imagePreview || user.photoURL) ? (
                                        <img 
                                            className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-110' 
                                            src={imagePreview || user.photoURL} 
                                            alt="Profile"
                                            onError={(e) => {
                                                e.target.src = 'https://img.icons8.com/ink/96/f7f3e9/user-male-circle.png';
                                            }}
                                        />
                                    ) : (
                                        <div className='w-full h-full flex items-center justify-center'>
                                            <FaUser className='text-4xl text-gray-400' />
                                        </div>
                                    )}
                                </div>
                                {formOpen && (
                                    <div className='absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                                        <FaCamera className='text-white text-xl' />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Profile Info or Edit Form */}
                        {formOpen ? (
                            <form onSubmit={handleUpdateProfileForm} className='space-y-6'>
                                <div className='grid md:grid-cols-2 gap-6'>
                                    <div className='space-y-2'>
                                        <label className='block text-sm font-medium text-gray-700'>
                                            <FaUser className='inline mr-2' />
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#556B2F] focus:border-transparent transition-all duration-300'
                                            placeholder="Enter your full name"
                                            required
                                        />
                                    </div>
                                    <div className='space-y-2'>
                                        <label className='block text-sm font-medium text-gray-700'>
                                            <FaCamera className='inline mr-2' />
                                            Profile Photo URL
                                        </label>
                                        <input
                                            type="url"
                                            name="photoURL"
                                            value={formData.photoURL}
                                            onChange={handleInputChange}
                                            className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#556B2F] focus:border-transparent transition-all duration-300'
                                            placeholder="Enter photo URL"
                                        />
                                    </div>
                                </div>

                                <div className='flex gap-4 justify-center pt-4'>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className='flex items-center gap-2 px-6 py-3 bg-[#556B2F] text-white rounded-xl hover:bg-[#6B8E23] transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed'
                                    >
                                        <FaSave />
                                        {loading ? 'Updating...' : 'Save Changes'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className='flex items-center gap-2 px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-all duration-300 transform hover:scale-105'
                                    >
                                        <FaTimes />
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className='text-center space-y-6'>
                                {/* User Info */}
                                <div className='space-y-4'>
                                    <div className='flex items-center justify-center gap-2'>
                                        <h2 className='text-3xl font-bold text-[#556B2F]'>{user.displayName || 'Anonymous User'}</h2>
                                        {user.emailVerified && (
                                            <MdVerified className='text-blue-500 text-xl' title='Verified Account' />
                                        )}
                                    </div>
                                    
                                    <div className='flex items-center justify-center gap-2 text-gray-600'>
                                        <FaEnvelope />
                                        <span className='font-mono'>{user.email}</span>
                                    </div>

                                    <div className='flex items-center justify-center gap-2 text-gray-500 text-sm'>
                                        <FaCalendarAlt />
                                        <span>Member since {formatDate(user.metadata?.creationTime)}</span>
                                    </div>
                                </div>

                                {/* Action Button */}
                                <button
                                    onClick={() => setFormOpen(true)}
                                    className='inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-[#556B2F] to-[#6B8E23] text-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105'
                                >
                                    <FaEdit />
                                    Edit Profile
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Stats Cards */}
                <div className='grid md:grid-cols-3 gap-6 mb-8'>
                    <div className='bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105'>
                        <div className='flex items-center gap-4'>
                            <div className='p-3 bg-blue-100 rounded-full'>
                                <FaStore className='text-2xl text-blue-600' />
                            </div>
                            <div>
                                <h3 className='text-2xl font-bold text-gray-800'>{stats.listings}</h3>
                                <p className='text-gray-600'>My Listings</p>
                            </div>
                        </div>
                    </div>

                    <div className='bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105'>
                        <div className='flex items-center gap-4'>
                            <div className='p-3 bg-green-100 rounded-full'>
                                <FaShoppingBag className='text-2xl text-green-600' />
                            </div>
                            <div>
                                <h3 className='text-2xl font-bold text-gray-800'>{stats.orders}</h3>
                                <p className='text-gray-600'>Orders</p>
                            </div>
                        </div>
                    </div>

                    <div className='bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105'>
                        <div className='flex items-center gap-4'>
                            <div className='p-3 bg-red-100 rounded-full'>
                                <FaHeart className='text-2xl text-red-600' />
                            </div>
                            <div>
                                <h3 className='text-2xl font-bold text-gray-800'>{stats.favorites}</h3>
                                <p className='text-gray-600'>Favorites</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Account Security */}
                <div className='bg-white rounded-2xl p-6 shadow-lg'>
                    <h3 className='text-xl font-bold text-[#556B2F] mb-4 flex items-center gap-2'>
                        <FaShieldAlt />
                        Account Security
                    </h3>
                    <div className='space-y-3'>
                        <div className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'>
                            <span className='text-gray-700'>Email Verification</span>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                user.emailVerified 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-yellow-100 text-yellow-800'
                            }`}>
                                {user.emailVerified ? 'Verified' : 'Pending'}
                            </span>
                        </div>
                        <div className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'>
                            <span className='text-gray-700'>Last Sign In</span>
                            <span className='text-gray-600 text-sm'>
                                {formatDate(user.metadata?.lastSignInTime)}
                            </span>
                        </div>
                        <div className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'>
                            <span className='text-gray-700'>Account Type</span>
                            {getRoleBadge(role)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;