import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { TbCoinTaka } from "react-icons/tb";
import Loading from './Loading';


const ProductDetails = () => {

    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`https://adoptyco-7rpf8q1b5-saad-ferozees-projects.vercel.app/listings/product/${id}`)
            .then(response => {
                setProduct(response.data);
                setLoading(false);
            })
            .catch(error => console.log(error))
    }, [id])

    return (
        <div className='max-w-[1200px] mx-auto'>
            <title>AdoptyCo | Product Details</title>
            <div className=' min-h-[70vh] flex flex-col items-center'>
                <div className='mx-[3%] lg:min-w-[700px] my-8 lg:my-auto p-[2%] border-2 border-[#F7F3E995] rounded-4xl bg-[#556B2F45] flex flex-col lg:flex-row gap-10'>
                    {
                        loading ? <Loading viewHeight={40} color={'#556B2F'}></Loading> : (
                            <>
                                <div className='w-full lg:w-[45%]'>
                                    <img className='rounded-2xl w-full h-full object-cover' src={product?.photoURL} alt="" />
                                </div>
                                <div className='w-full lg:w-[55%] flex flex-col justify-end'>
                                    <h3 className='py-1 px-5 w-fit bg-[#556B2F] border rounded-full font-stretch-expanded text-sm text-[#F7F3E9]'>{product?.category}</h3>
                                    <h1 className='my-1 text-4xl text-[#F7F3E9] text-shadow-lg text-shadow-[#556B2F]'>{product?.name}</h1>
                                    <p className='font-semi-stretched text-lg'>{product?.description}</p>
                                    <hr className='my-6 opacity-40 border' />
                                    {/* <h2 className='text-lg'>Price : <span className='font-bold'>{product?.price}</span> <span className='text-sm'>BDT</span></h2> */}
                                    <h2 className='font-black text-3xl'>
                                        {product?.price == 0 ? 'Free' : (
                                            <span className='flex items-baseline'>
                                                <span className='text-[18px]'>Price : &nbsp;</span>
                                                <span className='flex items-center'>
                                                    <span>{product?.price}</span>
                                                    {/* &nbsp; */}
                                                    <TbCoinTaka className='mb-2 ml-0.5 text-[22px] ' />
                                                </span>
                                            </span>
                                        )}
                                    </h2>
                                    {/* <h2 className='text-lg'>Rating : <span className='font-bold'>{rating}</span> Star</h2> */}
                                    {/* <h4 className='text-lg'>Available Slots : <span className='font-bold'>{slotsAvailable}</span> <span className='text-sm'>(before tomorrow)</span></h4> */}
                                    <hr className='my-6 opacity-40 border' />
                                    <h3 className='text-xl font-bold opacity-70'><span className='text-[12px]'>Shop Owner's Email: </span>{product?.email}</h3>
                                    <h3 className='text-xl font-bold opacity-70'><span className='text-[12px]'>Shipped From: </span>{product?.location}</h3>
                                    <Link to={`/add-order/${product?._id}`} className='mt-8 px-8 pt-1.5 pb-1.75 border border-[#F7F3E990] rounded-full bg-[#556B2F] hover:bg-[#556B2F90] text-center text-[#F7F3E9] text-xl cursor-pointer'>Place an Order<span className='hidden md:inline'> on your doorstep</span></Link>
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;