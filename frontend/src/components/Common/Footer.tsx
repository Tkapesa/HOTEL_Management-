import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer-gradient relative">
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Main Footer Content */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '2rem',
                    marginBottom: '3rem'
                }}>
                    {/* Brand Section */}
                    <div style={{ minWidth: '250px' }}>
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="footer-brand-logo w-12 h-12 rounded-xl flex items-center justify-center">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0H3m2 0v-8a2 2 0 012-2h4m6 0a2 2 0 012 2v8m-6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v12" />
                                </svg>
                            </div>
                            <span className="brand-text text-2xl font-bold">
                                HotelLux
                            </span>
                        </div>
                        <p className="text-slate-400 leading-relaxed mb-6 text-sm">
                            Your premier destination for luxury hotel bookings worldwide. 
                            Discover extraordinary experiences and create unforgettable memories with our curated selection of premium accommodations.
                        </p>
                        <div className="flex space-x-3">
                            <a href="#" className="footer-social-icon group" aria-label="Follow us on Twitter">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                                </svg>
                            </a>
                            <a href="#" className="footer-social-icon group" aria-label="Follow us on Facebook">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                            </a>
                            <a href="#" className="footer-social-icon group" aria-label="Follow us on Instagram">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.742.097.118.112.222.085.343-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.138-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.750-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                                </svg>
                            </a>
                            <a href="#" className="footer-social-icon group" aria-label="Follow us on LinkedIn">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div style={{ minWidth: '200px' }}>
                        <h4 className="footer-section-title text-lg">Quick Links</h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            <li style={{ marginBottom: '0.75rem' }}><Link to="/" className="footer-link">Home</Link></li>
                            <li style={{ marginBottom: '0.75rem' }}><Link to="/hotels" className="footer-link">Hotels</Link></li>
                            <li style={{ marginBottom: '0.75rem' }}><Link to="/destinations" className="footer-link">Destinations</Link></li>
                            <li style={{ marginBottom: '0.75rem' }}><Link to="/about" className="footer-link">About Us</Link></li>
                            <li style={{ marginBottom: '0.75rem' }}><Link to="/contact" className="footer-link">Contact</Link></li>
                            <li style={{ marginBottom: '0.75rem' }}><Link to="/blog" className="footer-link">Travel Blog</Link></li>
                        </ul>
                    </div>

                    {/* Support & Services */}
                    <div style={{ minWidth: '200px' }}>
                        <h4 className="footer-section-title text-lg">Support & Services</h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            <li style={{ marginBottom: '0.75rem' }}><Link to="/help" className="footer-link">Help Center</Link></li>
                            <li style={{ marginBottom: '0.75rem' }}><Link to="/booking-help" className="footer-link">Booking Support</Link></li>
                            <li style={{ marginBottom: '0.75rem' }}><Link to="/cancellation" className="footer-link">Cancellations</Link></li>
                            <li style={{ marginBottom: '0.75rem' }}><Link to="/safety" className="footer-link">Safety Guidelines</Link></li>
                            <li style={{ marginBottom: '0.75rem' }}><Link to="/accessibility" className="footer-link">Accessibility</Link></li>
                            <li style={{ marginBottom: '0.75rem' }}><Link to="/partner" className="footer-link">Partner with Us</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter & Contact */}
                    <div style={{ minWidth: '250px' }}>
                        <h4 className="footer-section-title text-lg">Stay Connected</h4>
                        <p className="text-slate-400 mb-6 text-sm">
                            Subscribe to get exclusive deals, travel inspiration, and special offers delivered to your inbox.
                        </p>
                        <div style={{ marginBottom: '1rem' }}>
                            <div className="flex">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="footer-newsletter-input flex-1 text-sm"
                                    style={{ flex: 1 }}
                                />
                                <button className="footer-newsletter-btn" aria-label="Subscribe to newsletter">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                </button>
                            </div>
                            <div className="flex items-center space-x-2" style={{ marginTop: '1rem' }}>
                                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-xs text-slate-500">No spam, unsubscribe anytime</span>
                            </div>
                        </div>
                        
                        {/* Contact Info */}
                        <div style={{ marginTop: '1.5rem' }}>
                            <div className="flex items-center space-x-3" style={{ marginBottom: '0.75rem' }}>
                                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span className="text-slate-400 text-sm">support@hotellux.com</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span className="text-slate-400 text-sm">+1 (555) 123-4567</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div style={{ borderTop: '1px solid #334155', paddingTop: '2rem' }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '1.5rem'
                    }}
                    className="lg:flex-row lg:justify-between">
                        {/* Copyright & Legal Links */}
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '0.75rem'
                        }}
                        className="md:flex-row md:gap-6">
                            <p className="text-slate-400 text-sm">
                                © {currentYear} HotelLux. All rights reserved.
                            </p>
                            <div className="flex items-center space-x-6 text-sm">
                                <Link to="/privacy" className="footer-link text-sm">
                                    Privacy Policy
                                </Link>
                                <Link to="/terms" className="footer-link text-sm">
                                    Terms of Service
                                </Link>
                                <Link to="/cookies" className="footer-link text-sm">
                                    Cookie Policy
                                </Link>
                            </div>
                        </div>

                        {/* Trust Badges */}
                        <div className="flex items-center space-x-4">
                            <div className="footer-trust-badge">
                                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                <span className="text-xs text-slate-400 font-medium">Secure Booking</span>
                            </div>
                            <div className="footer-trust-badge">
                                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-xs text-slate-400 font-medium">Verified Hotels</span>
                            </div>
                            <div className="footer-trust-badge">
                                <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                <span className="text-xs text-slate-400 font-medium">24/7 Support</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;