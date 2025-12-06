import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router';
import AuthContext from '../Contexts/AuthContext';
import { FaCloudMoon } from "react-icons/fa";
import { FaCloudSun } from "react-icons/fa";


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

    const links = <div className={`flex ${user ? 'gap-1' : 'gap-3'} font-stretch-125% text-[#F7F3E9] text-md`}>
        <NavLink className='px-3 pt-1.5 pb-1.75 rounded-full border border-transparent' to={'/'}>Home</NavLink>
        <NavLink className='px-3 pt-1.5 pb-1.75 rounded-full border border-transparent' to={'/listings'}>Pet & Supplies</NavLink>
        {
            user && (
                <>
                    <NavLink className='px-3 pt-1.5 pb-1.75 rounded-full border border-transparent' to={'/add-listing'}>Add Listing</NavLink>
                    <NavLink className='px-3 pt-1.5 pb-1.75 rounded-full border border-transparent' to={'/my-listings'}>My Listings</NavLink>
                    <NavLink className='px-3 pt-1.5 pb-1.75 rounded-full border border-transparent' to={'/my-orders'}>My Orders</NavLink>
                </>
            )
        }
        {/* <NavLink className='px-3 pt-1.5 pb-1.75 rounded-full border border-transparent' to={'/my-profile'}>My Profile</NavLink> */}
    </div>
    const linksDrop = <>
        <NavLink className='px-3 pt-1.5 pb-1.75 rounded-full border border-transparent' to={'/'}>Home</NavLink>
        <NavLink className='px-3 pt-1.5 pb-1.75 rounded-full border border-transparent' to={'/listings'}>Pet & Supplies</NavLink>
        {
            user && (
                <>
                    <NavLink className='px-3 pt-1.5 pb-1.75 rounded-full border border-transparent' to={'/add-listing'}>Add Listing</NavLink>
                    <NavLink className='px-3 pt-1.5 pb-1.75 rounded-full border border-transparent' to={'/my-listings'}>My Listings</NavLink>
                    <NavLink className='px-3 pt-1.5 pb-1.75 rounded-full border border-transparent' to={'/my-orders'}>My Orders</NavLink>
                </>
            )
        }
    </>

    return (
        <div className='sticky top-0 z-50'>
            <div className="bg-[#556B2F] shadow-lg shadow-[#00000040]">
                <div className='navbar max-w-[1200px] mx-auto'>
                    <div className="navbar-start">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="mr-4 bt btn-ghos lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                            </div>
                            <ul
                                tabIndex="-1"
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                {
                                    linksDrop
                                }
                            </ul>
                        </div>
                        <a href='/' className="flex items-center gap-2 pl-0 text-[#F7F3E9]">
                            <img width={35} height={35} src="/Cat-logo.png" alt="cat" />
                            <span className='title hidden md:block font-light text-2xl'>AdoptyCo</span>
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
                        <button className='text-2xl text-[#F7F3E9] cursor-pointer' title='Click to change theme.' onClick={() => setDarkTheme(!darkTheme)}>{darkTheme ? <FaCloudMoon /> : <FaCloudSun />}</button>
                        {
                            user ? (
                                <div className='flex items-center gap-2'>
                                    <a href="/my-profile">
                                        {
                                            user.photoURL ? (
                                                <img title={`click to go Profile of User: ${user.displayName}`} width={40} height={40} className='border-2 border-[#F7F3E9] p-0.5 rounded-full' src={`${user.photoURL ? user.photoURL : 'https://img.icons8.com/ink/96/f7f3e9/user-male-circle.png'}`} alt="DP" />
                                            ) : (
                                                <img title={`click to go Profile of User: ${user.displayName}`} width={40} className='rounded-full' src={'https://img.icons8.com/ink/96/f7f3e9/user-male-circle.png'} alt="DP" />
                                            )
                                        }
                                    </a>
                                    <button onClick={handleLogOutbutton} className="px-4 pt-1.5 pb-1.75 rounded-full bg-[#F7F3E9] text-[#556B2F] cursor-pointer">LogOut</button>
                                </div>
                            ) : (
                                <Link to={'/login'} className="px-4 pt-1.5 pb-1.75 rounded-full bg-[#F7F3E9] text-[#556B2F] cursor-pointer">Login</Link>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;