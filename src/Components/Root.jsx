import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Elements/Navbar';
import Footer from '../Elements/Footer';
import AuthProvider from '../Providers/AuthProvider';

const Root = () => {
    return (
        <div className=''>
            <AuthProvider>
                <Navbar></Navbar>
                <Outlet />
                <Footer></Footer>
            </AuthProvider>
        </div>
    );
};

export default Root;