import React from 'react';
import { Outlet } from 'react-router';
import DashboardNavigation from '../Elements/DashboardNavigation';
import AuthProvider from '../Providers/AuthProvider';

const DashboardLayout = () => {
    return (
        <div className='h-screen'>
            <DashboardNavigation>
                <Outlet></Outlet>
            </DashboardNavigation>
        </div>
    );
};

export default DashboardLayout;