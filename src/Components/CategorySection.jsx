import React from 'react';
import Headline from '../Elements/Headline';

const CategorySection = () => {
    return (
        <div className='max-w-[1200px] mx-auto my-14'>
            <Headline typo={'Adopting and Shopping, Together'}></Headline>
            <div className='p-4 lg:p-0 grid grid-cols-2 lg:grid-cols-4 gap-3'>
                <a
                href='/listings/pet'                    
                    className="card image-full shadow-sm border-2 border-[#556B2F] p-1">
                    <figure>
                        <img
                            className=' brightness-70'
                            src="https://i.postimg.cc/9MmFBrwC/imgi-210-pets-g6fa575878-1920.jpg"
                            alt="Pets" />
                    </figure>
                    <div className="card-body p-3 flex justify-center items-center">
                        <h2 className="card-title text-center font-black text-[#F7F3E9] text-shadow-lg">Pet Adoption</h2>
                    </div>
                </a>
                <a href='/listings/pet-food' className="card image-full shadow-sm border-2 border-[#556B2F] p-1">
                    <figure>
                        <img
                            className='brightness-70'
                            src="https://i.postimg.cc/3JsGFF8k/pet-food-types.jpg"
                            alt="Shoes" />
                    </figure>
                    <div className="card-body p-3 flex justify-center items-center">
                        <h2 className="card-title text-center font-black text-[#F7F3E9] text-shadow-lg">Pet Food</h2>
                    </div>
                </a>
                <a href='/listings/accessories' className="card image-full shadow-sm border-2 border-[#556B2F] p-1">
                    <figure>
                        <img
                            className='brightness-70 object-cover'
                            src="https://i.postimg.cc/8CVn9vHk/imgi-221-Depositphotos-174424104-L-e1682761869956.jpg"
                            alt="Shoes" />
                    </figure>
                    <div className="card-body p-3 flex justify-center items-center">
                        <h2 className="card-title text-center font-black text-[#F7F3E9] text-shadow-lg">Accessories</h2>
                    </div>
                </a>
                <a href='/listings/care-product' className="card image-full shadow-sm border-2 border-[#556B2F] p-1">
                    <figure>
                        <img
                            className='brightness-70'
                            src="https://i.postimg.cc/tCjkXb6R/imgi-128-npb-blog-image-one-stop-brand-shop.jpg"
                            alt="Shoes" />
                    </figure>
                    <div className="card-body p-3 flex justify-center items-center">
                        <h2 className="card-title text-center font-black text-[#F7F3E9] text-shadow-lg">Care Product</h2>
                    </div>
                </a>
            </div>
        </div>
    );
};

export default CategorySection;