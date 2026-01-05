import { useState, useCallback } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const useUserManagement = () => {
    const [loading, setLoading] = useState(false);

    const updateUserRole = useCallback(async (userId, newRole) => {
        try {
            setLoading(true);
            const response = await axios.put(`https://adoptyco.vercel.app/users/role/${userId}`, {
                role: newRole
            });
            
            if (response.status === 200) {
                await Swal.fire({
                    title: 'Success!',
                    text: `User role changed to ${newRole}`,
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                });
                return { success: true, data: response.data };
            }
        } catch (error) {
            console.error('Error updating user role:', error);
            await Swal.fire({
                title: 'Error!',
                text: 'Failed to update user role',
                icon: 'error'
            });
            return { success: false, error };
        } finally {
            setLoading(false);
        }
    }, []);

    const deleteUser = useCallback(async (userId) => {
        try {
            setLoading(true);
            const response = await axios.delete(`https://adoptyco.vercel.app/users/${userId}`);
            
            if (response.status === 200) {
                await Swal.fire({
                    title: 'Deleted!',
                    text: 'User has been deleted successfully',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                });
                return { success: true, data: response.data };
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            await Swal.fire({
                title: 'Error!',
                text: 'Failed to delete user',
                icon: 'error'
            });
            return { success: false, error };
        } finally {
            setLoading(false);
        }
    }, []);

    const confirmRoleChange = useCallback(async (userEmail, currentRole, newRole) => {
        const result = await Swal.fire({
            title: 'Change User Role?',
            html: `
                <div class="text-left">
                    <p><strong>User:</strong> ${userEmail}</p>
                    <p><strong>Current Role:</strong> ${currentRole}</p>
                    <p><strong>New Role:</strong> ${newRole}</p>
                </div>
            `,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#556B2F',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, change it!',
            cancelButtonText: 'Cancel'
        });

        return result.isConfirmed;
    }, []);

    const confirmUserDeletion = useCallback(async (userEmail) => {
        const result = await Swal.fire({
            title: 'Delete User?',
            html: `
                <div class="text-left">
                    <p>Are you sure you want to delete:</p>
                    <p><strong>${userEmail}</strong></p>
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

    return {
        loading,
        updateUserRole,
        deleteUser,
        confirmRoleChange,
        confirmUserDeletion
    };
};

export default useUserManagement;