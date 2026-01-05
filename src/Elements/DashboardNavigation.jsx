import { useState, useContext, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { FaShoppingBag, FaUserCog, FaStar, FaArrowLeft, FaBars, FaTimes } from "react-icons/fa";
import { MdOutlineExitToApp, MdSpaceDashboard } from "react-icons/md";
import { FaCloudMoon, FaCloudSun, FaShop } from 'react-icons/fa6';
import AuthContext from '../Contexts/AuthContext';

const DashboardNavigation = ({ children }) => {
    const { user, logOut } = useContext(AuthContext);
    const [darkTheme, setDarkTheme] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
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

    // Close sidebar when route changes on mobile
    useEffect(() => {
        setSidebarOpen(false);
    }, [location.pathname]);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    // Close sidebar when clicking on navigation links (mobile)
    const handleNavLinkClick = () => {
        if (window.innerWidth < 1024) { // Only on mobile/tablet
            setSidebarOpen(false);
        }
    };

    return (
        <div className="flex h-screen">
            {/* Mobile Overlay - Only show on mobile when sidebar is open */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-[#00000060] bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Aside - Mobile: Fixed overlay, Desktop: Sticky */}
            <aside className={`
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                lg:translate-x-0 
                fixed lg:sticky 
                top-0 lg:top-5 
                left-0 lg:left-auto
                z-50 lg:z-auto
                h-full lg:h-[calc(100vh-40px)] 
                w-64 lg:w-20 
                bg-[#556B2F] text-[#F7F3E9] 
                transition-transform duration-300 ease-in-out lg:transition-none
                lg:rounded-3xl lg:mx-5 lg:my-5
                px-4 py-6
                lg:block
            `}>
                {/* Mobile Header */}
                <div className="lg:hidden flex items-center justify-between mb-6 pb-4 border-b border-[#6B8E23]">
                    <div className="flex items-center gap-2">
                        <img className='w-8 h-8' src="/Cat-logo.png" alt="AdoptyCo" />
                        <span className='font-caveat text-xl font-bold'>AdoptyCo</span>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="p-2 hover:bg-[#6B8E23] rounded-lg transition-colors"
                    >
                        <FaTimes className="text-xl" />
                    </button>
                </div>

                <div className='flex flex-col h-full'>
                    <div className='flex-1'>
                        <ul className='space-y-3 lg:space-y-6'>

                            {/* Back to Home Button */}
                            <li className="mb-6">
                                <Link to="/" className="flex lg:justify-center items-center gap-3 lg:gap-0 hover:bg-[#6B8E23]/30 p-2 lg:p-3 rounded-lg transition-colors">
                                    <FaArrowLeft className='text-2xl lg:text-4xl transition-all' />
                                    <span className="lg:hidden">Back to Homepage</span>
                                </Link>
                            </li>
                            <li>
                                <NavLink
                                    to={'/dashboard/stats'}
                                    className={({ isActive }) => `
                                        flex lg:justify-center items-center gap-3 lg:gap-0 p-2 lg:p-3 rounded-lg transition-colors
                                        ${isActive ? 'bg-[#6B8E23]/50' : 'hover:bg-[#6B8E23]/30'}
                                    `}
                                >
                                    <MdSpaceDashboard className='text-2xl lg:text-4xl transition-all' />
                                    <span className="lg:hidden">Dashboard</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={'/dashboard/manage-users'}
                                    className={({ isActive }) => `
                                        flex lg:justify-center items-center gap-3 lg:gap-0 p-2 lg:p-3 rounded-lg transition-colors
                                        ${isActive ? 'bg-[#6B8E23]/50' : 'hover:bg-[#6B8E23]/30'}
                                    `}
                                >
                                    <FaUserCog className='text-2xl lg:text-4xl transition-all' />
                                    <span className="lg:hidden">Manage Users</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={'/dashboard/manage-listings'}
                                    className={({ isActive }) => `
                                        flex lg:justify-center items-center gap-3 lg:gap-0 p-2 lg:p-3 rounded-lg transition-colors
                                        ${isActive ? 'bg-[#6B8E23]/50' : 'hover:bg-[#6B8E23]/30'}
                                    `}
                                >
                                    <FaShop className='text-2xl lg:text-4xl transition-all' />
                                    <span className="lg:hidden">Manage Listings</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={'/dashboard/manage-orders'}
                                    className={({ isActive }) => `
                                        flex lg:justify-center items-center gap-3 lg:gap-0 p-2 lg:p-3 rounded-lg transition-colors
                                        ${isActive ? 'bg-[#6B8E23]/50' : 'hover:bg-[#6B8E23]/30'}
                                    `}
                                >
                                    <FaShoppingBag className='text-2xl lg:text-4xl transition-all' />
                                    <span className="lg:hidden">Manage Orders</span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    {/* Logout button at the bottom */}
                    <div className='flex lg:justify-center mt-auto'>
                        <button
                            onClick={() => logOut()}
                            className="flex lg:justify-center items-center gap-3 lg:gap-0 hover:bg-[#6B8E23]/30 p-2 lg:p-3 rounded-lg transition-colors w-full lg:w-auto"
                        >
                            <MdOutlineExitToApp className='text-2xl lg:text-4xl rotate-180' />
                            <span className="lg:hidden">Logout</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col min-w-0 lg:mr-5">
                {/* Mobile/Desktop Navbar */}
                <nav className='p-3 lg:p-3 flex justify-between items-start'>
                    <div className="flex items-center gap-3">
                        {/* Mobile Menu Button - Animated Hamburger */}
                        <button
                            onClick={toggleSidebar}
                            className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-300 relative group"
                            aria-label="Toggle menu"
                        >
                            <div className="w-6 h-6 flex flex-col justify-center items-center">
                                <span className={`block h-0.5 w-6 bg-current transform transition-all duration-300 ${
                                    sidebarOpen ? 'rotate-45 translate-y-1.5' : ''
                                } ${darkTheme ? 'bg-[#F7F3E9]' : 'bg-[#556B2F]'}`}></span>
                                <span className={`block h-0.5 w-6 bg-current transform transition-all duration-300 mt-1 ${
                                    sidebarOpen ? 'opacity-0' : ''
                                } ${darkTheme ? 'bg-[#F7F3E9]' : 'bg-[#556B2F]'}`}></span>
                                <span className={`block h-0.5 w-6 bg-current transform transition-all duration-300 mt-1 ${
                                    sidebarOpen ? '-rotate-45 -translate-y-1.5' : ''
                                } ${darkTheme ? 'bg-[#F7F3E9]' : 'bg-[#556B2F]'}`}></span>
                            </div>
                        </button>

                        <div className={`flex flex-col ${darkTheme ? 'text-[#F7F3E9]' : 'text-[#556B2F]'}`}>
                            <div className="flex items-center gap-2 lg:gap-3">
                                <span className="text-xs font-medium opacity-60 uppercase tracking-wider">
                                    Admin Dashboard
                                </span>
                                <span className="w-1 h-1 bg-current opacity-40 rounded-full hidden sm:block"></span>
                                <span className="text-xs opacity-60 hidden sm:block">{dateFull}</span>
                            </div>
                            <h1 className='ml-0 font-bold text-xl sm:text-2xl lg:text-3xl mt-1 bg-linear-to-r from-[#556B2F] to-[#6B8E23] bg-clip-text text-transparent'>
                                {getPageTitle()}
                            </h1>
                        </div>
                    </div>

                    <div className='flex items-center gap-2 lg:gap-4'>
                        <button
                            className={`${darkTheme ? 'text-[#F7F3E9]' : 'text-[#556B2F]'} text-lg lg:text-xl xl:text-4xl cursor-pointer hover:scale-110 transition-transform`}
                            title='Click to change theme.'
                            onClick={() => setDarkTheme(!darkTheme)}
                        >
                            {darkTheme ? <FaCloudMoon /> : <FaCloudSun />}
                        </button>

                        {/* Review Button - Hidden on small screens */}
                        <button
                            className={`${darkTheme ? 'text-[#F7F3E9] hover:bg-gray-700' : 'text-[#556B2F] hover:bg-gray-100'} p-2 rounded-lg transition-all items-center gap-2 hidden md:flex`}
                            title='View Reviews'
                        >
                            <FaStar className="text-lg lg:text-xl xl:text-2xl" />
                            <span className="hidden lg:inline text-sm font-medium">Reviews</span>
                        </button>

                        <div className="dropdown">
                            <div tabIndex={0} role="button">
                                {user.photoURL ? (
                                    <img
                                        title={`click to go Profile of User: ${user.displayName}`}
                                        className={`w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 object-cover border-2 ${darkTheme ? 'border-[#F7F3E9]' : 'border-[#556B2F]'} p-0.5 rounded-full hover:scale-105 transition-transform cursor-pointer`}
                                        src={user.photoURL}
                                        alt="DP"
                                    />
                                ) : (
                                    <img
                                        title={`click to go Profile of User: ${user.displayName}`}
                                        className='w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full hover:scale-105 transition-transform cursor-pointer'
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
                <div className="flex-1 overflow-auto mt-1 lg:mt-3">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default DashboardNavigation;
