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
                        autoplay={{
                            delay: 5500,
                            disableOnInteraction: false,
                        }}
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
                        className="mySwiper title-logo font-caveat"
                    >
                        <SwiperSlide className="flex flex-col justify-center items-center">
                            <div className="relative h-fit w-[96%] m-[2%] my-0">
                                <div className="company-logo absolute z-10 bottom-4 right-4 flex flex-col items-center text-[#ffffff90] drop-shadow-md">
                                    <span className="text-md lg:text-xl">AdoptyCo</span>
                                    <span className="font-light text-[10px] lg:text-lg">
                                        “Adopt a cat, shop for cat..”
                                    </span>
                                </div>
                                <img className="h-75 md:h-120 w-full border-3 border-[#556B2F] p-2 object-cover rounded-lg" src="https://i.postimg.cc/d3kC4P2b/imgi-200-pexels-photo-7726311.jpg" alt="" />
                                {/* Overlay text */}
                                <a href='#about-section' className="w-full h-full absolute inset-0 bg-[#1a4000b0]  flex items-center justify-center rounded-lg">
                                    <h3 className="text-[#ffffff] text-xl sm:text-2xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold text-center px-8 py-2 rounded text-shadow-lg text-shadow-[#556B2F]">
                                        Adopting a cat brings love, peace, and companionship far beyond what you imagine
                                    </h3>
                                </a>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="flex flex-col justify-center items-center">
                            <div className="relative h-fit w-[96%] m-[2%] my-0">
                                <div className="company-logo absolute z-10 bottom-4 right-4 flex flex-col items-center text-[#ffffff90] drop-shadow-md">
                                    <span className="text-md lg:text-xl">AdoptyCo</span>
                                    <span className="font-light text-[10px] lg:text-lg">
                                        “Adopt a cat, shop for cat..”
                                    </span>
                                </div>
                                <img className="h-75 md:h-120 w-full border-3 border-[#556B2F] p-2 object-cover rounded-lg" src="https://i.postimg.cc/WpBXFTcw/imgi-204-DC6F7787-9BE9-4BFF-ADCA-59F1C0BF18D6-da82e18b.jpg" alt="" />
                                {/* Overlay text */}
                                <a href='#pet-hero-section' className="w-full h-full absolute inset-0 bg-[#1a4000b0]  flex items-center justify-center rounded-lg">
                                    <h3 className="text-[#ffffff] text-xl sm:text-2xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold text-center px-8 py-2 rounded text-shadow-lg text-shadow-[#556B2F]">
                                        Day after day, they carry not just a cat or dog, but trust, hope, and quiet dedication ...
                                    </h3>
                                </a>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="flex flex-col justify-center items-center">
                            <div className="relative h-fit w-[96%] m-[2%] my-0">
                                <div className="company-logo absolute z-10 bottom-4 right-4 flex flex-col items-center text-[#ffffff90] drop-shadow-md">
                                    <span className="text-md lg:text-xl">AdoptyCo</span>
                                    <span className="font-light text-[10px] lg:text-lg">
                                        “Adopt a cat, shop for cat..”
                                    </span>
                                </div>
                                <img className="h-75 md:h-120 w-full border-3 border-[#556B2F] p-2 object-cover rounded-lg" src="https://i.postimg.cc/HWw7zg7z/imgi-169-Getty-Images-470406795.jpg" alt="" />
                                {/* Overlay text */}
                                <a href='#recent-section' className="w-full h-full absolute inset-0 bg-[#1a4000b0]  flex items-center justify-center rounded-lg">
                                    <h3 className="text-[#ffffff] text-xl sm:text-2xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold text-center px-8 py-2 rounded text-shadow-lg text-shadow-[#556B2F]">
                                        One simple purchase, one full bowl, pure love for an innocent life ...
                                    </h3>
                                </a>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="flex flex-col justify-center items-center">
                            <div className="relative h-fit w-[96%] m-[2%] my-0">
                                <div className="company-logo absolute z-10 bottom-4 right-4 flex flex-col items-center text-[#ffffff90] drop-shadow-md">
                                    <span className="text-md lg:text-xl">AdoptyCo</span>
                                    <span className="font-light text-[10px] lg:text-lg">
                                        “Adopt a cat, shop for cat..”
                                    </span>
                                </div>
                                <img className="h-75 md:h-120 w-full border-3 border-[#556B2F] p-2 object-cover rounded-lg" src="https://i.postimg.cc/d3kC4P2b/imgi-200-pexels-photo-7726311.jpg" alt="" />
                                {/* Overlay text */}
                                <a href='#about-section' className="w-full h-full absolute inset-0 bg-[#1a4000b0]  flex items-center justify-center rounded-lg">
                                    <h3 className="text-[#ffffff] text-xl sm:text-2xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold text-center px-8 py-2 rounded text-shadow-lg text-shadow-[#556B2F]">
                                        Adopting a cat brings love, peace, and companionship far beyond what you imagine
                                    </h3>
                                </a>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="flex flex-col justify-center items-center">
                            <div className="relative h-fit w-[96%] m-[2%] my-0">
                                <div className="company-logo absolute z-10 bottom-4 right-4 flex flex-col items-center text-[#ffffff90] drop-shadow-md">
                                    <span className="text-md lg:text-xl">AdoptyCo</span>
                                    <span className="font-light text-[10px] lg:text-lg">
                                        “Adopt a cat, shop for cat..”
                                    </span>
                                </div>
                                <img className="h-75 md:h-120 w-full border-3 border-[#556B2F] p-2 object-cover rounded-lg" src="https://i.postimg.cc/WpBXFTcw/imgi-204-DC6F7787-9BE9-4BFF-ADCA-59F1C0BF18D6-da82e18b.jpg" alt="" />
                                {/* Overlay text */}
                                <a href='#pet-hero-section' className="w-full h-full absolute inset-0 bg-[#1a4000b0]  flex items-center justify-center rounded-lg">
                                    <h3 className="text-[#ffffff] text-xl sm:text-2xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold text-center px-8 py-2 rounded text-shadow-lg text-shadow-[#556B2F]">
                                        Day after day, they carry not just a cat or dog, but trust, hope, and quiet dedication ...
                                    </h3>
                                </a>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="flex flex-col justify-center items-center">
                            <div className="relative h-fit w-[96%] m-[2%] my-0">
                                <div className="company-logo absolute z-10 bottom-4 right-4 flex flex-col items-center text-[#ffffff90] drop-shadow-md">
                                    <span className="text-md lg:text-xl">AdoptyCo</span>
                                    <span className="font-light text-[10px] lg:text-lg">
                                        “Adopt a cat, shop for cat..”
                                    </span>
                                </div>
                                <img className="h-75 md:h-120 w-full border-3 border-[#556B2F] p-2 object-cover rounded-lg" src="https://i.postimg.cc/HWw7zg7z/imgi-169-Getty-Images-470406795.jpg" alt="" />
                                {/* Overlay text */}
                                <a href='#recent-section' className="w-full h-full absolute inset-0 bg-[#1a4000b0]  flex items-center justify-center rounded-lg">
                                    <h3 className="text-[#ffffff] text-xl sm:text-2xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold text-center px-8 py-2 rounded text-shadow-lg text-shadow-[#556B2F]">
                                        One simple purchase, one full bowl, pure love for an innocent life ...
                                    </h3>
                                </a>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;