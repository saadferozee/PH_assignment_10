import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router';
import AuthContext from '../Contexts/AuthContext';
import { FaCloudMoon, FaCloudSun } from "react-icons/fa";
import { HiMenuAlt2 } from "react-icons/hi";
import ReactTooltip from './ReactTooltip';


const Navbar = () => {

    const { user, logOut } = useContext(AuthContext);
    const [darkTheme, setDarkTheme] = useState(false);

    useEffect(() => {
        const html = document.documentElement;
        if (darkTheme) {
            html.setAttribute("data-theme", "dark")
        } else {
            html.setAttribute("data-theme", "light")
        }
    }, [darkTheme])

    const handleLogOutbutton = e => {
        e.preventDefault();
        logOut()
            .then(() => {
                console.log('user logged out successfully')
            }).catch(error => console.log(error));
    }

    const links = <div className={`flex ${user ? 'gap-1' : 'gap-3'} font-stretch-125% text-[#F7F3E9] text-xl`}>
        <NavLink className='px-3 pt-0.5 pb-0.75 rounded-full border border-transparent' to={'/'}>Home</NavLink>
        <NavLink className='px-3 pt-0.5 pb-0.75 rounded-full border border-transparent' to={'/listings'}>Pet & Supplies</NavLink>
        {
            user ? (
                <>
                    <NavLink className='px-3 pt-0.5 pb-0.75 rounded-full border border-transparent' to={'/add-listing'}>Add Listing</NavLink>
                    <NavLink className='px-3 pt-0.5 pb-0.75 rounded-full border border-transparent' to={'/my-listings'}>My Listings</NavLink>
                    <NavLink className='px-3 pt-0.5 pb-0.75 rounded-full border border-transparent' to={'/my-orders'}>My Orders</NavLink>
                </>
            ) : (
                <div className='dropdown flex items-center'>
                    <a tabIndex={0} role='button' className='px-3 pt-0.5 pb-0.75 rounded-full border border-transparent'>Policies</a>
                    <ul tabIndex={-1} className="menu dropdown-content top-10 bg-[#556B2F40] rounded z-1 mt-3 w-fit p-2 shadow space-y-1.5">
                        <NavLink className="px-4 pt-0.5 pb-0.75 rounded-full bg-[#F7F3E9] text-[#556B2F] cursor-pointer">Terms</NavLink>
                        <NavLink className="px-4 pt-0.5 pb-0.75 rounded-full bg-[#F7F3E9] text-[#556B2F] cursor-pointer">Privacy</NavLink>
                    </ul>
                </div>
            )
        }
    </div>
    const linksDrop = <>
        <NavLink className='px-3 pt-0.5 pb-0.75 rounded-full border border-transparent' to={'/'}>Home</NavLink>
        <NavLink className='px-3 pt-0.5 pb-0.75 rounded-full border border-transparent' to={'/listings'}>Pet & Supplies</NavLink>
        {
            user && (
                <>
                    <NavLink className='px-3 pt-0.5 pb-0.75 rounded-full border border-transparent' to={'/add-listing'}>Add Listing</NavLink>
                    <NavLink className='px-3 pt-0.5 pb-0.75 rounded-full border border-transparent' to={'/my-listings'}>My Listings</NavLink>
                    <NavLink className='px-3 pt-0.5 pb-0.75 rounded-full border border-transparent' to={'/my-orders'}>My Orders</NavLink>
                </>
            )
        }
    </>

    return (
        <div className='sticky top-0 z-50'>
            <div className="bg-[#556B2F] shadow-lg shadow-[#00000040]">
                <div className='navbar min-h-0 h-11 md:h-22 py-0  max-w-[1200px] mx-auto lg:px-5 xl:mx-auto'>
                    <div className="navbar-start">
                        <ReactTooltip id={'nav'} content={'Click to Open Menu'} place={'bottom-start'}>
                            <div className="dropdown">
                                <div tabIndex={0} role="button" className="mr-3 md:mr-5 lg:hidden">
                                    <HiMenuAlt2 className='text-[#F7F3E9] text-xl md:text-4xl' />
                                </div>
                                <ul
                                    tabIndex="-1"
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                    {
                                        linksDrop
                                    }
                                </ul>
                            </div>
                        </ReactTooltip>
                        <a href='/' className="flex items-center gap-2 pl-0 text-[#F7F3E9]">
                            <img className='w-6 md:w-10 h-fit' src="/Cat-logo.png" alt="cat" />
                            <span className='title font-caveat hidden md:block font-light text-2xl'>AdoptyCo</span>
                        </a>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            {
                                links
                            }
                        </ul>
                    </div>
                    <div className="navbar-end flex items-center gap-4">
                        <button className='text-white text-xl md:text-4xl te0t-[#F703E9] cursor-pointer' title='Click to change theme.' onClick={() => setDarkTheme(!darkTheme)}>{darkTheme ? <FaCloudMoon /> : <FaCloudSun />}</button>
                        {
                            user ? (
                                <div className='flex items-center gap-2'>
                                    <div className="dropdown">
                                        <div tabIndex={0} role="button" >
                                            {
                                                user.photoURL ? (
                                                    <img title={`click to go Profile of User: ${user.displayName}`} className='w-8 h-8 md:w-12 md:h-12 object-cover border-2 border-[#F7F3E9] p-0.5 rounded-full' src={`${user.photoURL ? user.photoURL : 'https://img.icons8.com/ink/96/f7f3e9/user-male-circle.png'}`} alt="DP" />
                                                ) : (
                                                    <img title={`click to go Profile of User: ${user.displayName}`} width={40} className='rounded-full' src={'https://img.icons8.com/ink/96/f7f3e9/user-male-circle.png'} alt="DP" />
                                                )
                                            }
                                        </div>
                                        <ul tabIndex={-1} className="menu dropdown-content right-1 bg-[#556B2F40] rounded z-1 mt-3 w-fit p-2 shadow space-y-1.5">
                                            <ReactTooltip id='logout' content={'Click to see profile'} place={'bottom-end'}>
                                                <button className="px-4 pt-0.5 pb-0.75 rounded-full bg-[#F7F3E9] text-[#556B2F] cursor-pointer">Profile</button>
                                            </ReactTooltip>
                                            <ReactTooltip id='logout' content={'Click to LogOut'} place={'bottom-end'}>
                                                <button onClick={handleLogOutbutton} className="px-4 pt-0.5 pb-0.75 rounded-full bg-red-300 text-[#556B2F] cursor-pointer">LogOut</button>
                                            </ReactTooltip>
                                        </ul>
                                    </div>
                                </div>
                            ) : (
                                <ReactTooltip id='login' content={'Click to Login'} place={'bottom-end'}>
                                    <Link to={'/login'} className="px-4 pt-0.5 pb-0.75 rounded-full bg-[#F7F3E9] text-[#556B2F] cursor-pointer">Login</Link>
                                </ReactTooltip>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;