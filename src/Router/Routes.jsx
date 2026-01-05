import React from 'react';
import { createBrowserRouter } from 'react-router';
import Root from '../Components/Root';
import Home from '../Pages/Home';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import PetAndSupplies from '../Pages/PetAndSupplies';
import PrivateRoute from './PrivateRoute';
import AddListing from '../Pages/AddListing';
import MyListings from '../Pages/MyListings';
import MyOrders from '../Pages/MyOrders';
import NotFound404 from '../Pages/Error/NotFound404';
import MyProfile from '../Pages/MyProfile';
import ProductDetails from '../Pages/ProductDetails';
import AddOrder from '../Pages/AddOrder';
import UpdateListing from '../Pages/UpdateLIsting';
import DashboardLayout from '../Layouts/DashboardLayout';
import AdminDashboard from '../Pages/AdminDashboard';
import ManageUser from '../Pages/ManageUser';
import ManageListings from '../Pages/ManageListings';
import ManageOrders from '../Pages/ManageOrders';
import PrivacyPolicy from '../Pages/PrivacyPolicy';
import TermsConditions from '../Pages/TermsConditions';
import ErrorBoundary from '../Components/ErrorBoundary';

const router = createBrowserRouter([
    {
        path: '/',
        Component: Root,
        children: [
            { index: true, Component: Home },
            { path: '/listings', Component: PetAndSupplies },
            { path: '/listings/:category', Component: PetAndSupplies },
            { path: '/product/:id', element: <ProductDetails></ProductDetails> },
            { path: '/add-order/:id', element: <PrivateRoute authorization={'all-users'}><AddOrder></AddOrder></PrivateRoute> },
            { path: '/login', Component: Login },
            { path: '/register', Component: Register },
            { path: '/add-listing', element: <PrivateRoute authorization={'all-users'}><AddListing></AddListing></PrivateRoute> },
            { path: '/my-listings', element: <PrivateRoute authorization={'all-users'}><MyListings></MyListings></PrivateRoute> },
            { path: '/update-listing/:id', element: <PrivateRoute authorization={'all-users'}><UpdateListing></UpdateListing></PrivateRoute> },
            { path: '/my-orders', element: <PrivateRoute authorization={'all-users'}><MyOrders></MyOrders></PrivateRoute> },
            { path: '/my-profile', element: <PrivateRoute authorization={'all-users'}><MyProfile></MyProfile></PrivateRoute> },
            { path: '/privacy-policy', Component: PrivacyPolicy },
            { path: '/terms-conditions', Component: TermsConditions }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute authorization={'admin'}><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {path: 'stats', element: <ErrorBoundary><AdminDashboard /></ErrorBoundary>},
            {path: 'manage-users', Component: ManageUser},
            {path: 'manage-listings', Component: ManageListings},
            {path: 'manage-orders', Component: ManageOrders}
        ]
    },
    {
        path: '*',
        Component: NotFound404
    }
])

export default router;