import React from 'react';

const ChartCard = ({ title, children, className = '', mobile = false }) => {
    return (
        <div className={`bg-white dark:bg-gray-800 rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-600 border-opacity-30 ${className}`}>
            <h3 className={`${mobile ? 'text-base lg:text-xl' : 'text-xl'} font-semibold text-[#556B2F] dark:text-[#F7F3E9] mb-3 lg:mb-4`}>
                {title}
            </h3>
            <div className={`${mobile ? 'h-48 lg:h-64' : 'h-64'}`}>
                {children}
            </div>
        </div>
    );
};

export default ChartCard;