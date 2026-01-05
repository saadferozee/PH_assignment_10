import React from 'react';

const StatsCard = ({ title, value, icon, trend, trendValue, color = 'bg-[#556B2F]' }) => {
    return (
        <div className={`${color} rounded-2xl p-6 text-[#F7F3E9] shadow-lg hover:shadow-xl transition-shadow duration-300`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm opacity-80 mb-1">{title}</p>
                    <p className="text-3xl font-bold">{value}</p>
                    {trend && (
                        <div className={`flex items-center mt-2 text-sm ${trend === 'up' ? 'text-green-300' : trend === 'down' ? 'text-red-300' : 'text-yellow-300'}`}>
                            <span className="mr-1">
                                {trend === 'up' ? '↗' : trend === 'down' ? '↘' : '→'}
                            </span>
                            <span>{trendValue}</span>
                        </div>
                    )}
                </div>
                <div className="text-4xl opacity-70">
                    {icon}
                </div>
            </div>
        </div>
    );
};

export default StatsCard;