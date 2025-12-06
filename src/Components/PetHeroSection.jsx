import React from 'react';
import Headline from '../Elements/Headline';

// PetHeroes.jsx

const heroes = [
    {
        id: 1,
        name: "Sarah Ahmed",
        role: "Pet Adopter",
        image: "https://i.ibb.co/2kT0kBq/woman1.jpg",
        description: "Rescued a neglected Golden Retriever and transformed its life with dedicated care.She regularly inspires others to adopt responsibly and treat every pet with compassion."
    },
    {
        id: 2,
        name: "Rafiul Hasan",
        role: "Pet Caregiver",
        image: "https://i.ibb.co/Tqf3Jwq/man2.jpg",
        description: "Provides shelter and daily care to abandoned pets, ensuring they regain trust and health. He actively helps match rescued animals with kind, permanent homes."
    },
    {
        id: 3,
        name: "Nusrat Jahan",
        role: "Community Volunteer",
        image: "https://i.ibb.co/5GzXkwq/woman2.jpg",
        description: "Supports local shelters by arranging medical treatment, food, and rescue operations. Her continuous volunteer work ensures countless stray animals receive proper care."
    },
    {
        id: 4,
        name: "Imran Chowdhury",
        role: "Pet Welfare Activist",
        image: "https://i.ibb.co/N1m07JV/man3.jpg",
        description: "Advocates for ethical pet ownership through workshops and community outreach. He works to raise awareness and encourage adoption over commercial purchasing."
    },
];

const PetHeroSection = () => {
    return (
        <div className='max-w-[1200px] mx-auto'>
            <section className="py-16">
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
                                    className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition"
                                >
                                    <img
                                        src={hero.image}
                                        alt={hero.name}
                                        className="w-24 h-24 object-cover rounded-full mx-auto mb-4 border-2 border-blue-500"
                                    />
                                    <h3 className="text-xl font-semibold">{hero.name}</h3>
                                    <p className="text-sm text-blue-600 font-medium">{hero.role}</p>
                                    <p className="text-gray-600 mt-3 text-sm">{hero.description}</p>
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