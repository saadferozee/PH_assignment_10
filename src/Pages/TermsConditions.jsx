import { FaGavel, FaHandshake, FaExclamationTriangle, FaEnvelope, FaArrowLeft, FaShieldAlt } from 'react-icons/fa';
import { MdPets, MdVerified } from 'react-icons/md';
import { Link } from 'react-router';

const TermsConditions = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#F7F3E9] to-white">
            <title>AdoptyCo | Terms & Conditions</title>
            
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
                            <FaGavel className="text-4xl" />
                            <h1 className="text-4xl font-bold font-caveat">Terms & Conditions</h1>
                        </div>
                        <p className="text-lg opacity-90">
                            Please read these terms carefully before using our platform.
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
                                <FaHandshake className="text-2xl text-[#556B2F]" />
                                <h2 className="text-2xl font-bold font-caveat text-[#556B2F]">Agreement to Terms</h2>
                            </div>
                            <p className="text-gray-700 leading-relaxed">
                                Welcome to AdoptyCo! These Terms and Conditions ("Terms") govern your use of our website and pet adoption platform. By accessing or using our services, you agree to be bound by these Terms. If you disagree with any part of these terms, then you may not access our service.
                            </p>
                        </section>

                        {/* Platform Description */}
                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <MdPets className="text-2xl text-[#556B2F]" />
                                <h2 className="text-2xl font-bold font-caveat text-[#556B2F]">Our Platform</h2>
                            </div>
                            <div className="bg-[#F7F3E9] rounded-lg p-4">
                                <p className="text-gray-700 leading-relaxed mb-3">
                                    AdoptyCo is a digital platform that connects pet owners with potential adopters and facilitates the sale of pet-related products. We provide:
                                </p>
                                <ul className="list-disc list-inside text-gray-700 space-y-1">
                                    <li>Pet adoption services and listings</li>
                                    <li>Pet food and accessory marketplace</li>
                                    <li>Communication tools between users</li>
                                    <li>Secure payment processing</li>
                                    <li>User verification and safety features</li>
                                </ul>
                            </div>
                        </section>

                        {/* User Responsibilities */}
                        <section>
                            <h2 className="text-2xl font-bold font-caveat text-[#556B2F] mb-4">User Responsibilities</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-white border-2 border-[#556B2F] border-opacity-20 rounded-lg p-4">
                                    <h3 className="font-semibold text-[#556B2F] mb-2 flex items-center gap-2">
                                        <MdVerified />
                                        Account Information
                                    </h3>
                                    <ul className="text-gray-700 text-sm space-y-1">
                                        <li>• Provide accurate and complete information</li>
                                        <li>• Keep your account credentials secure</li>
                                        <li>• Update information when necessary</li>
                                        <li>• Be responsible for all account activity</li>
                                    </ul>
                                </div>
                                <div className="bg-white border-2 border-[#556B2F] border-opacity-20 rounded-lg p-4">
                                    <h3 className="font-semibold text-[#556B2F] mb-2 flex items-center gap-2">
                                        <FaShieldAlt />
                                        Pet Welfare
                                    </h3>
                                    <ul className="text-gray-700 text-sm space-y-1">
                                        <li>• Ensure pets are healthy and well-cared for</li>
                                        <li>• Provide accurate pet information</li>
                                        <li>• Follow local animal welfare laws</li>
                                        <li>• Report any animal abuse or neglect</li>
                                    </ul>
                                </div>
                                <div className="bg-white border-2 border-[#556B2F] border-opacity-20 rounded-lg p-4">
                                    <h3 className="font-semibold text-[#556B2F] mb-2">Listing Standards</h3>
                                    <ul className="text-gray-700 text-sm space-y-1">
                                        <li>• Post only legitimate listings</li>
                                        <li>• Use clear, accurate photos</li>
                                        <li>• Set fair and reasonable prices</li>
                                        <li>• Respond promptly to inquiries</li>
                                    </ul>
                                </div>
                                <div className="bg-white border-2 border-[#556B2F] border-opacity-20 rounded-lg p-4">
                                    <h3 className="font-semibold text-[#556B2F] mb-2">Communication</h3>
                                    <ul className="text-gray-700 text-sm space-y-1">
                                        <li>• Be respectful and professional</li>
                                        <li>• No harassment or inappropriate content</li>
                                        <li>• Protect personal information</li>
                                        <li>• Report suspicious activity</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* Prohibited Activities */}
                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <FaExclamationTriangle className="text-2xl text-red-500" />
                                <h2 className="text-2xl font-bold font-caveat text-[#556B2F]">Prohibited Activities</h2>
                            </div>
                            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
                                <p className="text-gray-700 mb-3">
                                    <strong>The following activities are strictly prohibited:</strong>
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                                        <li>Selling sick or mistreated animals</li>
                                        <li>Fraudulent or misleading listings</li>
                                        <li>Harassment of other users</li>
                                        <li>Spam or unsolicited communications</li>
                                        <li>Violation of local animal welfare laws</li>
                                    </ul>
                                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                                        <li>Creating fake accounts or profiles</li>
                                        <li>Attempting to bypass our security measures</li>
                                        <li>Using the platform for illegal activities</li>
                                        <li>Infringing on intellectual property rights</li>
                                        <li>Disrupting platform functionality</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* Payment and Transactions */}
                        <section>
                            <h2 className="text-2xl font-bold font-caveat text-[#556B2F] mb-4">Payment and Transactions</h2>
                            <div className="space-y-4">
                                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                                    <h3 className="font-semibold text-green-800 mb-2">Payment Processing</h3>
                                    <p className="text-gray-700 text-sm">
                                        All payments are processed securely through our trusted payment partners. We do not store your payment information on our servers.
                                    </p>
                                </div>
                                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                                    <h3 className="font-semibold text-blue-800 mb-2">Transaction Disputes</h3>
                                    <p className="text-gray-700 text-sm">
                                        While we facilitate connections between users, transactions are between individual users. We provide dispute resolution assistance but are not responsible for transaction outcomes.
                                    </p>
                                </div>
                                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
                                    <h3 className="font-semibold text-yellow-800 mb-2">Refund Policy</h3>
                                    <p className="text-gray-700 text-sm">
                                        Refunds are handled on a case-by-case basis. For adoption fees, refunds may be available if the adoption cannot be completed due to health or legal issues.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Liability and Disclaimers */}
                        <section>
                            <h2 className="text-2xl font-bold font-caveat text-[#556B2F] mb-4">Liability and Disclaimers</h2>
                            <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
                                <div className="space-y-3">
                                    <div>
                                        <h3 className="font-semibold text-gray-800 mb-1">Platform Availability</h3>
                                        <p className="text-gray-700 text-sm">
                                            We strive to maintain platform availability but cannot guarantee uninterrupted service. We are not liable for temporary outages or technical issues.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800 mb-1">User-Generated Content</h3>
                                        <p className="text-gray-700 text-sm">
                                            Users are responsible for the accuracy of their listings and communications. We do not verify all user-generated content.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800 mb-1">Third-Party Services</h3>
                                        <p className="text-gray-700 text-sm">
                                            We may integrate with third-party services (payment processors, mapping services, etc.). We are not responsible for their performance or policies.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Termination */}
                        <section>
                            <h2 className="text-2xl font-bold font-caveat text-[#556B2F] mb-4">Account Termination</h2>
                            <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4">
                                <p className="text-gray-700 leading-relaxed mb-3">
                                    We reserve the right to suspend or terminate accounts that violate these Terms. You may also delete your account at any time through your profile settings.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <h3 className="font-semibold text-orange-800 mb-1">Reasons for Termination</h3>
                                        <ul className="text-gray-700 text-sm space-y-1">
                                            <li>• Violation of Terms and Conditions</li>
                                            <li>• Fraudulent or illegal activity</li>
                                            <li>• Repeated user complaints</li>
                                            <li>• Animal welfare violations</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-orange-800 mb-1">Effect of Termination</h3>
                                        <ul className="text-gray-700 text-sm space-y-1">
                                            <li>• Loss of access to platform features</li>
                                            <li>• Removal of active listings</li>
                                            <li>• Forfeiture of account credits</li>
                                            <li>• Data retention per privacy policy</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Changes to Terms */}
                        <section>
                            <h2 className="text-2xl font-bold font-caveat text-[#556B2F] mb-4">Changes to Terms</h2>
                            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                                <p className="text-gray-700 leading-relaxed">
                                    We may update these Terms from time to time. We will notify users of significant changes via email or platform notifications. Continued use of the platform after changes constitutes acceptance of the new Terms.
                                </p>
                            </div>
                        </section>

                        {/* Governing Law */}
                        <section>
                            <h2 className="text-2xl font-bold font-caveat text-[#556B2F] mb-4">Governing Law</h2>
                            <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4">
                                <p className="text-gray-700 leading-relaxed">
                                    These Terms are governed by the laws of Bangladesh. Any disputes arising from these Terms or your use of our platform will be resolved in the courts of Dhaka, Bangladesh.
                                </p>
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
                                    If you have any questions about these Terms and Conditions, please contact us:
                                </p>
                                <div className="space-y-2">
                                    <p><strong>Email:</strong> legal@adoptyco.com</p>
                                    <p><strong>Address:</strong> AdoptyCo Legal Team, Dhaka, Bangladesh</p>
                                    <p><strong>Phone:</strong> +880 1234-567890</p>
                                </div>
                            </div>
                        </section>

                        {/* Acknowledgment */}
                        <section>
                            <div className="bg-[#556B2F] text-[#F7F3E9] rounded-lg p-6 text-center">
                                <h3 className="text-xl font-bold font-caveat mb-3">Acknowledgment</h3>
                                <p className="leading-relaxed">
                                    By using AdoptyCo, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. Thank you for helping us create a safe and caring community for pets and their families.
                                </p>
                            </div>
                        </section>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsConditions;