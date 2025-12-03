import React from 'react';
import { MdOutlinePets } from "react-icons/md";
import { Link } from 'react-router';
import { TbCoinTaka } from "react-icons/tb";


const ProductCard = ({ product }) => {

    const { _id: id, name, category, price, photoURL, location } = product;

    return (
        <div className='w-full h-full'>
            <div className='w-full h-full bg-[#556B2F] border border-[#F7F3E995] p-5 rounded-2xl text-[#F7F3E9] flex flex-col justify-between'>
                <div className='relative'>
                    {
                        category === 'pet' && <span className='absolute -bottom-6 -right-5 z-10 opacity-60'><MdOutlinePets className='text-[60px] rotate-25 drop-shadow-lg drop-shadow-[#F7F3E9]' /></span>
                    }
                    <img className='w-full h-[250px] object-cover border border-[#F7F3E9] rounded-xl' src={photoURL} alt={name} />
                </div>
                <h3 className='mt-2 font-semibold text-2xl text-shadow-lg text-shadow-[#F7F3E920]'>{name}</h3>
                <p className='font-extralight text-sm'>Shipping from : {location}</p>
                <div className='my-3 flex justify-between items-center'>
                    <h2 className='font-black text-xl'>
                        {price == 0 ? 'Free' : (
                            <span className='flex items-baseline'>
                                <span className='text-[10px]'>Price : &nbsp;</span>
                                <span className='flex items-center'>
                                    <span>{price}</span>
                                    {/* &nbsp; */}
                                    <TbCoinTaka className='mb-2 ml-0.5 text-[16px] ' />
                                </span>
                            </span>
                        )}
                    </h2>
                    <h2 className='px-3 bg-[#F7F3E9] rounded-full text-[#556B2F] font-light text-sm'>
                        {category === 'pet' ? 'Pet' : category === 'pet-food' ? 'Pet Food' : category === 'accessories' ? 'Accessories' : category === 'care-products' ? 'Pet Care Product' : category}
                    </h2>
                </div>
                <Link to={`/product/${id}`} className='p-1 border-2 border-[#F7F3E995] cursor-pointer rounded-full text-center font-extralight text-sm text-[##F7F3E9]' title='Click to see full details'>View Details</Link>
            </div>
        </div>
    );
};

export default ProductCard;