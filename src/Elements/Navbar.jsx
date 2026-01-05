import { useContext, useEffect, useState, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import AuthContext from '../Contexts/AuthContext';
import { FaCloudMoon, FaCloudSun, FaTachometerAlt } from "react-icons/fa";
import ReactTooltip from './ReactTooltip';

const Navbar = () => {
    const { user, role, logOut } = useContext(AuthContext);
    const [darkTheme, setDarkTheme] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();
    const menuRef = useRef(null);

    useEffect(() => {
        const html = document.documentElement;
        if (darkTheme) {
            html.setAttribute("data-theme", "dark")
        } else {
            html.setAttribute("data-theme", "light")
        }
    }, [darkTheme]);

    // Close mobile menu when route changes
    useEffect(() => {
        const closeMenu = () => setMobileMenuOpen(false);
        closeMenu();
    }, [location.pathname]);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMobileMenuOpen(false);
            }
        };

        if (mobileMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [mobileMenuOpen]);

    const handleLogOutbutton = e => {
        e.preventDefault();
        logOut()
            .then(() => {
                console.log('user logged out successfully')
            }).catch(error => console.log(error));
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    const links = <div className={`flex ${user ? 'gap-1' : 'gap-3'} font-stretch-125% text-[#F7F3E9] text-xl`}>
        <NavLink className='px-3! pt-0.5 pb-0.75 rounded-full border-2 border-transparent hover:border-[#F7F3E9] transition-all duration-300' to={'/'}>Home</NavLink>
        <NavLink className='px-3! pt-0.5 pb-0.75 rounded-full border-2 border-transparent hover:border-[#F7F3E9] transition-all duration-300' to={'/listings'}>Pet & Supplies</NavLink>
        {
            user ? (
                <>
                    <NavLink className='px-3! pt-0.5 pb-0.75 rounded-full border-2 border-transparent hover:border-[#F7F3E9] transition-all duration-300' to={'/add-listing'}>Add Listing</NavLink>
                    <NavLink className='px-3! pt-0.5 pb-0.75 rounded-full border-2 border-transparent hover:border-[#F7F3E9] transition-all duration-300' to={'/my-listings'}>My Listings</NavLink>
                    <NavLink className='px-3! pt-0.5 pb-0.75 rounded-full border-2 border-transparent hover:border-[#F7F3E9] transition-all duration-300' to={'/my-orders'}>My Orders</NavLink>
                </>
            ) : (
                <div className='dropdown flex items-center'>
                    <a tabIndex={0} role='button' className='px-3 pt-0.5 pb-0.75 rounded-full border border-transparent hover:border-[#F7F3E9] transition-all duration-300'>Policies</a>
                    <ul tabIndex={-1} className="menu dropdown-content top-10 bg-[#556B2F40] rounded z-1 mt-3 w-fit p-2 shadow space-y-1.5">
                        <NavLink to="/privacy-policy" className="px-4 pt-0.5 pb-0.75 rounded-full bg-[#F7F3E9] text-[#556B2F] cursor-pointer hover:bg-gray-100 transition-colors">Privacy</NavLink>
                        <NavLink to="/terms-conditions" className="px-4 pt-0.5 pb-0.75 rounded-full bg-[#F7F3E9] text-[#556B2F] cursor-pointer hover:bg-gray-100 transition-colors">Terms</NavLink>
                    </ul>
                </div>
            )
        }
    </div>;

    const linksDrop = (
        <div className="space-y-2">
            <NavLink 
                onClick={closeMobileMenu} 
                className={({ isActive }) => `
                    block px-4 py-2 rounded-lg transition-all duration-300 mx-2 text-left
                    ${isActive 
                        ? 'bg-[#556B2F] text-white font-medium' 
                        : 'text-gray-700 hover:bg-[#556B2F] hover:text-white'
                    }
                `}
                to={'/'}
            >
                Home
            </NavLink>
            <NavLink 
                onClick={closeMobileMenu} 
                className={({ isActive }) => `
                    block px-4 py-2 rounded-lg transition-all duration-300 mx-2 text-left
                    ${isActive 
                        ? 'bg-[#556B2F] text-white font-medium' 
                        : 'text-gray-700 hover:bg-[#556B2F] hover:text-white'
                    }
                `}
                to={'/listings'}
            >
                Pet & Supplies
            </NavLink>
            {user && (
                <>
                    <NavLink 
                        onClick={closeMobileMenu} 
                        className={({ isActive }) => `
                            block px-4 py-2 rounded-lg transition-all duration-300 mx-2 text-left
                            ${isActive 
                                ? 'bg-[#556B2F] text-white font-medium' 
                                : 'text-gray-700 hover:bg-[#556B2F] hover:text-white'
                            }
                        `}
                        to={'/add-listing'}
                    >
                        Add Listing
                    </NavLink>
                    <NavLink 
                        onClick={closeMobileMenu} 
                        className={({ isActive }) => `
                            block px-4 py-2 rounded-lg transition-all duration-300 mx-2 text-left
                            ${isActive 
                                ? 'bg-[#556B2F] text-white font-medium' 
                                : 'text-gray-700 hover:bg-[#556B2F] hover:text-white'
                            }
                        `}
                        to={'/my-listings'}
                    >
                        My Listings
                    </NavLink>
                    <NavLink 
                        onClick={closeMobileMenu} 
                        className={({ isActive }) => `
                            block px-4 py-2 rounded-lg transition-all duration-300 mx-2 text-left
                            ${isActive 
                                ? 'bg-[#556B2F] text-white font-medium' 
                                : 'text-gray-700 hover:bg-[#556B2F] hover:text-white'
                            }
                        `}
                        to={'/my-orders'}
                    >
                        My Orders
                    </NavLink>
                    <NavLink 
                        onClick={closeMobileMenu} 
                        to="/privacy-policy" 
                        className={({ isActive }) => `
                            block px-4 py-2 rounded-lg transition-all duration-300 mx-2 text-left
                            ${isActive 
                                ? 'bg-[#556B2F] text-white font-medium' 
                                : 'text-gray-700 hover:bg-[#556B2F] hover:text-white'
                            }
                        `}
                    >
                        Privacy Policy
                    </NavLink>
                    <NavLink 
                        onClick={closeMobileMenu} 
                        to="/terms-conditions" 
                        className={({ isActive }) => `
                            block px-4 py-2 rounded-lg transition-all duration-300 mx-2 text-left
                            ${isActive 
                                ? 'bg-[#556B2F] text-white font-medium' 
                                : 'text-gray-700 hover:bg-[#556B2F] hover:text-white'
                            }
                        `}
                    >
                        Terms & Conditions
                    </NavLink>
                </>
            )}
        </div>
    );

    return (
        <div className='sticky top-0 z-50'>
            <div className="bg-[#556B2F] shadow-lg shadow-[#00000040]">
                <div className='navbar min-h-0 h-11 md:h-22 py-0 max-w-[1200px] mx-auto lg:px-5 xl:mx-auto'>
                    <div className="navbar-start">
                        {/* Custom Animated Hamburger Menu */}
                        <div className="lg:hidden mr-3 md:mr-5 relative" ref={menuRef}>
                            <button
                                onClick={toggleMobileMenu}
                                className="p-2 rounded-lg hover:bg-[#6B8E23] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#F7F3E9] focus:ring-opacity-50"
                                aria-label="Toggle mobile menu"
                            >
                                <div className="w-6 h-6 flex flex-col justify-center items-center">
                                    <span className={`block h-0.5 w-6 bg-[#F7F3E9] transform transition-all duration-300 ${
                                        mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                                    }`}></span>
                                    <span className={`block h-0.5 w-6 bg-[#F7F3E9] transform transition-all duration-300 mt-1 ${
                                        mobileMenuOpen ? 'opacity-0' : ''
                                    }`}></span>
                                    <span className={`block h-0.5 w-6 bg-[#F7F3E9] transform transition-all duration-300 mt-1 ${
                                        mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                                    }`}></span>
                                </div>
                            </button>
                            
                            {/* Mobile Menu Dropdown */}
                            {mobileMenuOpen && (
                                <div className="absolute top-full left-0 w-72 bg-white rounded-lg shadow-xl border border-gray-200 mt-2 py-3 z-50 animate-in slide-in-from-top-2 duration-200">
                                    <div className="px-4 py-3 border-b border-gray-100">
                                        <div className="flex items-center gap-2">
                                            <img className='w-6 h-6' src="/Cat-logo.png" alt="AdoptyCo" />
                                            <span className='font-caveat text-lg font-semibold text-[#556B2F]'>AdoptyCo</span>
                                        </div>
                                    </div>
                                    <div className="py-2">
                                        {linksDrop}
                                    </div>
                                </div>
                            )}
                        </div>

                        <Link to='/' className="flex items-center gap-2 pl-0 text-[#F7F3E9] hover:opacity-80 transition-opacity duration-300">
                            <img className='w-6 md:w-10 h-fit' src="/Cat-logo.png" alt="cat" />
                            <span className='title font-caveat hidden md:block font-light text-2xl'>AdoptyCo</span>
                        </Link>
                    </div>
                    
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            {links}
                        </ul>
                    </div>
                    
                    <div className="navbar-end flex items-center gap-4">
                        <ReactTooltip id='theme-toggle' content={`Switch to ${darkTheme ? 'light' : 'dark'} theme`} place={'bottom'}>
                            <button 
                                className='text-white text-xl md:text-4xl cursor-pointer hover:scale-110 transition-transform duration-300' 
                                onClick={() => setDarkTheme(!darkTheme)}
                                data-tooltip-id='theme-toggle'
                            >
                                {darkTheme ? <FaCloudMoon /> : <FaCloudSun />}
                            </button>
                        </ReactTooltip>
                        
                        {/* Dashboard Button for Admins */}
                        {user && role === 'admin' && (
                            <ReactTooltip id='dashboard' content={'Go to Admin Dashboard'} place={'bottom'}>
                                <Link 
                                    to='/dashboard/stats' 
                                    className="flex items-center gap-2 px-3 py-2 bg-[#9ACD32] text-[#556B2F] rounded-full hover:bg-[#F7F3E9] transition-all duration-300 transform hover:scale-105 font-semibold text-sm"
                                    data-tooltip-id='dashboard'
                                >
                                    <FaTachometerAlt />
                                    <span className="hidden md:inline">Dashboard</span>
                                </Link>
                            </ReactTooltip>
                        )}
                        
                        {user ? (
                            <div className='flex items-center gap-2'>
                                <div className="dropdown">
                                    <div tabIndex={0} role="button" className="hover:scale-105 transition-transform duration-300">
                                        {user.photoURL ? (
                                            <img 
                                                title={`Profile of ${user.displayName}`} 
                                                className='w-8 h-8 md:w-12 md:h-12 object-cover border-2 border-[#F7F3E9] p-0.5 rounded-full hover:border-[#9ACD32] transition-colors duration-300' 
                                                src={user.photoURL} 
                                                alt="Profile" 
                                                onError={(e) => {
                                                    e.target.src = 'https://img.icons8.com/ink/96/f7f3e9/user-male-circle.png';
                                                }}
                                            />
                                        ) : (
                                            <img 
                                                title={`Profile of ${user.displayName}`} 
                                                className='w-8 h-8 md:w-12 md:h-12 rounded-full border-2 border-[#F7F3E9] hover:border-[#9ACD32] transition-colors duration-300' 
                                                src='https://img.icons8.com/ink/96/f7f3e9/user-male-circle.png' 
                                                alt="Profile" 
                                            />
                                        )}
                                    </div>
                                    <ul tabIndex={-1} className="menu dropdown-content right-1 bg-white rounded-lg shadow-xl border border-gray-200 z-10 mt-3 w-fit p-2 space-y-1.5">
                                        <ReactTooltip id='profile' content={'View your profile'} place={'left'}>
                                            <li>
                                                <Link 
                                                    to="/my-profile" 
                                                    className="px-4 py-2 rounded-full bg-[#556B2F] text-[#F7F3E9] hover:bg-[#6B8E23] transition-colors duration-300 text-center"
                                                    data-tooltip-id='profile'
                                                >
                                                    Profile
                                                </Link>
                                            </li>
                                        </ReactTooltip>
                                        <ReactTooltip id='logout' content={'Sign out of your account'} place={'left'}>
                                            <li>
                                                <button 
                                                    onClick={handleLogOutbutton} 
                                                    className="px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors duration-300 w-full"
                                                    data-tooltip-id='logout'
                                                >
                                                    Logout
                                                </button>
                                            </li>
                                        </ReactTooltip>
                                    </ul>
                                </div>
                            </div>
                        ) : (
                            <ReactTooltip id='login' content={'Sign in to your account'} place={'bottom-end'}>
                                <Link 
                                    to={'/login'} 
                                    className="px-4 pt-0.5 pb-0.75 rounded-full bg-[#F7F3E9] text-[#556B2F] hover:bg-[#9ACD32] transition-all duration-300 transform hover:scale-105 font-medium"
                                    data-tooltip-id='login'
                                >
                                    Login
                                </Link>
                            </ReactTooltip>
                        )}
                    </div>
                </div>
                </div>
        </div>
    );
};

export default Navbar;