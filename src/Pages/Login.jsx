import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import AuthContext from '../Contexts/AuthContext';
import Swal from 'sweetalert2';

import { FcGoogle } from "react-icons/fc";

const Login = () => {

    const { setUser, logIn, loginWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const fillCredential = type => {
        const form = document.getElementById('login-fieldset');
        const email = form.childNodes[1];
        const password = form.childNodes[2].childNodes[0];
        if (type === 'admin') {
            email.value = 'admin@testing.com';
            password.value = 'VerySecurePassword';
        } else if (type === 'user') {
            email.value = 'user@testing.com';
            password.value = 'VerySecurePassword';
        } else {
            return;
        }
    }
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
            <title>AdoptyCo | Login</title>
            <div className='w-full py-[60px]'>
                <div className='max-w-[500px] mx-auto'>
                    <form onSubmit={handleLogIn} className='w-full px-6'>
                        <fieldset id='login-fieldset' className="fieldset w-full bg-[#556B2F] border-none shadow-2xl shadow-[#00000070] rounded-3xl border p-6 sm:p-10">
                            <h2 className='pl-2 text-5xl font-caveat text-[#F7F3E9]'>Login</h2>

                            {/* <label className="label">Email</label> */}
                            <input type="email" name='email' className="input px-6 w-full rounded-full" placeholder="Email" />

                            {/* <label className="label">Password</label> */}
                            <div>
                                <input type="password" name='password' className="input px-6 w-full rounded-full" placeholder="Password" />
                                <p className='pl-2 text-white'>Testing demo as <span onClick={() => fillCredential('admin')} className='link'>Admin</span> or <span onClick={() => fillCredential('user')} className='link'>User</span></p>
                            </div>

                            <div className='flex flex-col'>
                                <button
                                    type='submit'
                                    className="btn mt-2 bg-[#F7F3E9] shadow-[#F7F3E9] border-transparent rounded-full text-[#556B2F]"
                                >Login</button>
                                <div className='w-full my-2 px-2 text-white flex items-center gap-2'>
                                    <hr className='w-full'/>
                                    <span>or</span>
                                    <hr className='w-full'/>
                                </div>
                                <button
                                    type='button'
                                    onClick={handleGoogleLogin}
                                    className="btn bg-[#F7F3E9] shadow-[#F7F3E9] border-transparent rounded-full text-[#556B2F]"
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