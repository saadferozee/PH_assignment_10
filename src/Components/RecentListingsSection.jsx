import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../Pages/Loading';
import ProductCard from './ProductCard';
import Headline from '../Elements/Headline';

const RecentListingsSection = () => {

    const [recentProducts, setRecentProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://adoptyco.vercel.app/listings/recentListings')
            .then(response => {
                setRecentProducts(response.data);
                setLoading(false);
            })
            .catch(error => console.log(error))
    }, [])

    return (
        <div className='py-10 bg-[#556B2F35]'>
            <div className='max-w-[1200px] mx-auto lg:mx-5 xl:mx-auto'>
                <Headline typo={'Recently Added'}></Headline>

            {
                loading ? <Loading viewHeight="70" color={'#556B2F'}></Loading> : (
                    <div className='px-4 lg:px-0 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-1 sm:gap-2 md:gap-2.5 xl:gap-1.5'>
                        {
                            recentProducts.map(product => <ProductCard key={product._id} product={product}></ProductCard>)
                        }
                    </div>
                )
            } 
            </div>
        </div>
    );
};

export default RecentListingsSection;