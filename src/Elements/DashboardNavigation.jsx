import React, { useState, useContext, useEffect } from 'react';
import { Link, NavLink } from 'react-router';
import { FaShoppingBag, FaUserCog } from "react-icons/fa";
import { MdOutlineExitToApp, MdSpaceDashboard } from "react-icons/md";
import { FaCloudMoon, FaCloudSun, FaShop } from 'react-icons/fa6';
import AuthContext from '../Contexts/AuthContext';

const DashboardNavigation = ({ children }) => {
    const { user, logOut } = useContext(AuthContext);
    const [darkTheme, setDarkTheme] = useState(false);

    const date = new Date();
    const dateFull = date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    useEffect(() => {
        const html = document.documentElement;
        if (darkTheme) html.setAttribute("data-theme", "dark");
        else html.setAttribute("data-theme", "light");
    }, [darkTheme]);

    return (
        <div className="flex h-screen p-5 gap-5">

            {/* Aside - sticky/fixed */}
            <aside className='sticky top-5 rounded-3xl px-4 py-6 h-[calc(100vh-40px)] box-border bg-[#556B2F] text-[#F7F3E9] flex flex-col justify-between'>
                <div>
                    <ul className='space-y-6'>
                        <li>
                            <NavLink to={'/dashboard/stats'} className="flex justify-center">
                                <MdSpaceDashboard className='text-[44px] cursor-pointer border-2 border-transparent' />
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/dashboard/manage-users'} className="flex justify-center">
                                <FaUserCog className='text-[44px] cursor-pointer border-2 border-transparent' />
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/dashboard/manage-listings'} className="flex justify-center">
                                <FaShop className='text-[44px] cursor-pointer border-2 border-transparent' />
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/dashboard/manage-orders'} className="flex justify-center">
                                <FaShoppingBag className='text-[44px] cursor-pointer border-2 border-transparent' />
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className='flex justify-center'>
                    <button onClick={() => logOut()}>
                        <MdOutlineExitToApp className='text-[44px] cursor-pointer rotate-180' />
                    </button>
                </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col">
                {/* Navbar */}
                <nav className='p-3 flex justify-between'>
                    <div className={`flex items-baseline gap-5  ${darkTheme ? 'text-[#F7F3E9]' : 'text-[#556B2F]'}`}>
                        <h1 className='ml-3 font-bold text-4xl'>Admin Dashboard</h1>
                        <p>{dateFull}</p>
                    </div>
                    <div className='flex justify-around gap-4'>
                        <button
                            className={`${darkTheme ? 'text-[#F7F3E9]' : 'text-[#556B2F]'} text-xl md:text-4xl cursor-pointer`}
                            title='Click to change theme.'
                            onClick={() => setDarkTheme(!darkTheme)}
                        >
                            {darkTheme ? <FaCloudMoon /> : <FaCloudSun />}
                        </button>
                        <div className="dropdown">
                            <div tabIndex={0} role="button">
                                {user.photoURL ? (
                                    <img
                                        title={`click to go Profile of User: ${user.displayName}`}
                                        className={`w-8 h-8 md:w-12 md:h-12 object-cover border-2 ${darkTheme ? 'border-[#F7F3E9]' : 'border-[#556B2F]'} p-0.5 rounded-full`}
                                        src={user.photoURL}
                                        alt="DP"
                                    />
                                ) : (
                                    <img
                                        title={`click to go Profile of User: ${user.displayName}`}
                                        width={40}
                                        className='rounded-full'
                                        src='https://img.icons8.com/ink/96/f7f3e9/user-male-circle.png'
                                        alt="DP"
                                    />
                                )}
                            </div>
                            <ul tabIndex={-1} className="menu dropdown-content right-1 bg-[#556B2F40] rounded z-10 mt-3 w-fit p-2 shadow space-y-1.5">
                                <button className="px-4 pt-0.5 pb-0.75 rounded-full bg-[#F7F3E9] text-[#556B2F]">
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
