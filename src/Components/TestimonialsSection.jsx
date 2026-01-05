import { useState, useEffect } from 'react';
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Headline from '../Elements/Headline';

const TestimonialsSection = () => {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    const testimonials = [
        {
            id: 1,
            name: "Sarah Ahmed",
            location: "Dhaka, Bangladesh",
            rating: 5,
            text: "AdoptyCo helped me find my perfect companion, Luna! The process was smooth and the team was incredibly supportive throughout the adoption journey.",
            petName: "Luna",
            petType: "Golden Retriever",
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
        },
        {
            id: 2,
            name: "Mohammad Rahman",
            location: "Chittagong, Bangladesh",
            rating: 5,
            text: "I was amazed by the variety of pets available and the detailed information provided. Found my cat Mimi within a week!",
            petName: "Mimi",
            petType: "Persian Cat",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
        },
        {
            id: 3,
            name: "Fatima Khan",
            location: "Sylhet, Bangladesh",
            rating: 5,
            text: "The platform is user-friendly and the support team is fantastic. They guided me through every step of adopting my rabbit, Snowball.",
            petName: "Snowball",
            petType: "Holland Lop Rabbit",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
        },
        {
            id: 4,
            name: "Arif Hassan",
            location: "Rajshahi, Bangladesh",
            rating: 5,
            text: "AdoptyCo made my dream of having a pet come true. The verification process gave me confidence that I was getting a healthy, well-cared-for pet.",
            petName: "Buddy",
            petType: "Labrador Mix",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [testimonials.length]);

    const nextTestimonial = () => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const current = testimonials[currentTestimonial];

    return (
        <div className="py-14">
            <div className="max-w-[1200px] mx-auto lg:mx-5 xl:mx-auto px-4">
                <Headline typo={'What Our Users Say'} />

                <div className="relative bg-[#556B2F] border-2 border-[#F7F3E9] rounded-xl p-8 text-[#F7F3E9] shadow-lg">
                    {/* Quote Icon */}
                    <div className="absolute top-6 left-6">
                        <FaQuoteLeft className="text-3xl opacity-20" />
                    </div>

                    {/* Navigation Buttons */}
                    <button
                        onClick={prevTestimonial}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[#F7F3E9] text-[#556B2F] p-2 rounded-full hover:bg-[#9ACD32] hover:text-white transition-colors z-10"
                    >
                        <FaChevronLeft />
                    </button>
                    <button
                        onClick={nextTestimonial}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#F7F3E9] text-[#556B2F] p-2 rounded-full hover:bg-[#9ACD32] hover:text-white transition-colors z-10"
                    >
                        <FaChevronRight />
                    </button>

                    <div className="text-center">
                        {/* User Image */}
                        <div className="mb-6">
                            <img
                                src={current.image}
                                alt={current.name}
                                className="w-20 h-20 rounded-full mx-auto border-4 border-[#F7F3E9] shadow-lg"
                            />
                        </div>

                        {/* Rating */}
                        <div className="flex justify-center mb-4">
                            {[...Array(current.rating)].map((_, i) => (
                                <FaStar key={i} className="text-[#9ACD32] text-xl" />
                            ))}
                        </div>

                        {/* Testimonial Text */}
                        <blockquote className="text-xl font-light italic leading-relaxed mb-6 opacity-90">
                            "{current.text}"
                        </blockquote>

                        {/* User Info */}
                        <div className="mb-4">
                            <h4 className="text-xl font-bold font-caveat text-shadow-lg">
                                {current.name}
                            </h4>
                            <p className="text-sm font-light opacity-80">
                                {current.location}
                            </p>
                        </div>

                        {/* Pet Info */}
                        <div className="inline-flex items-center gap-2 bg-[#F7F3E9] text-[#556B2F] px-4 py-2 rounded-full border-2 border-[#F7F3E9]">
                            <span className="text-sm font-medium">
                                Adopted {current.petName} • {current.petType}
                            </span>
                        </div>
                    </div>

                    {/* Dots Indicator */}
                    <div className="flex justify-center mt-8 space-x-2">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentTestimonial(index)}
                                className={`w-3 h-3 rounded-full transition-colors ${
                                    index === currentTestimonial
                                        ? 'bg-[#F7F3E9]'
                                        : 'bg-[#F7F3E9] opacity-30'
                                }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Call to Action */}
                <div className="text-center mt-8">
                    <p className="text-lg text-gray-600 mb-6 font-light">
                        Ready to write your own success story?
                    </p>
                    <button className="bg-[#556B2F] text-[#F7F3E9] border-2 border-[#556B2F] px-8 py-3 rounded-full hover:bg-[#F7F3E9] hover:text-[#556B2F] transition-colors font-semibold font-caveat text-lg">
                        Start Your Journey
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TestimonialsSection;