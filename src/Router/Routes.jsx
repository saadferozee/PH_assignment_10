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

const router = createBrowserRouter([
    {
        path: '/',
        Component: Root,
        children: [
            { index: true, Component: Home },
            { path: '/listings', Component: PetAndSupplies },
            { path: '/listings/:category', Component: PetAndSupplies },
            { path: '/product/:id', element: <PrivateRoute><ProductDetails></ProductDetails></PrivateRoute> },
            { path: '/add-order/:id', element: <PrivateRoute><AddOrder></AddOrder></PrivateRoute> },
            { path: '/login', Component: Login },
            { path: '/register', Component: Register },
            { path: '/add-listing', element: <PrivateRoute><AddListing></AddListing></PrivateRoute> },
            { path: '/my-listings', element: <PrivateRoute><MyListings></MyListings></PrivateRoute> },
            { path: '/my-orders', element: <PrivateRoute><MyOrders></MyOrders></PrivateRoute> },
            { path: '/my-profile', element: <PrivateRoute><MyProfile></MyProfile></PrivateRoute> }
        ]
    },
    {
        path: '*',
        Component: NotFound404
    }
])

export default router;