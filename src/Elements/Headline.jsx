import React from 'react';
import { Typewriter } from 'react-simple-typewriter';

const Headline = ({ typo }) => {
    return (
        <div>
            <h1 className="mb-3 ml-2 lg:ml-0 flex items-center gap-3 text-2xl lg:text-4xl font-semibold text-[#556B2F]">
                <span className="w-3 h-10 bg-[#556B2F] rounded-full"></span>
                <span className="px-6 lg:px-22 py-2 bg-[#f7f3e9e5] border-4 border-[#556B2F] rounded-full shadow flex flex-col">
                    <span className='text-sm lg:text-3xl'>
                        <Typewriter
                            words={[typo]}
                            loop={0}
                            cursor
                            cursorStyle="_"
                            typeSpeed={200}
                            deleteSpeed={40}
                            delaySpeed={2200}
                        />
                    </span>
                </span>
            </h1>
        </div>
    );
};

export default Headline;
