import { analytics } from '../Firebase/firebase.init';
import { logEvent, getAnalytics } from 'firebase/analytics';
import axios from 'axios';

class AnalyticsService {
    constructor() {
        this.analytics = analytics;
    }

    // Log custom events
    logEvent(eventName, parameters = {}) {
        if (this.analytics) {
            logEvent(this.analytics, eventName, parameters);
        }
    }

    // Log user registration
    logUserRegistration(method = 'email') {
        this.logEvent('sign_up', {
            method: method
        });
    }

    // Log user login
    logUserLogin(method = 'email') {
        this.logEvent('login', {
            method: method
        });
    }

    // Log listing creation
    logListingCreated(category, price) {
        this.logEvent('listing_created', {
            category: category,
            price: price,
            currency: 'BDT'
        });
    }

    // Log order placement
    logOrderPlaced(productName, category, price, quantity) {
        this.logEvent('purchase', {
            currency: 'BDT',
            value: price * quantity,
            items: [{
                item_id: productName,
                item_name: productName,
                item_category: category,
                quantity: quantity,
                price: price
            }]
        });
    }

    // Log page views
    logPageView(pageName, pageTitle) {
        this.logEvent('page_view', {
            page_title: pageTitle,
            page_location: window.location.href,
            page_name: pageName
        });
    }

    // Get analytics data from backend (you'll need to implement these endpoints)
    async getDashboardStats() {
        try {
            const response = await axios.get('https://adoptyco.vercel.app/analytics/dashboard-stats');
            return response.data;
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
            return null;
        }
    }

    // Get user growth data
    async getUserGrowthData() {
        try {
            const response = await axios.get('https://adoptyco.vercel.app/analytics/user-growth');
            return response.data;
        } catch (error) {
            console.error('Error fetching user growth data:', error);
            return null;
        }
    }

    // Get listing analytics
    async getListingAnalytics() {
        try {
            const response = await axios.get('https://adoptyco.vercel.app/analytics/listings');
            return response.data;
        } catch (error) {
            console.error('Error fetching listing analytics:', error);
            return null;
        }
    }

    // Get order analytics
    async getOrderAnalytics() {
        try {
            const response = await axios.get('https://adoptyco.vercel.app/analytics/orders');
            return response.data;
        } catch (error) {
            console.error('Error fetching order analytics:', error);
            return null;
        }
    }
}

export default new AnalyticsService();