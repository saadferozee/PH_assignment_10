import React, { useContext } from 'react';
import AuthContext from '../Contexts/AuthContext';
import Loading from '../Pages/Loading';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({ children, authorization }) => {

    const location = useLocation();

    const { user, role, authLoading, roleLoading } = useContext(AuthContext);

    if (authLoading || roleLoading) {
        return <Loading viewHeight={70} color="#0A2F23" />;
    }

    if (!user) {
        return <Navigate to="/login" state={location.pathname} />;
    }

    if (authorization === 'all-users') {
        return children;
    }

    if (role === authorization) {
        return children;
    }

    return <Navigate to="/login" replace />;
};

export default PrivateRoute;