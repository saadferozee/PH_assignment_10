import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Elements/Navbar';
import Footer from '../Elements/Footer';
import AuthProvider from '../Providers/AuthProvider';
import usePageTracking from '../Hooks/usePageTracking';

const Root = () => {
    // Track page views automatically
    usePageTracking();

    return (
        <div className=''>
                <Navbar></Navbar>
                <Outlet />
                <Footer></Footer>
        </div>
    );
};

export default Root;