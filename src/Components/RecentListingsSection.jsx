import { useEffect, useState } from 'react';
import { FaArrowRight, FaHeart, FaMapMarkerAlt } from 'react-icons/fa';
import { MdPets } from 'react-icons/md';
import axios from 'axios';
import Loading from '../Pages/Loading';
import ProductCard from './ProductCard';
import Headline from '../Elements/Headline';
import { Link } from 'react-router';

const RecentListingsSection = () => {
    const [recentProducts, setRecentProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://adoptyco.vercel.app/listings/recentListings')
            .then(response => {
                setRecentProducts(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            })
    }, [])

    return (
        <section className='py-16 bg-gradient-to-br from-[#F7F3E9] via-white to-[#F7F3E9] dark:from-gray-800 dark:via-gray-900 dark:to-gray-800'>
            <div className='max-w-[1200px] mx-auto px-4'>
                {/* Enhanced Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <MdPets className="text-3xl text-[#556B2F]" />
                        <h2 className="text-4xl font-bold text-[#556B2F] dark:text-[#F7F3E9]">
                            Recently Added
                        </h2>
                        <MdPets className="text-3xl text-[#556B2F]" />
                    </div>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Meet our newest family members looking for their forever homes. These adorable pets just joined our platform!
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center">
                        <Loading viewHeight="70" color={'#556B2F'} />
                    </div>
                ) : (
                    <>
                        {/* Enhanced Grid */}
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6'>
                            {recentProducts.map(product => (
                                <div key={product._id} className="group">
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </div>

                        {/* Call to Action */}
                        <div className="text-center mt-12">
                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 max-w-2xl mx-auto">
                                <div className="flex items-center justify-center gap-3 mb-4">
                                    <FaHeart className="text-2xl text-red-500" />
                                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                                        Find Your Perfect Match
                                    </h3>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 mb-6">
                                    Browse through hundreds of pets waiting for their forever homes. 
                                    Each one has a unique personality and story to share.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link to={'/listings/pet'} className="bg-[#556B2F] text-white px-6 py-3 rounded-full hover:bg-[#6B8E23] transition-colors font-semibold flex items-center gap-2 justify-center">
                                        <MdPets />
                                        View All Pets
                                        <FaArrowRight />
                                    </Link>
                                    {/* <button className="border-2 border-[#556B2F] text-[#556B2F] px-6 py-3 rounded-full hover:bg-[#556B2F] hover:text-white transition-colors font-semibold flex items-center gap-2 justify-center">
                                        <FaMapMarkerAlt />
                                        Search by Location
                                    </button> */}
                                </div>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="text-center bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                                <div className="text-3xl font-bold text-[#556B2F] mb-2">
                                    {recentProducts.length}+
                                </div>
                                <div className="text-gray-600 dark:text-gray-400">
                                    New Pets This Week
                                </div>
                            </div>
                            <div className="text-center bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                                <div className="text-3xl font-bold text-[#556B2F] mb-2">
                                    {new Set(recentProducts.map(p => p.category)).size}
                                </div>
                                <div className="text-gray-600 dark:text-gray-400">
                                    Different Categories
                                </div>
                            </div>
                            <div className="text-center bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                                <div className="text-3xl font-bold text-[#556B2F] mb-2">
                                    {recentProducts.filter(p => p.price === 0).length}
                                </div>
                                <div className="text-gray-600 dark:text-gray-400">
                                    Free Adoptions
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default RecentListingsSection;