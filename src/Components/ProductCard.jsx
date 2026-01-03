import React from 'react';
import { MdOutlinePets } from "react-icons/md";
import { Link } from 'react-router';
import { TbCoinTaka } from "react-icons/tb";


const ProductCard = ({ product }) => {

    const { _id: id, name, category, price, photoURL, location } = product;

    return (
        <div className='w-full h-full'>
            <div className='w-full h-full bg-[#556B2F] border border-[#F7F3E995] p-2 sm:p-3 lg:p-4 xl:p-2 rounded-xl text-[#F7F3E9] flex flex-col justify-between hover:cursor-pointer hover:scale-102 hover:shadow-2xl transition-transform duration-400'>
                <div className='relative'>
                    {
                        category === 'pet' && <span className='absolute -bottom-2 -right-3 z-10 opacity-60'><MdOutlinePets className='text-[30px] sm:text-[40px] rotate-25 drop-shadow-lg drop-shadow-[#F7F3E9]' /></span>
                    }
                    <img className='w-full h-[100px] sm:h-[150px] md:h-[180px] xl:h-[150px] object-cover border border-[#F7F3E9] rounded-lg' src={photoURL} alt={name} />
                </div>
                <h3 className='mt-1 font-semibold font-caveat text-sm sm:text-xl lg:text-3xl xl:text-[18px] text-shadow-lg text-shadow-[#F7F3E920]'>{name}</h3>
                <p className='hidden sm:block text-sm lg:text-xl xl:text-sm'>Shipping from : {location}</p>
                <div className='my-1 flex justify-between items-center'>
                    <h2 className='font-black font-caveat text-lg sm:text-xl lg:text-4xl xl:text-2xl'>
                        {price == 0 ? 'Free' : (
                            <span className='flex items-baseline'>
                                {/* <span className='text-[10px]'>Price : &nbsp;</span> */}
                                <span className='flex items-center'>
                                    <span>{price}</span>
                                    {/* &nbsp; */}
                                    <TbCoinTaka className='mb-2 ml-0.5 text-[16px] ' />
                                </span>
                            </span>
                        )}
                    </h2>
                    <h2 className='px-1.5 sm:px-2.5 bg-[#F7F3E9] rounded-full text-[#556B2F] font-light font-caveat text-[10px] sm:text-[12px] lg:text-[16px] xl:text-[12px]'>
                        {category === 'pet' ? 'Pet' : category === 'pet-food' ? 'Pet Food' : category === 'accessories' ? 'Accessories' : category === 'care-products' ? 'Pet Care Product' : category}
                    </h2>
                </div>
                <Link to={`/product/${id}`} className='px-1 py-0.5 sm:py-1 xl:py-0.5 border lg:border-2 border-[#F7F3E995] cursor-pointer rounded-full text-center font-extralight text-[10px] sm:text-[14px] lg:text-[18px] xl:text-[14px] text-[##F7F3E9]' title='Click to see full details'>View Details</Link>
            </div>
        </div>
    );
};

export default ProductCard;