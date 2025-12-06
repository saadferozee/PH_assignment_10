import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Loading from './Loading';
import Swal from 'sweetalert2';

const UpdateListing = () => {

    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [isPet, setIsPet] = useState(false);
    const navigate = useNavigate();

    const handleUpdateListing = e => {
        e.preventDefault();

        const form = e.target;
        const name = form.name.value;
        const category = form.category.value;
        const price = form.price.value;
        const photoURL = form.photoURL.value;
        const description = form.description.value;
        const location = form.location.value;
        const date = form.date.value;
        const updatedData = { name, category, price, photoURL, description, location, date }

        axios.put(`https://adoptyco.vercel.app/listings/update/${id}`, updatedData)
            .then(response => {
                console.log(response.data);
                Swal.fire({
                    title: "Product Details Updated!!",
                    text: `Category:"${product?.category}", Product:"${product?.name}"`,
                    icon: "success"
                });
                navigate(`/my-listings`);
            }).catch(error => console.log(error))
    }

    useEffect(() => {
        axios.get(`https://adoptyco-r0iy7b452-saad-ferozees-projects.vercel.app/listings/product/${id}`)
            .then(response => {
                setProduct(response.data);
                setLoading(false);
                setIsPet(response.data.category === 'pet' ? true : false);
            })
            .catch(error => console.log(error))
    }, [id])

    return (
        <div>
            <title>AdoptyCo | Order Page</title>
            <div>
                <div className='w-full py-[100px]'>
                    <div className='max-w-[700px] mx-auto'>
                        <form onSubmit={handleUpdateListing} className='w-full px-2'>
                            <fieldset className="fieldset w-full bg-[#556B2F] border-none shadow-2xl shadow-[#00000070] rounded-3xl border p-6 sm:p-10">
                                {
                                    loading ? <Loading viewHeight={40} color={'#F7F3E9'}></Loading> : (
                                        <>
                                            <h2 className='text-3xl text-[#F7F3E9]'>{isPet ? 'Update Pet Details' : 'Update Product Details'}</h2>

                                            <div className='lg:flex justify-between'>
                                                <label className="label text-[#F7F3E9]">{isPet ? 'Pet Name :' : 'Product Name :'}</label>
                                                <input type="text" name='name' className="input px-6 lg:w-[80%] rounded-full" defaultValue={product?.name} />
                                            </div>

                                            <div className='lg:flex justify-between'>
                                                <label className="label text-[#F7F3E9]">Category :</label>
                                                <select
                                                    name='category'
                                                    onChange={(e) => e.target.value === 'pet' ? setIsPet(true) : setIsPet(false)}
                                                    defaultValue={product?.category}
                                                    className="select lg:w-[80%] px-6 rounded-full"
                                                >
                                                    <option disabled={true}>Select a Category</option>
                                                    <option value='pet'>Pet</option>
                                                    <option value='pet-food'>Pet Food</option>
                                                    <option value='accessories'>Accessories</option>
                                                    <option value='care-products'>Care Products</option>
                                                </select>
                                            </div>

                                            <div className='lg:flex justify-between'>
                                                <label className="label text-[#F7F3E9]">Price (BDT) :</label>
                                                <input
                                                    name='price'
                                                    className="input px-6 lg:w-[80%] rounded-full"
                                                    defaultValue={product?.price}
                                                    readOnly={isPet}
                                                />
                                            </div>

                                            <div className='lg:flex justify-between'>
                                                <label className="label text-[#F7F3E9]">Photo URL :</label>
                                                <input type="text" name='photoURL' className="input px-6 lg:w-[80%] rounded-full" defaultValue={product?.photoURL} />
                                            </div>

                                            <div className='lg:flex justify-between'>
                                                <label className="label text-[#F7F3E9]">Description :</label>
                                                <textarea type="text" name='description' className="textarea h-fit px-6 lg:w-[80%] rounded-3xl" defaultValue={product?.description} placeholder='Write Additional Note' />
                                            </div>

                                            <div className='lg:flex justify-between'>
                                                <label className="label text-[#F7F3E9]">Location :</label>
                                                <input type="text" name='location' className="input px-6 lg:w-[80%] rounded-full" defaultValue={product?.location} />
                                            </div>

                                            <div className='lg:flex justify-between'>
                                                <label className="label text-[#F7F3E9]">Date (pickup) :</label>
                                                <input type="date" name='date' className="input px-6 lg:w-[80%] rounded-full" defaultValue={product?.date} placeholder="Date (Pick Up)" required />
                                            </div>

                                            <div className='flex flex-col-reverse lg:flex-row justify-between'>
                                                <button
                                                    type='button'
                                                    onClick={() => window.history.back()}
                                                    className="btn lg:w-[18%] mt-2 bg-[#F7F3E999] hover:bg-[#F7F3E985] shadow-[#F7F3E9] border-transparent rounded-full text-[#556B2F]"
                                                >Cancel</button>
                                                <button
                                                    type='submit'
                                                    className="btn lg:w-[80%] mt-2 bg-[#F7F3E9] hover:bg-[#F7F3E9c0] shadow-[#F7F3E9] border-transparent rounded-full text-[#556B2F]"
                                                >{isPet ? 'Update Pet Details' : 'Update Product Details'}</button>
                                            </div>
                                        </>
                                    )
                                }
                            </fieldset>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateListing;