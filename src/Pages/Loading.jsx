import React from 'react';
import { ProgressBar } from 'react-loader-spinner'

const Loading = ({ viewHeight }) => {

    return (
        <div className={`w-full flex items-center justify-center`} style={{ height: `${parseInt(viewHeight)}vh` }}>
            <ProgressBar
                visible={true}
                height="120"
                width="120"
                borderColor='#556B2F'
                barColor="#556B2F"
                ariaLabel="progress-bar-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    );
};

export default Loading;