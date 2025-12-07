import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ProductCard from '../Components/ProductCard';
import Loading from './Loading';
import { Link, useParams } from 'react-router';
import { LuSearch, LuSearchX } from "react-icons/lu";

const PetAndSupplies = () => {

    const params = useParams();
    const [category, setCategory] = useState(params?.category ? params.category : '');

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const [filteredProducts, setFilteredProducts] = useState(products);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchInput, setSearchInput] = useState('');

    const handleSearch = e => {
        setLoading(true);
        const input = e.target.value;
        setSearchInput(input);

        if (input === '') {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(products.filter(productData => productData.name.toLowerCase().includes(input.toLowerCase())));
        }
        setLoading(false);
    }

    useEffect(() => {
        axios.get(category ? `https://adoptyco.vercel.app/listings/category/${category}` : 'https://adoptyco.vercel.app/listings')
            .then(response => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch(error => console.log(error))
    }, [category])

    return (
        <div className='py-[50px] max-w-[1200px] mx-auto'>
            <title>AdoptyCo | Pet & Supplies</title>
            <div className='mt-3'>
                <h1 className="mb-3 ml-2 lg:ml-0 flex items-center gap-3 text-2xl lg:text-4xl font-semibold text-[#556B2F]">
                    <span className="w-3 h-10 bg-[#556B2F] rounded-full"></span>
                    <span className="px-6 lg:px-22 py-2 bg-[#f7f3e9e5] border-4 border-[#556B2F] rounded-full shadow flex flex-col">
                        <span className='text-md lg:text-3xl'>All Pets and Supplies</span>
                    </span>
                </h1>
                <div className='m-3 flex justify-between items-baseline'>
                    <h4 className='mt-auto'>Total Listings : {products.length}</h4>
                    <div className='flex items-center gap-3'>
                        <div className='flex items-center gap-2'>
                            {
                                searchOpen && <input
                                    className='w-[200px] py-1 px-5 max-h-[30px] rounded-full border-2 border-[#556B2F90]  focus:outline-none'
                                    type="text"
                                    name="search"
                                    placeholder='Search Apps'
                                    defaultValue={searchInput}
                                    onChange={handleSearch}
                                />
                            }
                            <button
                                className={`text-3xl text-[#556B2F] transition-transform duration-300 ${searchOpen ? "rotate-360 scale-110" : "rotate-0 scale-100"}`}
                                onClick={() => setSearchOpen(!searchOpen)}
                            >
                                {searchOpen ? <LuSearchX /> : <LuSearch />}
                            </button>
                        </div>
                        <select
                            defaultValue={category === '' ? 'Filter By Category' : category}
                            onChange={(e) => {
                                setLoading(true);
                                setCategory(e.target.value);
                            }}
                            // style={{ paddingTop: '5px' , paddingBottom: '5px', paddingLeft: '10px', paddingRight: '10px', }}
                            className="select w-[200px] px-5 max-h-[30px] rounded-full active:border-none border-2 border-[#556B2F90] dark:border-[#F7F3E990]"
                        >
                            <option disabled={true}>Filter By Category </option>
                            <option value={'pet'}>Pet</option>
                            <option value={'pet-food'}>Pet Food</option>
                            <option value={'accessories'}>Accessories</option>
                            <option value={'care-products'}>Pet Care Products</option>
                            <option value={''}>All Products</option>
                        </select>
                    </div>
                </div>
            </div>
            {
                loading ? <Loading viewHeight="70" color={'#556B2F'}></Loading> : (
                    <div className='px-4 lg:px-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {
                            searchInput === "" ? (
                                products.map(product => <ProductCard key={product._id} product={product}></ProductCard>)
                            ) : (
                                filteredProducts.map(product => <ProductCard key={product._id} product={product}></ProductCard>)
                            )
                        }
                    </div>
                )
            }
            <div className='mt-5 flex justify-center'>
                <Link to={'/'} className="md:w-[600px] px-4 pt-1.5 pb-1.75 border border-[#F7F3E990] rounded-full bg-[#556B2F] hover:bg-[#556B2F90] text-center text-[#F7F3E9] cursor-pointer">Go Home Page</Link>
            </div>
        </div>
    );
};

export default PetAndSupplies;