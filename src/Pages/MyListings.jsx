import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../Contexts/AuthContext';
import axios from 'axios';
import Loading from './Loading';
import Swal from 'sweetalert2';
import { Link } from 'react-router';

const MyListings = () => {

    const { user } = useContext(AuthContext);
    const [myListings, setMyListings] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://adoptyco.vercel.app/listings/delete/${id}`)
                    .then(response => {
                        if (response.data.deletedCount == 1) {
                            const filteredListings = myListings.filter(product => product?._id !== id);
                            setMyListings(filteredListings);
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your product has been deleted.",
                                icon: "success"
                            });
                        }
                    })

            }
        });

    }

    useEffect(() => {
        axios.get(`https://adoptyco-7rpf8q1b5-saad-ferozees-projects.vercel.app/listings/myListings/${user?.email}`)
            .then(response => {
                setMyListings(response.data);
                setLoading(false);
            })
    }, [user])

    return (
        <div className='max-w-[1200px] min-h-[65vh] mx-auto pt-[50px]'>
            <h1 className="mb-3 ml-2 lg:ml-0 flex items-center gap-3 text-2xl lg:text-4xl font-semibold text-[#556B2F]">
                <span className="w-3 h-10 bg-[#556B2F] rounded-full"></span>
                <span className="px-8 py-2 bg-[#f7f3e9e5] border-4 border-[#556B2F] rounded-full shadow flex flex-col">
                    <span className='text-xl'>My Listings</span>
                </span>
            </h1>
            <title>AdoptyCo | My Listings</title>
            <div className='mb-[50px] mx-2 lg:mx-0 w-auto p-3 lg:p-5 bg-[#556B2F] rounded-2xl shadow-2xl shadow-[#556B2F90] text-[#F7F3E9]'>
                {
                    loading ? (
                        <Loading viewHeight={40} color={'#F7F3E9'}></Loading>
                    ) : myListings.length < 1 ? (
                        <div className='min-h-[40vh] flex items-center justify-center'>
                            <h1 className='text-2xl'>Nothing to show, you haven't listed anything.</h1>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="table">
                                {/* head */}
                                <thead className='text-[#F7F3E9]'>
                                    <tr className=''>
                                        <th></th>
                                        <th>Product Name</th>
                                        <th>Description</th>
                                        <th>Price</th>
                                        <th>Date</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row 1 */}
                                    {
                                        myListings.map(product => (
                                            <tr key={product?._id} className=''>
                                                <td></td>
                                                <td>
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
                                                </td>
                                                <td className='w-[400px]'>
                                                    <p className='text-[14px]'>{product?.description}</p>
                                                </td>
                                                <td><p>{product?.price == 0 ? "Free" : `${product?.price}tk.`}</p></td>
                                                <td className='w-[150px]'><p>{product.date}</p></td>
                                                <th className='flex justify-end gap-2.5'>
                                                    <Link to={`/update-listing/${product?._id}`} className="px-4 pt-1.5 pb-1.75 rounded-full bg-[#F7F3E9] font-extralight text-[#556B2F] cursor-pointer">Edit</Link>
                                                    <button type='button' onClick={() => handleDelete(product?._id)} className="px-4 pt-1.5 pb-1.75 rounded-full bg-[#F7F3E9] font-extralight text-[#ff0000] cursor-pointer">Delete</button>
                                                </th>
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

export default MyListings;