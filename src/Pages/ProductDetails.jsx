import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router';
import { TbCoinTaka } from "react-icons/tb";
import { FaHeart, FaShare, FaMapMarkerAlt, FaEnvelope, FaCalendar, FaPaw, FaShieldAlt, FaStar, FaArrowLeft } from 'react-icons/fa';
import { MdPets, MdVerified, MdLocalShipping } from 'react-icons/md';
import Loading from './Loading';
import AuthContext from '../Contexts/AuthContext';

const ProductDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [isPet, setIsPet] = useState(false);
    const [isFavorited, setIsFavorited] = useState(false);

    useEffect(() => {
        axios.get(`https://adoptyco.vercel.app/listings/product/${id}`)
            .then(response => {
                setProduct(response.data);
                setLoading(false);
                setIsPet(response.data.category === 'pet' ? true : false);
            })
            .catch(error => console.log(error))
    }, [id])

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: product.name,
                text: `Check out this ${isPet ? 'adorable pet' : 'product'} on AdoptyCo!`,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    const getCategoryIcon = (category) => {
        switch (category) {
            case 'pet': return <MdPets className="text-2xl" />;
            case 'pet-food': return <FaPaw className="text-2xl" />;
            case 'accessories': return <FaShieldAlt className="text-2xl" />;
            case 'care-products': return <MdVerified className="text-2xl" />;
            default: return <MdPets className="text-2xl" />;
        }
    };

    const getCategoryName = (category) => {
        switch (category) {
            case 'pet': return 'Pet Adoption';
            case 'pet-food': return 'Pet Food';
            case 'accessories': return 'Pet Accessories';
            case 'care-products': return 'Pet Care Products';
            default: return category;
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loading viewHeight={60} color={'#556B2F'} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#F7F3E9] to-white">
            <title>AdoptyCo | {product?.name}</title>
            
            {/* Header with Back Button */}
            <div className="bg-[#556B2F] text-[#F7F3E9] py-4">
                <div className="max-w-[1200px] mx-auto px-4 flex items-center gap-4">
                    <Link to="/listings" className="flex items-center gap-2 hover:bg-[#6B8E23] px-3 py-2 rounded-lg transition-colors">
                        <FaArrowLeft />
                        <span className="hidden md:inline">Back to Listings</span>
                    </Link>
                    <div className="flex items-center gap-2">
                        {getCategoryIcon(product?.category)}
                        <span className="font-caveat text-xl">{getCategoryName(product?.category)}</span>
                    </div>
                </div>
            </div>

            <div className="max-w-[1200px] mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Image Section */}
                    <div className="space-y-4">
                        <div className="relative">
                            <img 
                                className="w-full h-[400px] lg:h-[500px] object-cover rounded-2xl border-4 border-[#556B2F] shadow-2xl" 
                                src={product?.photoURL} 
                                alt={product?.name}
                            />
                            
                            {/* Overlay Badges */}
                            <div className="absolute top-4 left-4">
                                <span className="inline-flex items-center gap-2 bg-[#556B2F] text-[#F7F3E9] px-3 py-2 rounded-full text-sm font-semibold border-2 border-[#F7F3E9]">
                                    {getCategoryIcon(product?.category)}
                                    {getCategoryName(product?.category)}
                                </span>
                            </div>
                            
                            {product?.price === 0 && (
                                <div className="absolute top-4 right-4">
                                    <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold border-2 border-white">
                                        FREE
                                    </span>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="absolute bottom-4 right-4 flex gap-2">
                                <button
                                    onClick={() => setIsFavorited(!isFavorited)}
                                    className={`p-3 rounded-full border-2 border-white transition-colors ${
                                        isFavorited 
                                            ? 'bg-red-500 text-white' 
                                            : 'bg-white text-red-500 hover:bg-red-500 hover:text-white'
                                    }`}
                                >
                                    <FaHeart />
                                </button>
                                <button
                                    onClick={handleShare}
                                    className="p-3 bg-white text-[#556B2F] rounded-full border-2 border-white hover:bg-[#556B2F] hover:text-white transition-colors"
                                >
                                    <FaShare />
                                </button>
                            </div>
                        </div>

                        {/* Trust Indicators */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-white rounded-xl p-4 text-center border-2 border-[#556B2F] border-opacity-20 shadow-lg">
                                <MdVerified className="text-2xl text-green-500 mx-auto mb-2" />
                                <p className="text-sm font-semibold text-gray-700">Verified</p>
                            </div>
                            <div className="bg-white rounded-xl p-4 text-center border-2 border-[#556B2F] border-opacity-20 shadow-lg">
                                <FaShieldAlt className="text-2xl text-blue-500 mx-auto mb-2" />
                                <p className="text-sm font-semibold text-gray-700">Safe</p>
                            </div>
                            <div className="bg-white rounded-xl p-4 text-center border-2 border-[#556B2F] border-opacity-20 shadow-lg">
                                <MdLocalShipping className="text-2xl text-purple-500 mx-auto mb-2" />
                                <p className="text-sm font-semibold text-gray-700">Delivery</p>
                            </div>
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="space-y-6">
                        {/* Title and Price */}
                        <div>
                            <h1 className="text-4xl font-bold font-caveat text-[#556B2F] mb-4 text-shadow-lg">
                                {product?.name}
                            </h1>
                            
                            <div className="flex items-center gap-4 mb-4">
                                <div className="text-3xl font-black font-caveat text-[#556B2F]">
                                    {product?.price == 0 ? (
                                        <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-xl">
                                            FREE ADOPTION
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-1">
                                            <TbCoinTaka className="text-2xl" />
                                            {product?.price?.toLocaleString()}
                                        </span>
                                    )}
                                </div>
                                
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar key={i} className="text-yellow-400" />
                                    ))}
                                    <span className="text-sm text-gray-600 ml-2">(4.8/5)</span>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-white rounded-xl p-6 border-2 border-[#556B2F] border-opacity-20 shadow-lg">
                            <h3 className="text-xl font-bold font-caveat text-[#556B2F] mb-3">
                                Description
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                {product?.description || `This adorable ${isPet ? 'pet' : 'product'} is looking for a loving home. Well-cared for and ready to bring joy to your family!`}
                            </p>
                        </div>

                        {/* Seller Information */}
                        <div className="bg-white rounded-xl p-6 border-2 border-[#556B2F] border-opacity-20 shadow-lg">
                            <h3 className="text-xl font-bold font-caveat text-[#556B2F] mb-4">
                                Seller Information
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <FaEnvelope className="text-[#556B2F]" />
                                    <span className="text-gray-700">{product?.email}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FaMapMarkerAlt className="text-[#556B2F]" />
                                    <span className="text-gray-700">{product?.location}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FaCalendar className="text-[#556B2F]" />
                                    <span className="text-gray-700">
                                        Listed on {new Date(product?.date).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Key Features */}
                        <div className="bg-white rounded-xl p-6 border-2 border-[#556B2F] border-opacity-20 shadow-lg">
                            <h3 className="text-xl font-bold font-caveat text-[#556B2F] mb-4">
                                {isPet ? 'Pet Features' : 'Product Features'}
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-[#556B2F] rounded-full"></div>
                                    <span className="text-sm text-gray-700">Health Certified</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-[#556B2F] rounded-full"></div>
                                    <span className="text-sm text-gray-700">Vaccinated</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-[#556B2F] rounded-full"></div>
                                    <span className="text-sm text-gray-700">Well Socialized</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-[#556B2F] rounded-full"></div>
                                    <span className="text-sm text-gray-700">Ready to Go</span>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-4">
                            {user ? (
                                <Link 
                                    to={`/add-order/${product?._id}`} 
                                    className="block w-full bg-[#556B2F] text-[#F7F3E9] text-center py-4 rounded-xl font-bold text-lg border-2 border-[#556B2F] hover:bg-transparent hover:text-[#556B2F] transition-colors shadow-lg"
                                >
                                    {isPet ? '🐾 Adopt This Pet' : '🛒 Place Order'}
                                </Link>
                            ) : (
                                <Link 
                                    to="/login" 
                                    className="block w-full bg-[#556B2F] text-[#F7F3E9] text-center py-4 rounded-xl font-bold text-lg border-2 border-[#556B2F] hover:bg-transparent hover:text-[#556B2F] transition-colors shadow-lg"
                                >
                                    Login to {isPet ? 'Adopt' : 'Order'}
                                </Link>
                            )}
                            
                            <button className="w-full bg-transparent text-[#556B2F] border-2 border-[#556B2F] py-3 rounded-xl font-semibold hover:bg-[#556B2F] hover:text-[#F7F3E9] transition-colors">
                                Contact Seller
                            </button>
                        </div>

                        {/* Safety Notice */}
                        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
                            <div className="flex items-start gap-3">
                                <FaShieldAlt className="text-yellow-600 mt-1" />
                                <div>
                                    <h4 className="font-semibold text-yellow-800 mb-1">Safety First</h4>
                                    <p className="text-sm text-yellow-700">
                                        Always meet in a safe, public location. Verify the seller's identity and inspect the {isPet ? 'pet' : 'product'} before making any payment.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;