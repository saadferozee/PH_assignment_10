import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Elements/Navbar';
import Footer from '../Elements/Footer';
import AuthProvider from '../Providers/AuthProvider';

const Root = () => {
    return (
        <div className=''>
                <Navbar></Navbar>
                <Outlet />
                <Footer></Footer>
        </div>
    );
};

export default Root;