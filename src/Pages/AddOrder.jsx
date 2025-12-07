import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../Contexts/AuthContext';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddOrder = () => {

    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [product, setProduct] = useState({});
    const [isPet, setIsPet] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

    const handleAddOrder = e => {
        e.preventDefault();

        const form = e.target;
        const buyerName = form.buyerName.value;
        const buyerEmail = form.buyerEmail.value;
        const productId = form.productId.value;
        const productName = form.productName.value;
        const quantity = form.quantity.value;
        const price = form.price.value;
        const date = form.date.value;
        const phoneNumber = form.phoneNumber.value;
        const address = form.address.value;
        const note = form.note.value;
        const orderData = { buyerName, buyerEmail, productId, productName, quantity, price: price === 'free' ? 0 : price, date, phoneNumber, address, note }

        axios.post(`https://adoptyco.vercel.app/orders`, orderData)
            .then(response => {
                if (response.status == 200) {
                    form.reset();
                    // sweet alert
                    Swal.fire({
                        title: "Your Order Confirmed!!",
                        text: `Category:"${product?.category}", Product:"${productName}", Quantity:"${quantity}"`,
                        icon: "success"
                    });
                    navigate(`/product/${productId}`);
                }
            });
    };

    useEffect(() => {
        axios.get(`https://adoptyco.vercel.app/listings/product/${id}`)
            .then(response => {
                setProduct(response.data);
                setIsPet(response.data.category === 'pet' ? true : false);
            });
    }, [id])

    return (
        <div>
            <title>AdoptyCo | Order Page</title>
            <div>
                <div className='w-full py-[100px]'>
                    <div className='max-w-[700px] mx-auto'>
                        <form onSubmit={handleAddOrder} className='w-full px-2'>
                            <fieldset className="fieldset w-full bg-[#556B2F] border-none shadow-2xl shadow-[#00000070] rounded-3xl border p-6 sm:p-10">
                                <h2 className='text-3xl text-[#F7F3E9]'>{ isPet ? 'Request to Adopt' : 'Purchase Order'}</h2>

                                <div className='lg:flex justify-between'>
                                    <label className="label text-[#F7F3E9]">{isPet ? "Adopter's Name :" : 'Buyer Name :'}</label>
                                    <input type="text" name='buyerName' className="lg:w-[80%] input px-6 rounded-full" defaultValue={user?.displayName} readOnly />
                                </div>

                                <div className='lg:flex justify-between'>
                                    <label className="label text-[#F7F3E9]">{isPet ? "Adopter's Name :" :'Buyer Email :'}</label>
                                    <input type="text" name='buyerEmail' className="input px-6 lg:w-[80%] rounded-full" defaultValue={user?.email} readOnly />
                                </div>

                                <div className='lg:flex justify-between'>
                                    <label className="label text-[#F7F3E9]">{isPet ? 'Pet Id :' : 'Product Id :'}</label>
                                    <input type="text" name='productId' className="input px-6 lg:w-[80%] rounded-full" defaultValue={product?._id} disabled />
                                </div>

                                <div className='lg:flex justify-between'>
                                    <label className="label text-[#F7F3E9]">Product Name :</label>
                                    <input type="text" name='productName' className="input px-6 lg:w-[80%] rounded-full" defaultValue={product?.name} readOnly />
                                </div>

                                <div className='lg:flex justify-between'>
                                    <label className="label text-[#F7F3E9]">Category :</label>
                                    <input
                                        type="text"
                                        name='category'
                                        className="input px-6 lg:w-[80%] rounded-full "
                                        defaultValue={product.category}
                                        readOnly
                                    />
                                </div>

                                <div className='lg:flex justify-between'>
                                    <label className="label text-[#F7F3E9]">Quantity :</label>
                                    <input
                                        type="number"
                                        name='quantity'
                                        className="input px-6 lg:w-[80%] rounded-full"
                                        defaultValue={1}
                                        onChange={(e) => setQuantity(e.target.value == 0 ? 1 : e.target.value)}
                                        disabled={isPet}
                                        placeholder="Quantity"
                                    />
                                </div>

                                <div className='lg:flex justify-between'>
                                    <label className="label text-[#F7F3E9]">Price (BDT) :</label>
                                    <input
                                        type={isPet ? 'text' : 'number'}
                                        name='price'
                                        className="input px-6 lg:w-[80%] rounded-full"
                                        value={isPet ? 'Free' : (product?.price * quantity) || 0}
                                        readOnly
                                    />
                                </div>

                                <div className='lg:flex justify-between'>
                                    <label className="label text-[#F7F3E9]">Location :</label>
                                    <input type="text" name='location' className="input px-6 lg:w-[80%] rounded-full" defaultValue={product?.location} readOnly />
                                </div>

                                <div className='lg:flex justify-between'>
                                    <label className="label text-[#F7F3E9]">Date (pickup) :</label>
                                    <input type="date" name='date' className="input px-6 lg:w-[80%] rounded-full" placeholder="Date (Pick Up)" required />
                                </div>

                                <div className='lg:flex justify-between'>
                                    <label className="label text-[#F7F3E9]">Phone Number :</label>
                                    <input
                                        type='tel'
                                        required
                                        name='phoneNumber'
                                        className="input px-6 lg:w-[80%] rounded-full"
                                        placeholder="Phone Number" />
                                </div>

                                <div className='lg:flex justify-between'>
                                    <label className="label text-[#F7F3E9]">Address :</label>
                                    <input
                                        type='text'
                                        required
                                        name='address'
                                        className="input px-6 lg:w-[80%] rounded-full"
                                        placeholder="Address" />
                                </div>

                                <div className='lg:flex justify-between'>
                                    <label className="label text-[#F7F3E9]">Additional Note :</label>
                                    <textarea type="text" name='note' className="textarea h-fit px-6 lg:w-[80%] rounded-3xl" placeholder='Write Additional Note' />
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
                                    >{isPet ? 'Adopt' : 'Confirm Order'}</button>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddOrder;