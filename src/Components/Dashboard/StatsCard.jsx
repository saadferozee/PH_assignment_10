import React from 'react';

const StatsCard = ({ title, value, icon, trend, trendValue, color = 'bg-[#556B2F]', mobile = false }) => {
    return (
        <div className={`${color} rounded-xl lg:rounded-2xl p-3 lg:p-6 text-[#F7F3E9] shadow-lg hover:shadow-xl transition-shadow duration-300`}>
            <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                    <p className={`text-xs lg:text-sm opacity-80 mb-1 ${mobile ? 'truncate' : ''}`}>{title}</p>
                    <p className={`${mobile ? 'text-lg sm:text-xl lg:text-3xl' : 'text-3xl'} font-bold ${mobile ? 'truncate' : ''}`}>{value}</p>
                    {trend && (
                        <div className={`flex items-center mt-1 lg:mt-2 text-xs lg:text-sm ${trend === 'up' ? 'text-green-300' : trend === 'down' ? 'text-red-300' : 'text-yellow-300'}`}>
                            <span className="mr-1 flex-shrink-0">
                                {trend === 'up' ? '↗' : trend === 'down' ? '↘' : '→'}
                            </span>
                            <span className={`${mobile ? 'truncate' : ''}`}>{trendValue}</span>
                        </div>
                    )}
                </div>
                <div className={`${mobile ? 'text-2xl lg:text-4xl' : 'text-4xl'} opacity-70 flex-shrink-0 ml-2`}>
                    {icon}
                </div>
            </div>
        </div>
    );
};

export default StatsCard;