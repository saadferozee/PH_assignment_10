import { useState } from 'react';
import { FaEnvelope, FaPaw, FaCheck } from 'react-icons/fa';

const NewsletterSection = () => {
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return;

        setIsLoading(true);
        
        // Simulate API call
        setTimeout(() => {
            setIsSubscribed(true);
            setIsLoading(false);
            setEmail('');
        }, 1500);
    };

    if (isSubscribed) {
        return (
            <div className="py-14 bg-[#556B2F]">
                <div className="max-w-[1200px] mx-auto lg:mx-5 xl:mx-auto px-4">
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-[#F7F3E9] rounded-full mb-6">
                            <FaCheck className="text-2xl text-[#556B2F]" />
                        </div>
                        <h2 className="text-3xl font-bold font-caveat text-[#F7F3E9] mb-4 text-shadow-lg">
                            Thank You for Subscribing!
                        </h2>
                        <p className="text-lg text-[#F7F3E9] opacity-90 mb-8 font-light">
                            You'll receive the latest updates about adorable pets looking for homes, adoption tips, and special offers.
                        </p>
                        <button
                            onClick={() => setIsSubscribed(false)}
                            className="bg-[#F7F3E9] text-[#556B2F] border-2 border-[#F7F3E9] px-6 py-3 rounded-full hover:bg-transparent hover:text-[#F7F3E9] transition-colors font-semibold font-caveat text-lg"
                        >
                            Subscribe Another Email
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="py-14 bg-[#556B2F]">
            <div className="max-w-[1200px] mx-auto lg:mx-5 xl:mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    {/* Left Content */}
                    <div className="text-[#F7F3E9] text-center lg:text-left">
                        <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                            <FaPaw className="text-3xl" />
                            <h2 className="text-4xl font-bold font-caveat text-shadow-lg">
                                Stay Updated
                            </h2>
                        </div>
                        <p className="text-lg opacity-90 mb-6 leading-relaxed font-light">
                            Get the latest updates on new pets available for adoption, success stories, 
                            and helpful tips for pet care directly in your inbox.
                        </p>
                        
                        <div className="space-y-3">
                            <div className="flex items-center justify-center lg:justify-start gap-3">
                                <div className="w-2 h-2 bg-[#F7F3E9] rounded-full"></div>
                                <span className="opacity-90 font-light">Weekly pet highlights</span>
                            </div>
                            <div className="flex items-center justify-center lg:justify-start gap-3">
                                <div className="w-2 h-2 bg-[#F7F3E9] rounded-full"></div>
                                <span className="opacity-90 font-light">Adoption success stories</span>
                            </div>
                            <div className="flex items-center justify-center lg:justify-start gap-3">
                                <div className="w-2 h-2 bg-[#F7F3E9] rounded-full"></div>
                                <span className="opacity-90 font-light">Pet care tips and guides</span>
                            </div>
                            <div className="flex items-center justify-center lg:justify-start gap-3">
                                <div className="w-2 h-2 bg-[#F7F3E9] rounded-full"></div>
                                <span className="opacity-90 font-light">Special adoption events</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Form */}
                    <div className="bg-[#F7F3E9] border-2 border-[#F7F3E9] rounded-xl p-8 shadow-lg">
                        <div className="text-center mb-6">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#556B2F] rounded-full mb-4">
                                <FaEnvelope className="text-2xl text-[#F7F3E9]" />
                            </div>
                            <h3 className="text-2xl font-bold font-caveat text-[#556B2F] mb-2">
                                Join Our Newsletter
                            </h3>
                            <p className="text-[#556B2F] opacity-80 font-light">
                                Be the first to know about new pets and adoption opportunities
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-[#556B2F] mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email address"
                                    className="w-full px-4 py-3 border-2 border-[#556B2F] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9ACD32] focus:border-[#9ACD32]"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-[#556B2F] text-[#F7F3E9] border-2 border-[#556B2F] py-3 rounded-lg hover:bg-transparent hover:text-[#556B2F] transition-colors font-semibold font-caveat text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                                        Subscribing...
                                    </>
                                ) : (
                                    <>
                                        <FaEnvelope />
                                        Subscribe Now
                                    </>
                                )}
                            </button>

                            <p className="text-xs text-[#556B2F] opacity-70 text-center font-light">
                                We respect your privacy. Unsubscribe at any time.
                            </p>
                        </form>

                        {/* Trust Indicators */}
                        <div className="mt-6 pt-6 border-t border-[#556B2F] border-opacity-20">
                            <div className="flex items-center justify-center gap-6 text-sm text-[#556B2F] opacity-80 font-light">
                                <span>✓ No spam</span>
                                <span>✓ Weekly updates</span>
                                <span>✓ Easy unsubscribe</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsletterSection;