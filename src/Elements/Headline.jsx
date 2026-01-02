import React from 'react';
import { Typewriter } from 'react-simple-typewriter';

const Headline = ({ typo }) => {
    return (
        <div>
            <h1 className="mb-3 ml-2 lg:ml-0 flex items-center gap-2 text-2xl lg:text-4xl font-semibold text-[#556B2F]">
                <span className="w-1 md:w-1.5 h-6 sm:h-8 bg-[#556B2F] rounded-full"></span>
                <span className="px-6 md:px-10 lg:px-22 py-1 sm:py-2 md:py-3 bg-[#f7f3e9e5] border-2 md:border-4 border-[#556B2F] rounded-full shadow flex flex-col">
                    <span className='text-[18px] sm:text-[24px] md:text-[32px] lg:text-3xl'>
                        {/* <Typewriter
                            words={[typo]}
                            loop={0}
                            cursor
                            cursorStyle="_"
                            typeSpeed={200}
                            deleteSpeed={40}
                            delaySpeed={2200}
                        /> */}
                        {typo}
                    </span>
                </span>
            </h1>
        </div>
    );
};

export default Headline;
