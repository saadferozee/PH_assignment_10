import React from 'react';
import Headline from '../Elements/Headline';

// PetHeroes.jsx

const heroes = [
    {
        id: 1,
        name: "Sarah",
        role: "Pet Adopter",
        image: "https://i.postimg.cc/mZXMf3T2/imgi_120_beautiful_teen_girl_hugging_her_new_pet_adopted_friend_dog_rescue_shelter_homeless_v_168869.jpg",
        description: "Rescued a neglected Golden Retriever and transformed its life with dedicated care.She regularly inspires others to adopt responsibly and treat every pet with compassion."
    },
    {
        id: 2,
        name: "Rafi",
        role: "Pet Caregiver",
        image: "https://i.postimg.cc/FHJ0xf5h/imgi-124-man-embracing-his-dog-new-pet-spaniel-rescue-pound-35906035.jpg",
        description: "Provides shelter and daily care to abandoned pets, ensuring they regain trust and health. He actively helps match rescued animals with kind, permanent homes."
    },
    {
        id: 3,
        name: "Helena",
        role: "Community Volunteer",
        image: "https://i.postimg.cc/Gh4DcBpn/imgi_175_side_view_woman_with_fluffy_black_dog_outdoors_23_2148683014.jpg",
        description: "Supports local shelters by arranging medical treatment, food, and rescue operations. Her continuous volunteer work ensures countless stray animals receive proper care."
    },
    {
        id: 4,
        name: "Masfia",
        role: "Pet Welfare Activist",
        image: "https://i.postimg.cc/3rSp5j3Q/imgi_163_happy_caring_young_girl_holding_600nw_2293716099.jpg",
        description: "Advocates for ethical pet ownership through workshops and community outreach. He works to raise awareness and encourage adoption over commercial purchasing."
    },
];

const PetHeroSection = () => {
    return (
        <div className='max-w-[1200px] mx-auto'>
            <section className="pb-22">
                <div className="container mx-auto px-4">
                    {/* <h2 className="text-3xl font-bold text-center mb-4">Meet Our Pet Heroes</h2>
                <p className="text-center text-gray-600 mb-10">
                    These amazing individuals have opened their hearts to rescued pets and helped build a compassionate community.
                </p> */}
                    <Headline typo={'Meet Our Pet Heroes'}></Headline>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {
                            heroes.map((hero) => (
                                <div
                                    key={hero.id}
                                    className="bg-[#556B2F] rounded-xl shadow-md p-6 text-center hover:shadow-lg transition"
                                >
                                    <div className='flex justify-between items-center gap-2.5'>
                                        <img
                                            src={hero.image}
                                            alt={hero.name}
                                            className="w-24 h-24 object-cover rounded-md"
                                        />
                                        <div className='w-full mt-auto flex flex-col gap-1 justify-end items-end'>
                                            <h3 className="text-xl font-semibold text-[#F7F3E9]">{hero.name}</h3>
                                            <p className="text-right text-xs text-[#F7F3E9] font-medium">{hero.role}</p>
                                            <hr className='border w-full text-[#F7F3E9]' />
                                        </div>
                                    </div>
                                    <p className="0 mt-3 text-xs text-[#F7F3E9] text-justify">{hero.description}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>
        </div>
    );
};


export default PetHeroSection;