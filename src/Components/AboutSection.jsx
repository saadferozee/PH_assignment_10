import React from 'react';
import Headline from '../Elements/Headline';

const AboutSection = () => {
    return (
        <div className='max-w-[1200px] mx-auto'>
            <section className="py-16">
                <div className="container mx-auto px-4 lg:px-0">
                    <Headline typo={'Why Adopt from AdoptyCo ?'}></Headline>
                    {/* <p className="text-center text-gray-600 mb-10">
                        Giving a home to a pet is giving them love, care, and a second chance at life. Here's why adopting from PawMart is the best choice.
                    </p> */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="bg-[#F7F3E9] py-6 p-4 flex flex-col justify-between rounded-lg border border-[#556B2F80] shadow-2xl text-center">
                            <img src="https://i.postimg.cc/Sx0Kd6Pr/imgi-102-a-cat-walking-through-the-jungle-photo.jpg" alt="Rescue" className="mx-auto mb-4 w-full h-20 object-cover border border-[#556B2F70] rounded-md" />
                            <div>
                                <h3 className="font-semibold text-xl text-[#556B2F] mb-2">Rescue & Care</h3>
                                <p className='font-light text-[14px] text-[#556B2F]'>Every pet listed on PawMart has a story. By adopting, you rescue them and provide a loving home.</p>
                            </div>
                        </div>
                        <div className="bg-[#F7F3E9] py-6 p-4 flex flex-col justify-between rounded-lg border border-[#556B2F80] shadow-2xl text-center">
                            <img src="https://i.postimg.cc/dQy3yNHQ/imgi-162-Saligrama-Raid-Photo-1.png" alt="Verified" className="mx-auto mb-4 w-full h-20 object-cover border border-[#556B2F70] rounded-md" />
                            <div>
                                <h3 className="font-semibold text-xl text-[#556B2F] mb-2">Community Verified Listings</h3>
                                <p className='font-light text-[14px] text-[#556B2F]'>All pets and products are listed by verified owners, breeders, or shops. Trust their authenticity.</p>
                            </div>
                        </div>
                        <div className="bg-[#F7F3E9] py-6 p-4 flex flex-col justify-between rounded-lg border border-[#556B2F80] shadow-2xl text-center">
                            <img src="https://i.postimg.cc/3RbGxyxP/vety-person-holding-cat-for-adoption-at-shelter.avif" alt="Affordable" className="mx-auto mb-4 w-full h-20 object-cover border border-[#556B2F70] rounded-md" />
                            <div>
                                <h3 className="font-semibold text-xl text-[#556B2F] mb-2">No Cost Adoption</h3>
                                <p className='font-light text-[14px] text-[#556B2F]'>Adopting is either free or low-cost. We encourage responsible adoption with care guidelines.</p>
                            </div>
                        </div>
                        <div className="bg-[#F7F3E9] py-6 p-4 flex flex-col justify-between rounded-lg border border-[#556B2F80] shadow-2xl text-center">
                            <img src="https://i.postimg.cc/yYpm8bkD/imgi-220-Get-Paid-Stock-com-681c971b40752-1600x900.jpg" alt="Support" className="mx-auto mb-4 w-full h-20 object-cover border border-[#556B2F70] rounded-md" />
                            <div>
                                <h3 className="font-semibold text-xl text-[#556B2F] mb-2">Support & Guidance</h3>
                                <p className='font-light text-[14px] text-[#556B2F]'>Our community guides new pet owners with feeding tips and healthcare advice to keep pets happy.</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end text-center mt-5">
                        <a href="/listings/pet" className="md:w-[400px] px-3 pt-1.5 pb-1.75 border border-[#F7F3E9] rounded-full bg-[#556b2fe0] hover:bg-[#556B2F] text-center text-[#F7F3E9] cursor-pointer transition">View Available Pets for Adoption</a>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default AboutSection;