import { FaShieldAlt, FaLock, FaUserShield, FaEnvelope, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#F7F3E9] to-white">
            <title>AdoptyCo | Privacy Policy</title>
            
            {/* Header */}
            <div className="bg-[#556B2F] text-[#F7F3E9] py-8">
                <div className="max-w-[1200px] mx-auto px-4">
                    <div className="flex items-center gap-4 mb-4">
                        <Link to="/" className="flex items-center gap-2 hover:bg-[#6B8E23] px-3 py-2 rounded-lg transition-colors">
                            <FaArrowLeft />
                            <span className="hidden md:inline">Back to Home</span>
                        </Link>
                    </div>
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <FaShieldAlt className="text-4xl" />
                            <h1 className="text-4xl font-bold font-caveat">Privacy Policy</h1>
                        </div>
                        <p className="text-lg opacity-90">
                            Your privacy is important to us. Learn how we protect your information.
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-[1200px] mx-auto px-4 py-12">
                <div className="bg-white rounded-2xl shadow-lg border-2 border-[#556B2F] border-opacity-20 overflow-hidden">
                    
                    {/* Last Updated */}
                    <div className="bg-[#556B2F] text-[#F7F3E9] px-8 py-4">
                        <p className="text-center">
                            <strong>Last Updated:</strong> January 5, 2026
                        </p>
                    </div>

                    <div className="p-8 space-y-8">
                        
                        {/* Introduction */}
                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <FaUserShield className="text-2xl text-[#556B2F]" />
                                <h2 className="text-2xl font-bold font-caveat text-[#556B2F]">Introduction</h2>
                            </div>
                            <p className="text-gray-700 leading-relaxed">
                                Welcome to AdoptyCo ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our pet adoption platform.
                            </p>
                        </section>

                        {/* Information We Collect */}
                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <FaLock className="text-2xl text-[#556B2F]" />
                                <h2 className="text-2xl font-bold font-caveat text-[#556B2F]">Information We Collect</h2>
                            </div>
                            <div className="space-y-4">
                                <div className="bg-[#F7F3E9] rounded-lg p-4">
                                    <h3 className="font-semibold text-[#556B2F] mb-2">Personal Information</h3>
                                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                                        <li>Name and contact information (email, phone number)</li>
                                        <li>Profile information and photos</li>
                                        <li>Location and address details</li>
                                        <li>Payment information (processed securely)</li>
                                    </ul>
                                </div>
                                <div className="bg-[#F7F3E9] rounded-lg p-4">
                                    <h3 className="font-semibold text-[#556B2F] mb-2">Usage Information</h3>
                                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                                        <li>Browser type and version</li>
                                        <li>Pages visited and time spent on our site</li>
                                        <li>Search queries and preferences</li>
                                        <li>Device information and IP address</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* How We Use Your Information */}
                        <section>
                            <h2 className="text-2xl font-bold font-caveat text-[#556B2F] mb-4">How We Use Your Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-white border-2 border-[#556B2F] border-opacity-20 rounded-lg p-4">
                                    <h3 className="font-semibold text-[#556B2F] mb-2">Service Provision</h3>
                                    <p className="text-gray-700 text-sm">
                                        To provide and maintain our pet adoption platform, process transactions, and facilitate connections between pet owners and adopters.
                                    </p>
                                </div>
                                <div className="bg-white border-2 border-[#556B2F] border-opacity-20 rounded-lg p-4">
                                    <h3 className="font-semibold text-[#556B2F] mb-2">Communication</h3>
                                    <p className="text-gray-700 text-sm">
                                        To send you updates, newsletters, and important information about our services and pet adoption opportunities.
                                    </p>
                                </div>
                                <div className="bg-white border-2 border-[#556B2F] border-opacity-20 rounded-lg p-4">
                                    <h3 className="font-semibold text-[#556B2F] mb-2">Improvement</h3>
                                    <p className="text-gray-700 text-sm">
                                        To analyze usage patterns and improve our platform's functionality, user experience, and safety features.
                                    </p>
                                </div>
                                <div className="bg-white border-2 border-[#556B2F] border-opacity-20 rounded-lg p-4">
                                    <h3 className="font-semibold text-[#556B2F] mb-2">Safety & Security</h3>
                                    <p className="text-gray-700 text-sm">
                                        To verify user identities, prevent fraud, and ensure the safety of all pets and users on our platform.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Information Sharing */}
                        <section>
                            <h2 className="text-2xl font-bold font-caveat text-[#556B2F] mb-4">Information Sharing</h2>
                            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
                                <p className="text-gray-700 leading-relaxed">
                                    <strong>We do not sell your personal information.</strong> We may share your information only in the following circumstances:
                                </p>
                                <ul className="list-disc list-inside text-gray-700 mt-3 space-y-1">
                                    <li>With other users to facilitate pet adoptions (contact information)</li>
                                    <li>With service providers who help us operate our platform</li>
                                    <li>When required by law or to protect our rights and safety</li>
                                    <li>With your explicit consent</li>
                                </ul>
                            </div>
                        </section>

                        {/* Data Security */}
                        <section>
                            <h2 className="text-2xl font-bold font-caveat text-[#556B2F] mb-4">Data Security</h2>
                            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                                <p className="text-gray-700 leading-relaxed mb-3">
                                    We implement appropriate technical and organizational security measures to protect your personal information:
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <span className="text-sm text-gray-700">SSL encryption for data transmission</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <span className="text-sm text-gray-700">Secure database storage</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <span className="text-sm text-gray-700">Regular security audits</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <span className="text-sm text-gray-700">Access controls and monitoring</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Your Rights */}
                        <section>
                            <h2 className="text-2xl font-bold font-caveat text-[#556B2F] mb-4">Your Rights</h2>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3 p-3 bg-[#F7F3E9] rounded-lg">
                                    <div className="w-2 h-2 bg-[#556B2F] rounded-full mt-2"></div>
                                    <div>
                                        <strong className="text-[#556B2F]">Access:</strong>
                                        <span className="text-gray-700"> Request a copy of your personal information</span>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-3 bg-[#F7F3E9] rounded-lg">
                                    <div className="w-2 h-2 bg-[#556B2F] rounded-full mt-2"></div>
                                    <div>
                                        <strong className="text-[#556B2F]">Correction:</strong>
                                        <span className="text-gray-700"> Update or correct inaccurate information</span>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-3 bg-[#F7F3E9] rounded-lg">
                                    <div className="w-2 h-2 bg-[#556B2F] rounded-full mt-2"></div>
                                    <div>
                                        <strong className="text-[#556B2F]">Deletion:</strong>
                                        <span className="text-gray-700"> Request deletion of your personal information</span>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-3 bg-[#F7F3E9] rounded-lg">
                                    <div className="w-2 h-2 bg-[#556B2F] rounded-full mt-2"></div>
                                    <div>
                                        <strong className="text-[#556B2F]">Opt-out:</strong>
                                        <span className="text-gray-700"> Unsubscribe from marketing communications</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Contact Information */}
                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <FaEnvelope className="text-2xl text-[#556B2F]" />
                                <h2 className="text-2xl font-bold font-caveat text-[#556B2F]">Contact Us</h2>
                            </div>
                            <div className="bg-[#556B2F] text-[#F7F3E9] rounded-lg p-6">
                                <p className="mb-4">
                                    If you have any questions about this Privacy Policy or our data practices, please contact us:
                                </p>
                                <div className="space-y-2">
                                    <p><strong>Email:</strong> privacy@adoptyco.com</p>
                                    <p><strong>Address:</strong> AdoptyCo Privacy Team, Dhaka, Bangladesh</p>
                                    <p><strong>Phone:</strong> +880 1234-567890</p>
                                </div>
                            </div>
                        </section>

                        {/* Updates */}
                        <section>
                            <h2 className="text-2xl font-bold font-caveat text-[#556B2F] mb-4">Policy Updates</h2>
                            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                                <p className="text-gray-700 leading-relaxed">
                                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. We encourage you to review this Privacy Policy periodically for any changes.
                                </p>
                            </div>
                        </section>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;