import { FaShieldAlt, FaHeart, FaSearch, FaHandshake, FaPhone, FaCertificate } from 'react-icons/fa';
import { MdVerified, MdSupport } from 'react-icons/md';
import Headline from '../Elements/Headline';

const FeaturesSection = () => {
    const features = [
        {
            icon: <FaShieldAlt className="text-3xl" />,
            title: "Verified Listings",
            description: "All pets and sellers are thoroughly verified to ensure authenticity and safety for adopters."
        },
        {
            icon: <FaHeart className="text-3xl" />,
            title: "Health Guaranteed",
            description: "Every pet comes with health certificates and vaccination records for your peace of mind."
        },
        {
            icon: <FaSearch className="text-3xl" />,
            title: "Smart Matching",
            description: "Our advanced search helps you find the perfect pet based on your lifestyle and preferences."
        },
        {
            icon: <MdSupport className="text-3xl" />,
            title: "24/7 Support",
            description: "Our dedicated support team is available round the clock to assist you with any queries."
        },
        {
            icon: <FaHandshake className="text-3xl" />,
            title: "Safe Transactions",
            description: "Secure payment processing and escrow services to protect both buyers and sellers."
        },
        {
            icon: <MdVerified className="text-3xl" />,
            title: "Quality Assurance",
            description: "Every adoption goes through our quality check process to ensure the best outcomes."
        }
    ];

    return (
        <div className="py-14 bg-[#556B2F35]">
            <div className="max-w-[1200px] mx-auto lg:mx-5 xl:mx-auto px-4">
                <Headline typo={'Why Choose AdoptyCo?'} />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-[#556B2F] border-2 border-[#F7F3E9] p-4 rounded-xl text-[#F7F3E9] hover:scale-105 transition-transform duration-300 shadow-lg"
                        >
                            <div className="flex justify-center mb-3 opacity-80">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold font-caveat text-center mb-3 text-shadow-lg">
                                {feature.title}
                            </h3>
                            <p className="text-sm font-light opacity-90 text-center leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Trust Indicators */}
                <div className="mt-8 bg-[#556B2F] border-2 border-[#F7F3E9] rounded-xl p-6 text-[#F7F3E9] shadow-lg">
                    <div className="text-center mb-6">
                        <h3 className="text-2xl font-bold font-caveat text-shadow-lg mb-2">
                            Trusted by Pet Lovers Nationwide
                        </h3>
                        <p className="text-sm font-light opacity-90">
                            Our commitment to excellence has earned us recognition and trust
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="flex justify-center mb-3">
                                <FaCertificate className="text-3xl opacity-80" />
                            </div>
                            <h4 className="font-semibold font-caveat text-lg mb-2">
                                Certified Platform
                            </h4>
                            <p className="text-xs font-light opacity-80">
                                Licensed and regulated pet adoption platform
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="flex justify-center mb-3">
                                <FaPhone className="text-3xl opacity-80" />
                            </div>
                            <h4 className="font-semibold font-caveat text-lg mb-2">
                                Emergency Support
                            </h4>
                            <p className="text-xs font-light opacity-80">
                                24/7 emergency helpline for urgent situations
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="flex justify-center mb-3">
                                <MdVerified className="text-3xl opacity-80" />
                            </div>
                            <h4 className="font-semibold font-caveat text-lg mb-2">
                                100% Verified
                            </h4>
                            <p className="text-xs font-light opacity-80">
                                All listings undergo strict verification process
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeaturesSection;