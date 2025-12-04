import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import AuthContext from '../Contexts/AuthContext';
import { FcGoogle } from 'react-icons/fc';
import Swal from 'sweetalert2';

const Register = () => {

    const { setUser, signUp, loginWithGoogle, updateUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [passError, setPassError] = useState('');

    const passCheck = pass => {
        const lowercaseRegex = /^(?=.*[a-z]).+$/
        const uppercaseRegex = /^(?=.*[A-Z]).+$/
        const min6numRegex = /^.{6,}$/;

        if (pass.length > 3) {
            if (!lowercaseRegex.test(pass)) {
                setPassError('Password should have minimum 1 character in Lowercase.')
                return
            } else if (!uppercaseRegex.test(pass)) {
                setPassError('Password should have minimum 1 character in Uppercase')
                return
            } else if (!min6numRegex.test(pass)) {
                setPassError('Password should be minimum 6 character in length.')
                return
            } else {
                setPassError('');
            }
        } else {
            setPassError('');
        }
    }
    const handleRegister = e => {
        e.preventDefault();

        const form = e.target;
        const name = form.name.value;
        const photoURL = form.photoURL.value;
        const email = form.email.value;
        const password = form.password.value;

        if (passError || password.length <= 3) {
            setPassError('Please set a secure password to keep your profile protected.');
            Swal.fire({
                title: "Password is not secure!!",
                text: "Please set a secure password to keep your account protected, and have a tensionless sleep every night.",
                icon: "warning"
            });

            return
        }

        signUp(email, password)
            .then(credential => {
                setUser(credential.user);
                updateUser(name, photoURL)
                    .then(res => console.log(res))
                    .catch(error => console.log(error));
                Swal.fire({
                    title: "User Registration Successful.",
                    text: "Now you can surf this website freely, anything sell or buy, any pet you adopt or list for adopt.",
                    icon: "success"
                });
                navigate('/');
            }).catch(error => {
                console.log(error);
                Swal.fire({
                    title: "Something went wrong!!",
                    text: `${error.message}`,
                    icon: "error"
                });
                
            });
        }
        const handleGoogleLogin = () => {
            loginWithGoogle()
            .then(credential => {
                setUser(credential.user);
                Swal.fire({
                    title: "User Registration Successful.",
                    text: "You can surf this website freely, anything you sell or buy, any pet you adopt or list for adopt.",
                    icon: "success"
                });
                navigate('/');
            }).catch(error => {
                console.log(error);
                Swal.fire({
                    title: "Something went wrong!!",
                    text: `${error.message}`,
                    icon: "error"
                });
            });
    }

    return (
        <div>
            <title>AdoptyCo | Register</title>
            <div className='w-full py-[200px]'>
                <div className='max-w-[500px] mx-auto'>
                    <form onSubmit={handleRegister} className='w-full px-2'>
                        <fieldset className="fieldset w-full bg-[#556B2F] border-none shadow-2xl shadow-[#00000070] rounded-3xl border p-6 sm:p-10">
                            <h2 className='pl-2 text-2xl text-[#F7F3E9]'>Register</h2>

                            {/* <label className="label">Name</label> */}
                            <input type="text" name='name' className="input px-6 w-full rounded-full" placeholder="Name" />

                            {/* <label className="label">PhotoURL</label> */}
                            <input type="text" name='photoURL' className="input px-6 w-full rounded-full" placeholder="PhotoURL" />

                            {/* <label className="label">Email</label> */}
                            <input type="email" name='email' className="input px-6 w-full rounded-full" placeholder="Email" />

                            {/* <label className="label">Password</label> */}
                            <input
                                type="password"
                                name='password'
                                onChange={(e) => passCheck(e.target.value)}
                                className="input px-6 w-full rounded-full"
                                placeholder="Password"
                            />

                            {
                                passError && <p className='mt-0 font-light text-[#F7F3E9] text-[11px] text-center text-shadow-sm text-shadow-[#ff000030]'>{passError}</p>
                            }

                            <div className='flex flex-col'>
                                <button
                                    type='submit'
                                    className="btn mt-2 bg-[#F7F3E9] shadow-[#F7F3E9] border-transparent rounded-full text-[#556B2F]"
                                >Register</button>
                                <button
                                    type='button'
                                    onClick={handleGoogleLogin}
                                    className="btn mt-2 bg-[#F7F3E9] shadow-[#F7F3E9] border-transparent rounded-full text-[#556B2F]"
                                ><FcGoogle className='text-xl' /> Register with Google</button>
                            </div>

                            <p className='pl-2 text-xs text-[#F7F3E9]'>
                                <span>Already have an account? Please </span>
                                <Link to={'/login'} className='link'>LogIn</Link>
                            </p>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;