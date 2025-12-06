import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay, Pagination, EffectCoverflow } from 'swiper/modules';
import 'swiper/css/effect-coverflow';


const HeroSection = () => {
    return (
        <div>
            <div>
                <div className='static z-0 my-[3%] mx-0 w-auto overflow-hidden fredoka-normal'>
                    <Swiper
                        effect={'coverflow'}
                        spaceBetween={0}
                        grabCursor={true}
                        centeredSlides={true}
                        slidesPerView={1.25}
                        loop={true}
                        autoplay={{
                            delay: 3500,
                            disableOnInteraction: false,
                        }}
                        speed={2000}
                        pagination={{
                            clickable: true,
                        }}
                        coverflowEffect={{
                            rotate: 0,
                            stretch: 0,
                            depth: 200,
                            modifier: 1,
                            slideShadows: false,
                        }}
                        navigation={true}
                        modules={[Autoplay, Pagination, EffectCoverflow]}
                        className="mySwiper"
                    >
                        <SwiperSlide className=' flex flex-col justify-center items-center'>
                            <div className='h-fit'>
                                <h1 className='mx-[2.11%] mb-1.5 pb-1.25 font-semibold font-stretched text-xs sm:text-2xl text-[#556B2F] text-shadow-lg text-shadow-[#00000010] dark:text-shadow-[#F7F3E920] text-center'>Find Your Furry Friend Today!</h1>
                                {/* <hr className='my-2 mx-[3%] text-shadow-lg' /> */}
                                <img className='m-[2%] my-0 h-[300px] md:h-[600px] w-[96%] object-cover rounded-lg' src="https://i.postimg.cc/d3kC4P2b/imgi-200-pexels-photo-7726311.jpg" alt="dog taking shower with his master" />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className='flex flex-col justify-center items-center'>
                            <div className='h-fit'>
                                <h1 className='mx-[2.11%] mb-1.5 pb-1.25 font-semibold font-stretched text-xs sm:text-2xl text-[#556B2F] text-shadow-lg text-shadow-[#00000010] dark:text-shadow-[#F7F3E920] text-center'>Adopt, Don't Shop - Give a Pet a Home</h1>
                                {/* <hr className='my-2 mx-[3%] text-shadow-lg' /> */}
                                <img className='m-[2%] my-0 h-[300px] md:h-[600px] w-[96%] object-cover rounded-lg' src="https://i.postimg.cc/WpBXFTcw/imgi-204-DC6F7787-9BE9-4BFF-ADCA-59F1C0BF18D6-da82e18b.jpg" alt="young lady playing with dog" />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className='flex flex-col justify-center items-center'>
                            <div className='h-fit'>
                                <h1 className='mx-[2.11%] mb-1.5 pb-1.25 font-semibold font-stretched text-xs sm:text-2xl text-[#556B2F] text-shadow-lg text-shadow-[#00000010] dark:text-shadow-[#F7F3E920] text-center'>Because Every Pet Deserves Love and Care</h1>
                                {/* <hr className='my-2 mx-[3%] text-shadow-lg' /> */}
                                <img className='m-[2%] my-0 h-[300px] md:h-[600px] w-[96%] object-cover rounded-lg' src="https://i.postimg.cc/HWw7zg7z/imgi-169-Getty-Images-470406795.jpg" alt="dog taking shower by car washer hose pipe" />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className='flex flex-col justify-center items-center'>
                            <div className='h-fit'>
                                <h1 className='mx-[2.11%] mb-1.5 pb-1.25 font-semibold font-stretched text-xs sm:text-2xl text-[#556B2F] text-shadow-lg text-shadow-[#00000010] dark:text-shadow-[#F7F3E920] text-center'>Find Your Furry Friend Today!</h1>
                                {/* <hr className='my-2 mx-[3%] text-shadow-lg' /> */}
                                <img className='m-[2%] my-0 h-[300px] md:h-[600px] w-[96%] object-cover rounded-lg' src="https://i.postimg.cc/d3kC4P2b/imgi-200-pexels-photo-7726311.jpg" alt="dog taking shower with his master" />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className='flex flex-col justify-center items-center'>
                            <div className='h-fit'>
                                <h1 className='mx-[2.11%] mb-1.5 pb-1.25 font-semibold font-stretched text-xs sm:text-2xl text-[#556B2F] text-shadow-lg text-shadow-[#00000010] dark:text-shadow-[#F7F3E920] text-center'>Adopt, Don't Shop - Give a Pet a Home</h1>
                                {/* <hr className='my-2 mx-[3%] text-shadow-lg' /> */}
                                <img className='m-[2%] my-0 h-[300px] md:h-[600px] w-[96%] object-cover rounded-lg' src="https://i.postimg.cc/WpBXFTcw/imgi-204-DC6F7787-9BE9-4BFF-ADCA-59F1C0BF18D6-da82e18b.jpg" alt="young lady playing with dog" />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className='flex flex-col justify-center items-center'>
                            <div className='h-fit'>
                                <h1 className='mx-[2.11%] mb-1.5 pb-1.25 font-semibold font-stretched text-xs sm:text-2xl text-[#556B2F] text-shadow-lg text-shadow-[#00000010] dark:text-shadow-[#F7F3E920] text-center'>Because Every Pet Deserves Love and Care</h1>
                                {/* <hr className='my-2 mx-[3%] text-shadow-lg' /> */}
                                <img className='m-[2%] my-0 h-[300px] md:h-[600px] w-[96%] object-cover rounded-lg' src="https://i.postimg.cc/HWw7zg7z/imgi-169-Getty-Images-470406795.jpg" alt="dog taking shower by car washer hose pipe" />
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;