import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import AuthContext from '../Contexts/AuthContext';
import Swal from 'sweetalert2';

import { FcGoogle } from "react-icons/fc";

const Login = () => {

    const { setUser, logIn, loginWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogIn = e => {
        e.preventDefault();

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        logIn(email, password)
            .then(credential => {
                setUser(credential.user);
                Swal.fire({
                    title: "You are Logged In.",
                    text: "Now you can surf this website freely, anything sell or buy, any pet you adopt or list for adopt.",
                    icon: "success"
                });
                navigate(location.state ? location.state : '/');
            })
            .catch(error => {
                console.log(error);
                Swal.fire({
                    title: "Something went wrong!!",
                    text: `${error.message === 'Firebase: Error (auth/invalid-credential).' ? 'Invalid Password or User Email' : error.message}`,
                    icon: "error"
                });
            })
    }
    const handleGoogleLogin = () => {
        loginWithGoogle()
            .then(credential => {
                setUser(credential.user);
                Swal.fire({
                    title: "You are Logged In.",
                    text: "Now you can surf this website freely, anything sell or buy, any pet you adopt or list for adopt.",
                    icon: "success"
                });
                navigate(location.state ? location.state : '/');
            })
            .catch(error => {
                console.log(error);
                Swal.fire({
                    title: "Something went wrong!!",
                    text: `${error.message === 'Firebase: Error (auth/invalid-credential).' ? 'Invalid Password or User Email' : error.message}`,
                    icon: "error"
                });
            });
    }

    return (
        <div>
            <div className='w-full py-[200px]'>
                <div className='max-w-[500px] mx-auto'>
                    <form onSubmit={handleLogIn} className='w-full px-2'>
                        <fieldset className="fieldset w-full bg-[#556B2F] border-none shadow-2xl shadow-[#00000070] rounded-3xl border p-6 sm:p-10">
                            <h2 className='pl-2 text-2xl text-[#F7F3E9]'>Login</h2>

                            {/* <label className="label">Email</label> */}
                            <input type="email" name='email' className="input px-6 w-full rounded-full" placeholder="Email" />

                            {/* <label className="label">Password</label> */}
                            <input type="password" name='password' className="input px-6 w-full rounded-full" placeholder="Password" />

                            <div className='flex flex-col'>
                                <button
                                    type='submit'
                                    className="btn mt-2 bg-[#F7F3E9] shadow-[#F7F3E9] border-transparent rounded-full text-[#556B2F]"
                                >Login</button>
                                <button
                                    type='button'
                                    onClick={handleGoogleLogin}
                                    className="btn mt-2 bg-[#F7F3E9] shadow-[#F7F3E9] border-transparent rounded-full text-[#556B2F]"
                                ><FcGoogle className='text-xl' /> Login with Google</button>
                            </div>

                            <p className='pl-2 text-xs text-[#F7F3E9]'>
                                <span>Do not have an account? Please </span>
                                <Link to={'/register'} className='link'>Register</Link>
                            </p>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;