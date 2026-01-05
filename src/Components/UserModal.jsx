import React from 'react';
import { FaUserShield, FaCalendarAlt, FaEnvelope, FaUser, FaIdCard } from 'react-icons/fa';
import { MdPerson, MdAdminPanelSettings, MdClose } from 'react-icons/md';

const UserModal = ({ user, isOpen, onClose, onRoleChange, onDeleteUser }) => {
    if (!isOpen || !user) return null;

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleRoleToggle = () => {
        const newRole = user.role === 'admin' ? 'user' : 'admin';
        onRoleChange(user._id, newRole);
    };

    const handleDelete = () => {
        onDeleteUser(user._id, user.email);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                {/* Header */}
                <div className="bg-gradient-to-r from-[#556B2F] to-[#6B8E23] p-6 rounded-t-2xl">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <img
                                src={user.photoURL || 'https://img.icons8.com/ink/96/F7F3E9/user-male-circle.png'}
                                alt="User Avatar"
                                className="w-16 h-16 rounded-full object-cover border-4 border-[#F7F3E9] shadow-lg"
                            />
                            <div>
                                <h2 className="text-2xl font-bold text-[#F7F3E9]">
                                    {user.name || 'No Name Provided'}
                                </h2>
                                <p className="text-[#F7F3E9] opacity-90">{user.email}</p>
                                <div className="flex items-center mt-2">
                                    {user.role === 'admin' ? (
                                        <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#F7F3E9] text-[#556B2F] rounded-full text-sm font-medium">
                                            <MdAdminPanelSettings />
                                            Administrator
                                        </span>
                                    ) : (
                                            <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#F7F3E9] bg-opacity-20 text-[#556B2F] rounded-full text-sm font-medium">
                                            <MdPerson />
                                            Regular User
                                        </span>
                                    )}
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
                    {/* Account Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                            <h3 className="text-lg font-semibold text-[#556B2F] dark:text-[#F7F3E9] mb-4 flex items-center gap-2">
                                <FaUser className="text-[#556B2F] dark:text-[#F7F3E9]" />
                                Account Information
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <FaIdCard className="text-gray-500 w-4" />
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">User ID</p>
                                        <p className="font-mono text-sm text-gray-800 dark:text-gray-200 break-all">
                                            {user._id}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FaEnvelope className="text-gray-500 w-4" />
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Email Address</p>
                                        <p className="text-gray-800 dark:text-gray-200">{user.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FaUser className="text-gray-500 w-4" />
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Display Name</p>
                                        <p className="text-gray-800 dark:text-gray-200">
                                            {user.name || 'Not provided'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FaUserShield className="text-gray-500 w-4" />
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Account Role</p>
                                        <p className="text-gray-800 dark:text-gray-200 capitalize">
                                            {user.role || 'user'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                            <h3 className="text-lg font-semibold text-[#556B2F] dark:text-[#F7F3E9] mb-4 flex items-center gap-2">
                                <FaCalendarAlt className="text-[#556B2F] dark:text-[#F7F3E9]" />
                                Activity Timeline
                            </h3>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Account Created</p>
                                    <p className="text-gray-800 dark:text-gray-200">
                                        {formatDate(user.createdAt)}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Registration Date</p>
                                    <p className="text-gray-800 dark:text-gray-200">
                                        {formatDate(user.registrationDate)}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Last Updated</p>
                                    <p className="text-gray-800 dark:text-gray-200">
                                        {formatDate(user.updatedAt)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Profile Picture Section */}
                    {user.photoURL && (
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                            <h3 className="text-lg font-semibold text-[#556B2F] dark:text-[#F7F3E9] mb-4">
                                Profile Picture
                            </h3>
                            <div className="flex items-center space-x-4">
                                <img
                                    src={user.photoURL}
                                    alt="Full Profile"
                                    className="w-24 h-24 rounded-xl object-cover border-4 border-[#556B2F] shadow-lg"
                                />
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Profile Image URL:</p>
                                    <p className="text-xs text-gray-600 dark:text-gray-300 break-all bg-gray-100 dark:bg-gray-600 p-2 rounded">
                                        {user.photoURL}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="border-t border-gray-200 dark:border-gray-600 pt-6">
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={handleRoleToggle}
                                className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                                    user.role === 'admin'
                                        ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl'
                                        : 'bg-[#556B2F] hover:bg-[#6B8E23] text-[#F7F3E9] shadow-lg hover:shadow-xl'
                                }`}
                            >
                                {user.role === 'admin' ? (
                                    <>
                                        <MdPerson />
                                        Remove Admin Role
                                    </>
                                ) : (
                                    <>
                                        <MdAdminPanelSettings />
                                        Grant Admin Role
                                    </>
                                )}
                            </button>
                            <button
                                onClick={handleDelete}
                                className="flex-1 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                            >
                                <FaUser />
                                Delete User
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

export default UserModal;