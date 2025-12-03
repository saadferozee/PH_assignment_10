import React from 'react';
import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";



const Footer = () => {
    return (
        <div className='bg-[#556B2F] text-[#F7F3E9] py-1'>
            <footer className="footer footer-horizontal footer-center p-4">
                <aside>
                    <img
                        width="50"
                        height="50"
                        src='/Cat-logo.png'
                    >
                    </img>
                    <p>
                        <span className="font-light text-2xl">AdoptyCo</span>
                        <br />
                        <span className='font-light text-sm'>Connects local pet owners and buyers for adoption and pet care products.</span>
                    </p>
                    <div className="grid grid-flow-col gap-4">
                        <a href='https://facebook.com/saadferozee'>
                            <FaFacebookSquare className='text-3xl' />
                        </a>
                        <a href='https://instagram.com/saad.ferozee'>
                            <FaInstagramSquare className='text-3xl' />
                        </a>
                        <a href='https://x.com/saadferozee/'>
                            <FaSquareXTwitter className='text-3xl' />
                        </a>
                    </div>
                </aside>
                <nav>
                    <div className="grid grid-flow-col gap-4 text-sm font-light">
                        <a href='/'>About</a>
                        <a href='/'>Privacy Policy</a>
                        <a href='/'>Terms and Conditions</a>
                    </div>
                </nav>
                <p className='font-extralight text-xs opacity-60'>Copyright © {new Date().getFullYear()} - All right reserved by Saad Ferozee</p>
            </footer>
        </div>
    );
};

export default Footer;