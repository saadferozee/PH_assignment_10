import React, { createContext, useContext } from 'react';
import analyticsService from '../Services/analyticsService';

const AnalyticsContext = createContext();

export const useAnalytics = () => {
    const context = useContext(AnalyticsContext);
    if (!context) {
        throw new Error('useAnalytics must be used within an AnalyticsProvider');
    }
    return context;
};

export const AnalyticsProvider = ({ children }) => {
    const trackEvent = (eventName, parameters) => {
        analyticsService.logEvent(eventName, parameters);
    };

    const trackPageView = (pageName, pageTitle) => {
        analyticsService.logPageView(pageName, pageTitle);
    };

    const trackUserAction = (action, details) => {
        analyticsService.logEvent('user_action', {
            action,
            ...details
        });
    };

    const trackPurchase = (productName, category, price, quantity) => {
        analyticsService.logOrderPlaced(productName, category, price, quantity);
    };

    const trackListingCreation = (category, price) => {
        analyticsService.logListingCreated(category, price);
    };

    const value = {
        trackEvent,
        trackPageView,
        trackUserAction,
        trackPurchase,
        trackListingCreation
    };

    return (
        <AnalyticsContext.Provider value={value}>
            {children}
        </AnalyticsContext.Provider>
    );
};

export default AnalyticsContext;