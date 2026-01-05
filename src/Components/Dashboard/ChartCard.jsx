import React from 'react';

const ChartCard = ({ title, children, className = '' }) => {
    return (
        <div className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 ${className}`}>
            <h3 className="text-xl font-semibold text-[#556B2F] dark:text-[#F7F3E9] mb-4">
                {title}
            </h3>
            <div className="h-64">
                {children}
            </div>
        </div>
    );
};

export default ChartCard;