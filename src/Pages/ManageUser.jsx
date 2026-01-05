import React, { useState, useEffect } from 'react';
import { FaUsers, FaUserShield, FaEye, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import { MdAdminPanelSettings, MdPerson } from 'react-icons/md';
import axios from 'axios';
import Swal from 'sweetalert2';
import Loading from './Loading';
import ReactTooltip from '../Elements/ReactTooltip';
import UserModal from '../Components/UserModal';
import useUserManagement from '../Hooks/useUserManagement';

const ManageUser = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    
    const { 
        loading: actionLoading, 
        updateUserRole, 
        deleteUser, 
        confirmRoleChange, 
        confirmUserDeletion 
    } = useUserManagement();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await axios.get('https://adoptyco.vercel.app/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to fetch users',
                icon: 'error'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleRoleChange = async (userId, newRole) => {
        try {
            const result = await Swal.fire({
                title: 'Change User Role?',
                text: `Are you sure you want to change this user's role to ${newRole}?`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#556B2F',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, change it!'
            });

            if (result.isConfirmed) {
                const response = await axios.put(`https://adoptyco.vercel.app/users/role/${userId}`, {
                    role: newRole
                });

                if (response.status === 200) {
                    // Update local state
                    setUsers(users.map(user => 
                        user._id === userId ? { ...user, role: newRole } : user
                    ));

                    Swal.fire({
                        title: 'Success!',
                        text: `User role changed to ${newRole}`,
                        icon: 'success'
                    });
                }
            }
        } catch (error) {
            console.error('Error changing user role:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to change user role',
                icon: 'error'
            });
        }
    };

    const handleViewUser = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const handleDeleteUser = async (userId, userEmail) => {
        try {
            const result = await Swal.fire({
                title: 'Delete User?',
                text: `Are you sure you want to delete ${userEmail}? This action cannot be undone!`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#556B2F',
                confirmButtonText: 'Yes, delete it!'
            });

            if (result.isConfirmed) {
                const response = await axios.delete(`https://adoptyco.vercel.app/users/${userId}`);

                if (response.status === 200) {
                    setUsers(users.filter(user => user._id !== userId));
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'User has been deleted.',
                        icon: 'success'
                    });
                }
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to delete user',
                icon: 'error'
            });
        }
    };

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            user.displayName?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = roleFilter === 'all' || user.role === roleFilter;
        return matchesSearch && matchesRole;
    });

    const getUserStats = () => {
        const totalUsers = users.length;
        const adminUsers = users.filter(user => user.role === 'admin').length;
        const regularUsers = users.filter(user => user.role !== 'admin').length;
        return { totalUsers, adminUsers, regularUsers };
    };

    const stats = getUserStats();

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <Loading viewHeight={60} color={'#556B2F'} />
            </div>
        );
    }

    return (
        <div className="p-3 sm:p-4 lg:p-6 space-y-4 lg:space-y-6">
            <title>AdoptyCo | Manage Users</title>
            
            {/* Header */}
            <div className="mb-4 lg:mb-8">
                <p className="text-gray-600 dark:text-gray-300 text-sm lg:text-base">
                    Manage user accounts, roles, and permissions
                </p>
            </div>

            {/* Stats Cards - Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-6 mb-4 lg:mb-6">
                <div className="bg-[#556B2F] rounded-xl lg:rounded-2xl p-4 lg:p-6 text-[#F7F3E9] shadow-lg">
                    <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                            <p className="text-xs lg:text-sm opacity-80 mb-1">Users</p>
                            <p className="text-xl lg:text-3xl font-bold">{stats.totalUsers}</p>
                        </div>
                        <FaUsers className="text-3xl lg:text-4xl opacity-70 flex-shrink-0" />
                    </div>
                </div>
                <div className="bg-[#6B8E23] rounded-xl lg:rounded-2xl p-4 lg:p-6 text-[#F7F3E9] shadow-lg">
                    <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                            <p className="text-xs lg:text-sm opacity-80 mb-1">Admins</p>
                            <p className="text-xl lg:text-3xl font-bold">{stats.adminUsers}</p>
                        </div>
                        <MdAdminPanelSettings className="text-3xl lg:text-4xl opacity-70 flex-shrink-0" />
                    </div>
                </div>
                <div className="bg-[#8FBC8F] rounded-xl lg:rounded-2xl p-4 lg:p-6 text-[#F7F3E9] shadow-lg">
                    <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                            <p className="text-xs lg:text-sm opacity-80 mb-1">Regular</p>
                            <p className="text-xl lg:text-3xl font-bold">{stats.regularUsers}</p>
                        </div>
                        <MdPerson className="text-3xl lg:text-4xl opacity-70 flex-shrink-0" />
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-lg border border-gray-200 dark:border-gray-600 border-opacity-30">
                <div className="flex flex-col gap-3 lg:gap-4 mb-4 lg:mb-6">
                    <div className="flex-1 relative">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#556B2F] focus:border-transparent"
                        />
                    </div>
                    <div>
                        <select
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#556B2F] focus:border-transparent"
                        >
                            <option value="all">All Roles</option>
                            <option value="admin">Admin</option>
                            <option value="user">Regular User</option>
                        </select>
                    </div>
                </div>

                {/* Users Table */}
                <div className="overflow-x-auto border border-gray-200 dark:border-gray-600 border-opacity-30 rounded-xl">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th className="text-left py-3 px-4 font-semibold text-[#556B2F] dark:text-[#F7F3E9]">User</th>
                                <th className="text-left py-3 px-4 font-semibold text-[#556B2F] dark:text-[#F7F3E9]">Email</th>
                                <th className="text-left py-3 px-4 font-semibold text-[#556B2F] dark:text-[#F7F3E9]">Role</th>
                                <th className="text-left py-3 px-4 font-semibold text-[#556B2F] dark:text-[#F7F3E9]">Joined</th>
                                <th className="text-center py-3 px-4 font-semibold text-[#556B2F] dark:text-[#F7F3E9]">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user) => (
                                <tr key={user._id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <td className="py-4 px-4">
                                        <div className="flex items-center space-x-3">
                                            <img
                                                src={user.photoURL || 'https://img.icons8.com/ink/96/556B2F/user-male-circle.png'}
                                                alt="User Avatar"
                                                className="w-10 h-10 rounded-full object-cover border-2 border-[#556B2F]"
                                            />
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-gray-100">
                                                    {user.name || 'No Name'}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4 text-gray-600 dark:text-gray-300">
                                        {user.email}
                                    </td>
                                    <td className="py-4 px-4">
                                        <p className={`text-xs font-medium`}>
                                            {user.role === 'admin' ? (
                                                <span className="flex items-center gap-1">
                                                    <FaUserShield className="text-xs" />
                                                    Admin
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1">
                                                    <MdPerson className="text-xs" />
                                                    User
                                                </span>
                                            )}
                                        </p>
                                    </td>
                                    <td className="py-4 px-4 text-gray-600 dark:text-gray-300">
                                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                                    </td>
                                    <td className="py-4 px-4">
                                        <div className="flex items-center justify-center space-x-2">
                                            <ReactTooltip id={`view-${user._id}`} content="View Details" place="top">
                                                <button
                                                    onClick={() => handleViewUser(user)}
                                                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                                                >
                                                    <FaEye />
                                                </button>
                                            </ReactTooltip>
                                            
                                            <ReactTooltip id={`role-${user._id}`} content={user.role === 'admin' ? 'Remove Admin' : 'Make Admin'} place="top">
                                                <button
                                                    onClick={() => handleRoleChange(user._id, user.role === 'admin' ? 'user' : 'admin')}
                                                    className={`p-2 rounded-lg transition-colors ${
                                                        user.role === 'admin'
                                                            ? 'text-orange-600 hover:bg-orange-100'
                                                            : 'text-green-600 hover:bg-green-100'
                                                    }`}
                                                >
                                                    <FaEdit />
                                                </button>
                                            </ReactTooltip>
                                            
                                            <ReactTooltip id={`delete-${user._id}`} content="Delete User" place="top">
                                                <button
                                                    onClick={() => handleDeleteUser(user._id, user.email)}
                                                    className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </ReactTooltip>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    {filteredUsers.length === 0 && (
                        <div className="text-center py-8">
                            <p className="text-gray-500 dark:text-gray-400">No users found matching your criteria.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* User Details Modal */}
            <UserModal
                user={selectedUser}
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onRoleChange={handleRoleChange}
                onDeleteUser={handleDeleteUser}
            />
        </div>
    );
};

export default ManageUser;