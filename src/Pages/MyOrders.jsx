import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../Contexts/AuthContext';
import Loading from './Loading';

const MyOrders = () => {

    const { user } = useContext(AuthContext);
    const [myOrders, setMyOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:3568/orders/${user?.email}`)
            .then(response => {
                setMyOrders(response.data);
                setLoading(false);
            }).catch(error => console.log(error))
    }, [user])

    return (
        <div className='max-w-[1200px] min-h-[65vh] mx-auto pt-[50px]'>
            <title>AdoptyCo | My Orders</title>
            <h1 className="mb-3 flex items-center gap-3 text-2xl lg:text-4xl font-semibold text-[#556B2F]">
                <span className="w-3 h-10 bg-[#556B2F] rounded-full"></span>
                <span className="px-8 py-2 bg-[#f7f3e9e5] border-4 border-[#556B2F] rounded-full shadow flex flex-col">
                    <span className='text-xl'>My Orders</span>
                </span>
            </h1>
            <div className='mb-[50px] w-full p-5 bg-[#556B2F] rounded-2xl shadow-2xl shadow-[#556B2F90] text-[#F7F3E9]'>
                {
                    loading ? (
                        <Loading viewHeight={40} color={'#F7F3E9'}></Loading>
                    ) : myOrders.length < 1 ? (
                        <div className='min-h-[40vh] flex items-center justify-center'>
                            <h1 className='text-2xl'>Nothing to show, you haven't ordered yet.</h1>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="table">
                                {/* head */}
                                <thead className='text-[#F7F3E9]'>
                                    <tr className=''>
                                        <th></th>
                                        <th>Product Name</th>
                                        <th>Shipping Address</th>
                                        <th>Quantity</th>
                                        <th>Total Price</th>
                                        <th>Date</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        myOrders.map(product => (
                                            <tr key={product?._id} className=''>
                                                <td></td>
                                                {/* <td>
                                                    <div className="flex items-center gap-3">
                                                        <div className="avatar">
                                                            <div className="mask mask-squircle h-12 w-12">
                                                                <img
                                                                    src={product?.photoURL}
                                                                    alt="Avatar Tailwind CSS Component" />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="font-bold">{product?.name}</div>
                                                            <div className="text-sm opacity-50">{product?.category}</div>
                                                        </div>
                                                    </div>
                                                </td> */}
                                                <td>
                                                    <p>{product?.productName}</p>
                                                </td>
                                                <td>
                                                    <p>{product?.address}</p>
                                                </td>
                                                <td>
                                                    <p>{product?.quantity}</p>
                                                </td>
                                                <td><p>{product?.price == 0 ? "Free" : `${product?.price}tk.`}</p></td>
                                                <td className='w-[150px]'><p>{product.date}</p></td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    )
                }

            </div>
        </div>
    );
};

export default MyOrders;