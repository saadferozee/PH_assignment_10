import React, { useContext, useState } from 'react';
import AuthContext from '../Contexts/AuthContext';
import axios, { AxiosError } from 'axios';

const AddListing = () => {

    const { user } = useContext(AuthContext);
    const [isPet, setIsPet] = useState(false);

    const handleAddListing = e => {
        e.preventDefault();

        const form = e.target;
        const name = form.name.value;
        const category = form.category.value;
        const price = parseInt(form.price.value);
        const location = form.location.value;
        const description = form.description.value;
        const photoURL = form.photoURL.value;
        const date = form.date.value;
        const email = form.email.value;

        const data = { name, category, price, location, description, photoURL, date, email }

        axios.post('http://localhost:3568/listings', data)
            .then(response => {
                if (response.status == 200) {
                    form.reset();
                    // sweet alert
                }
            });
    }

    return (
        <div>
            <div className='w-full py-[100px]'>
                <div className='max-w-[700px] mx-auto'>
                    <form onSubmit={handleAddListing} className='w-full px-2'>
                        <fieldset className="fieldset w-full bg-[#556B2F] border-none shadow-2xl shadow-[#00000070] rounded-3xl border p-6 sm:p-10">
                            <h2 className='pl-2 text-2xl text-[#F7F3E9]'>Listing for Selling or Adoption</h2>

                            {/* <label className="label">Name</label> */}
                            <input type="text" name='name' className="input px-6 w-full rounded-full" placeholder="Product or Pet Name" />

                            <select
                                name='category'
                                onChange={(e) => e.target.value === 'pet' ? setIsPet(true) : setIsPet(false)}
                                defaultValue="Select a Category"
                                className="select w-full px-6 rounded-full"
                            >
                                <option disabled={true}>Select a Category</option>
                                <option value='pet'>Pet</option>
                                <option value='pet-food'>Pet Food</option>
                                <option value='accessories'>Accessories</option>
                                <option value='care-products'>Care Products</option>
                            </select>

                            {/* <label className="label">Price</label> */}
                            <input
                                type="number"
                                name='price'
                                className="input px-6 w-full rounded-full"
                                defaultValue={isPet ? 0 : undefined}
                                disabled={isPet && true}
                                placeholder="Price" />

                            {/* <label className="label">Location</label> */}
                            <input type="text" name='location' className="input px-6 w-full rounded-full" placeholder="Location" />

                            {/* <label className="label">Location</label> */}
                            <textarea type="text" name='description' className="textarea px-6 w-full rounded-3xl" placeholder="Description" />

                            {/* <label className="label">PhotoURL</label> */}
                            <input type="text" name='photoURL' className="input px-6 w-full rounded-full" placeholder="PhotoURL" />

                            {/* <label className="label">Date</label> */}
                            <input type="date" name='date' className="input px-6 w-full rounded-full" placeholder="Date" />

                            {/* <label className="label">Email</label> */}
                            <input
                                disabled
                                type="email"
                                name='email'
                                className="input px-6 w-full rounded-full"
                                defaultValue={user.email}
                                placeholder="Email" />

                            <button
                                type='submit'
                                className="btn mt-2 bg-[#F7F3E9] shadow-[#F7F3E9] border-transparent rounded-full text-[#556B2F]"
                            >Confirm Listing</button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddListing;