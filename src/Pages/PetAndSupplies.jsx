import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ProductCard from '../Components/ProductCard';
import Loading from './Loading';
import { useParams } from 'react-router';

const PetAndSupplies = () => {

    const params = useParams();
    const [category, setCategory] = useState(params?.category ? params.category : '');

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(category ? `http://localhost:3568/listings/${category}` : 'http://localhost:3568/listings')
            .then(response => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch(error => console.log(error))
    }, [category])

    return (
        <div className='py-[50px] max-w-[1200px] mx-auto'>
            <div className='my-3'>
                <div className='my-2 flex justify-between'>
                    <h4>Total Listings : {products.length}</h4>
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
            {
                loading ? <Loading viewHeight="70"></Loading> : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {
                            products.map(product => <ProductCard key={product._id} product={product}></ProductCard>)
                        }
                    </div>
                )
            }
        </div>
    );
};

export default PetAndSupplies;