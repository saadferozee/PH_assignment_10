import React, { useState, useContext, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { FaShoppingBag, FaUserCog, FaStar, FaArrowLeft } from "react-icons/fa";
import { MdOutlineExitToApp, MdSpaceDashboard } from "react-icons/md";
import { FaCloudMoon, FaCloudSun, FaShop } from 'react-icons/fa6';
import AuthContext from '../Contexts/AuthContext';

const DashboardNavigation = ({ children }) => {
    const { user, logOut } = useContext(AuthContext);
    const [darkTheme, setDarkTheme] = useState(false);
    const location = useLocation();

    const date = new Date();
    const dateFull = date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const getPageTitle = () => {
        const path = location.pathname;
        switch (path) {
            case '/dashboard/stats':
                return 'Dashboard Overview';
            case '/dashboard/manage-users':
                return 'Manage Users';
            case '/dashboard/manage-listings':
                return 'Manage Listings';
            case '/dashboard/manage-orders':
                return 'Manage Orders';
            default:
                return 'Admin Dashboard';
        }
    };

    useEffect(() => {
        const html = document.documentElement;
        if (darkTheme) html.setAttribute("data-theme", "dark");
        else html.setAttribute("data-theme", "light");
    }, [darkTheme]);

    return (
        <div className="flex h-screen p-5 gap-5">

            {/* Aside - sticky/fixed */}
            <aside className='sticky top-5 rounded-3xl px-4 py-6 h-[calc(100vh-40px)] w-20 box-border bg-[#556B2F] text-[#F7F3E9] flex flex-col justify-between'>
                <div>
                    {/* Back to Home Button */}
                    <div className="mb-6">
                        <Link to="/" className="flex justify-center items-center">
                            <FaArrowLeft className='text-[44px] cursor-pointer border-2 border-transparent hover:border-[#F7F3E9] rounded-lg p-2 transition-all' title="Back to Homepage" />
                        </Link>
                    </div>
                    
                    <ul className='space-y-6'>
                        <li>
                            <NavLink to={'/dashboard/stats'} className="flex justify-center items-center">
                                <MdSpaceDashboard className='text-[44px] cursor-pointer border-2 border-transparent hover:border-[#F7F3E9] rounded-lg p-1 transition-all' />
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/dashboard/manage-users'} className="flex justify-center items-center">
                                <FaUserCog className='text-[44px] cursor-pointer border-2 border-transparent hover:border-[#F7F3E9] rounded-lg p-1 transition-all' />
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/dashboard/manage-listings'} className="flex justify-center items-center">
                                <FaShop className='text-[44px] cursor-pointer border-2 border-transparent hover:border-[#F7F3E9] rounded-lg p-1 transition-all' />
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/dashboard/manage-orders'} className="flex justify-center items-center">
                                <FaShoppingBag className='text-[44px] cursor-pointer border-2 border-transparent hover:border-[#F7F3E9] rounded-lg p-1 transition-all' />
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className='flex justify-center'>
                    <button onClick={() => logOut()} className="hover:bg-[#6B8E23] rounded-lg p-2 transition-all">
                        <MdOutlineExitToApp className='text-[44px] cursor-pointer rotate-180' />
                    </button>
                </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Navbar */}
                <nav className='p-3 flex justify-between items-start'>
                    <div className={`flex flex-col ${darkTheme ? 'text-[#F7F3E9]' : 'text-[#556B2F]'}`}>
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-medium opacity-60 uppercase tracking-wider">
                                Admin Dashboard
                            </span>
                            <span className="w-1 h-1 bg-current opacity-40 rounded-full"></span>
                            <span className="text-xs opacity-60">{dateFull}</span>
                        </div>
                        <h1 className='ml-0 font-bold text-3xl mt-1 bg-gradient-to-r from-[#556B2F] to-[#6B8E23] bg-clip-text text-transparent'>
                            {getPageTitle()}
                        </h1>
                    </div>
                    <div className='flex items-center gap-4'>
                        <button
                            className={`${darkTheme ? 'text-[#F7F3E9]' : 'text-[#556B2F]'} text-xl md:text-4xl cursor-pointer hover:scale-110 transition-transform`}
                            title='Click to change theme.'
                            onClick={() => setDarkTheme(!darkTheme)}
                        >
                            {darkTheme ? <FaCloudMoon /> : <FaCloudSun />}
                        </button>
                        
                        {/* Review Button */}
                        <button
                            className={`${darkTheme ? 'text-[#F7F3E9] hover:bg-gray-700' : 'text-[#556B2F] hover:bg-gray-100'} p-2 rounded-lg transition-all flex items-center gap-2`}
                            title='View Reviews'
                        >
                            <FaStar className="text-xl md:text-2xl" />
                            <span className="hidden md:inline text-sm font-medium">Reviews</span>
                        </button>
                        
                        <div className="dropdown">
                            <div tabIndex={0} role="button">
                                {user.photoURL ? (
                                    <img
                                        title={`click to go Profile of User: ${user.displayName}`}
                                        className={`w-8 h-8 md:w-12 md:h-12 object-cover border-2 ${darkTheme ? 'border-[#F7F3E9]' : 'border-[#556B2F]'} p-0.5 rounded-full hover:scale-105 transition-transform cursor-pointer`}
                                        src={user.photoURL}
                                        alt="DP"
                                    />
                                ) : (
                                    <img
                                        title={`click to go Profile of User: ${user.displayName}`}
                                        width={40}
                                        className='rounded-full hover:scale-105 transition-transform cursor-pointer'
                                        src='https://img.icons8.com/ink/96/f7f3e9/user-male-circle.png'
                                        alt="DP"
                                    />
                                )}
                            </div>
                            <ul tabIndex={-1} className="menu dropdown-content right-1 bg-[#556B2F40] rounded z-10 mt-3 w-fit p-2 shadow space-y-1.5">
                                <button className="px-4 pt-0.5 pb-0.75 rounded-full bg-[#F7F3E9] text-[#556B2F] hover:bg-gray-100 transition-colors">
                                    <a href="/my-profile">Profile</a>
                                </button>
                            </ul>
                        </div>
                    </div>
                </nav>

                {/* Scrollable children */}
                <div className="flex-1 overflow-auto mt-3">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default DashboardNavigation;
