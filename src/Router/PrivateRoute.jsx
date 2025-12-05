import React, { useContext } from 'react';
import AuthContext from '../Contexts/AuthContext';
import Loading from '../Pages/Loading';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({ children }) => {

    const { user, authLoading } = useContext(AuthContext);
    const location = useLocation();

    if (authLoading) {
        return (
            <Loading viewHeight={70} color={'#556B2F'}></Loading>
        )
    }

    if (user) {
        return <>{children}</>
    } else {
        return <Navigate state={location.pathname} to={'/login'}></Navigate>
    }
};

export default PrivateRoute;