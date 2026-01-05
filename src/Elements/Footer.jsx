import React from 'react';
import { FaFacebookSquare, FaInstagramSquare, FaHeart, FaPaw } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

const Footer = () => {
    return (
        <div className='bg-[#556B2F] text-[#F7F3E9]'>
            <footer className="max-w-[1200px] mx-auto px-4 py-8">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* Company Info */}
                    <div className="text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                            <img
                                width="50"
                                height="50"
                                src='/Cat-logo.png'
                                alt="AdoptyCo Logo"
                                className="rounded-lg"
                            />
                            <div>
                                <h3 className="font-caveat text-2xl font-bold">AdoptyCo</h3>
                                <p className="text-xs opacity-80">Pet Adoption Platform</p>
                            </div>
                        </div>
                        <p className='font-light text-sm opacity-90 leading-relaxed'>
                            Connects local pet owners and buyers for adoption and pet care products. 
                            Making pet adoption easier, one family at a time.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="text-center md:text-left">
                        <h4 className="font-semibold text-lg mb-4 flex items-center justify-center md:justify-start gap-2">
                            <FaPaw className="text-[#F7F3E9]" />
                            Quick Links
                        </h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href='/' className="hover:text-[#9ACD32] transition-colors">Home</a></li>
                            <li><a href='/listings/pet' className="hover:text-[#9ACD32] transition-colors">Pet Adoption</a></li>
                            <li><a href='/listings/pet-food' className="hover:text-[#9ACD32] transition-colors">Pet Food</a></li>
                            <li><a href='/listings/accessories' className="hover:text-[#9ACD32] transition-colors">Accessories</a></li>
                            <li><a href='/add-listing' className="hover:text-[#9ACD32] transition-colors">List Your Pet</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="text-center md:text-left">
                        <h4 className="font-semibold text-lg mb-4 flex items-center justify-center md:justify-start gap-2">
                            <MdEmail className="text-[#F7F3E9]" />
                            Contact Us
                        </h4>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-center justify-center md:justify-start gap-2">
                                <MdEmail className="text-[#9ACD32]" />
                                <span>support@adoptyco.com</span>
                            </li>
                            <li className="flex items-center justify-center md:justify-start gap-2">
                                <MdPhone className="text-[#9ACD32]" />
                                <span>+880 1234-567890</span>
                            </li>
                            <li className="flex items-center justify-center md:justify-start gap-2">
                                <MdLocationOn className="text-[#9ACD32]" />
                                <span>Dhaka, Bangladesh</span>
                            </li>
                        </ul>
                    </div>

                    {/* Social & Newsletter */}
                    <div className="text-center md:text-left">
                        <h4 className="font-semibold text-lg mb-4 flex items-center justify-center md:justify-start gap-2">
                            <FaHeart className="text-red-400" />
                            Follow Us
                        </h4>
                        <div className="flex justify-center md:justify-start gap-4 mb-4">
                            <a href='https://facebook.com/saadferozee' 
                               className="text-3xl hover:text-[#9ACD32] transition-colors hover:scale-110 transform">
                                <FaFacebookSquare />
                            </a>
                            <a href='https://instagram.com/saad.ferozee' 
                               className="text-3xl hover:text-[#9ACD32] transition-colors hover:scale-110 transform">
                                <FaInstagramSquare />
                            </a>
                            <a href='https://x.com/saadferozee/' 
                               className="text-3xl hover:text-[#9ACD32] transition-colors hover:scale-110 transform">
                                <FaSquareXTwitter />
                            </a>
                        </div>
                        <p className="text-xs opacity-80 mb-2">Stay updated with our latest pets!</p>
                        <button className="bg-[#F7F3E9] text-[#556B2F] px-4 py-2 rounded-full text-sm font-medium hover:bg-[#9ACD32] hover:text-white transition-colors">
                            Subscribe Newsletter
                        </button>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-[#F7F3E9] border-opacity-20 pt-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm font-light">
                            <a href='/' className="hover:text-[#9ACD32] transition-colors">About</a>
                            <span className="opacity-50">•</span>
                            <a href='/' className="hover:text-[#9ACD32] transition-colors">Privacy Policy</a>
                            <span className="opacity-50">•</span>
                            <a href='/' className="hover:text-[#9ACD32] transition-colors">Terms and Conditions</a>
                            <span className="opacity-50">•</span>
                            <a href='/' className="hover:text-[#9ACD32] transition-colors">Support</a>
                        </div>
                        <p className='font-extralight text-xs opacity-60 text-center'>
                            Copyright © {new Date().getFullYear()} AdoptyCo - All rights reserved by Saad Ferozee
                        </p>
                    </div>
                </div>

                {/* Made with Love */}
                <div className="text-center mt-4 pt-4 border-t border-[#F7F3E9] border-opacity-10">
                    <p className="text-xs opacity-70 flex items-center justify-center gap-1">
                        Made with <FaHeart className="text-red-400 text-sm" /> for pet lovers everywhere
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Footer;