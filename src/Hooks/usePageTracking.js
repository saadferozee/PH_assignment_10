import { useEffect } from 'react';
import { useLocation } from 'react-router';
import analyticsService from '../Services/analyticsService';

const usePageTracking = () => {
    const location = useLocation();

    useEffect(() => {
        // Track page view on route change
        const pageName = location.pathname.replace('/', '') || 'home';
        const pageTitle = document.title || 'AdoptyCo';
        
        analyticsService.logPageView(pageName, pageTitle);
    }, [location]);
};

export default usePageTracking;