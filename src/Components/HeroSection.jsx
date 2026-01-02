import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay, Pagination, EffectCoverflow } from 'swiper/modules';
import 'swiper/css/effect-coverflow';
import { HiTicket } from 'react-icons/hi2';


const HeroSection = () => {
    return (
        <div>
            <div>
                <div className='static z-0 mb-[3%] mt-[7%] mx-0 w-auto overflow-hidden fredoka-normal'>
                    <Swiper
                        effect={'coverflow'}
                        spaceBetween={0}
                        grabCursor={true}
                        centeredSlides={true}
                        slidesPerView={1.25}
                        loop={true}
                        // autoplay={{
                        //     delay: 5500,
                        //     disableOnInteraction: false,
                        // }}
                        speed={4000}
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
                        className="mySwiper title-logo"
                    >
                        <SwiperSlide className="flex flex-col justify-center items-center">
                            <div className="relative h-fit w-[96%] m-[2%] my-0">
                                <div className="company-logo absolute bottom-4 right-4 flex flex-col items-center text-white/80 drop-shadow-md">
                                    <span className="text-md lg:text-xl">AdoptyCo</span>
                                    <span className="font-light text-[10px] lg:text-lg">
                                        “Adopt a cat, shop for him..”
                                    </span>
                                </div>
                                <img className="h-75 md:h-120 w-full border-3 border-[#556B2F] p-2 object-cover rounded-lg" src="https://i.postimg.cc/d3kC4P2b/imgi-200-pexels-photo-7726311.jpg" alt="" />
                                {/* Overlay text */}
                                <div className="w-full h-full absolute inset-0 bg-[#356f0F60]  flex items-center justify-center rounded-lg">
                                    <h3 className="text-[#ffffff] text-xl sm:text-2xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold text-center px-12 py-2 rounded text-shadow-lg">
                                        “Up here, life feels lighter, dreams feel closer, and the world feels wide open.”
                                    </h3>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="flex flex-col justify-center items-center">
                            <div className="relative h-fit w-[96%] m-[2%] my-0">
                                <div className="company-logo absolute bottom-4 right-4 flex flex-col items-center text-white/80 drop-shadow-md">
                                    <span className="text-md lg:text-xl">AdoptyCo</span>
                                    <span className="font-light text-[10px] lg:text-lg">
                                        “Adopt a cat, shop for him..”
                                    </span>
                                </div>
                                <img className="h-75 md:h-120 w-full border-3 border-[#556B2F] p-2 object-cover rounded-lg" src="https://i.postimg.cc/WpBXFTcw/imgi-204-DC6F7787-9BE9-4BFF-ADCA-59F1C0BF18D6-da82e18b.jpg" alt="" />
                                {/* Overlay text */}
                                <div className="w-full h-full absolute inset-0 bg-[#356f0F60]  flex items-center justify-center rounded-lg">
                                    <h3 className="text-[#ffffff] text-xl sm:text-2xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold text-center px-12 py-2 rounded text-shadow-lg">
                                        “From up here, the earth feels endless… just like our journey waiting to begin. Pack your bags, darling.”
                                    </h3>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="flex flex-col justify-center items-center">
                            <div className="relative h-fit w-[96%] m-[2%] my-0">
                                <div className="company-logo absolute bottom-4 right-4 flex flex-col items-center text-white/80 drop-shadow-md">
                                    <span className="text-md lg:text-xl">AdoptyCo</span>
                                    <span className="font-light text-[10px] lg:text-lg">
                                        “Adopt a cat, shop for him..”
                                    </span>
                                </div>
                                <img className="h-75 md:h-120 w-full border-3 border-[#556B2F] p-2 object-cover rounded-lg" src="https://i.postimg.cc/HWw7zg7z/imgi-169-Getty-Images-470406795.jpg" alt="" />
                                {/* Overlay text */}
                                <div className="w-full h-full absolute inset-0 bg-[#356f0F60]  flex items-center justify-center rounded-lg">
                                    <h3 className="text-[#ffffff] text-xl sm:text-2xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold text-center px-12 py-2 rounded text-shadow-lg">
                                        “Every click from the bus window was a promise—these travel days will never fade away.”
                                    </h3>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;