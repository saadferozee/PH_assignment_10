/**
 * Utility functions for safe date handling
 */

/**
 * Safely parse a date string and return a valid Date object or null
 * @param {string|Date} dateInput - Date string or Date object to parse
 * @returns {Date|null} - Valid Date object or null if invalid
 */
export const safeParseDate = (dateInput) => {
    if (!dateInput) return null;
    
    const date = new Date(dateInput);
    return isNaN(date.getTime()) ? null : date;
};

/**
 * Format a date to YYYY-MM-DD string safely
 * @param {string|Date} dateInput - Date to format
 * @returns {string|null} - Formatted date string or null if invalid
 */
export const formatDateToString = (dateInput) => {
    const date = safeParseDate(dateInput);
    return date ? date.toISOString().split('T')[0] : null;
};

/**
 * Check if a date is within a specific range
 * @param {string|Date} dateInput - Date to check
 * @param {Date} startDate - Start of range
 * @param {Date} endDate - End of range (optional, defaults to now)
 * @returns {boolean} - True if date is within range
 */
export const isDateInRange = (dateInput, startDate, endDate = new Date()) => {
    const date = safeParseDate(dateInput);
    if (!date) return false;
    
    return date >= startDate && date <= endDate;
};

/**
 * Get date ranges for analytics
 * @returns {Object} - Object containing common date ranges
 */
export const getDateRanges = () => {
    const now = new Date();
    
    return {
        today: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
        thisWeek: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
        thisMonth: new Date(now.getFullYear(), now.getMonth(), 1),
        thisYear: new Date(now.getFullYear(), 0, 1)
    };
};

/**
 * Generate an array of date strings for a given number of days
 * @param {number} days - Number of days to generate
 * @returns {string[]} - Array of date strings in YYYY-MM-DD format
 */
export const generateDateRange = (days) => {
    return Array.from({ length: days }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (days - 1 - i));
        return date.toISOString().split('T')[0];
    });
};