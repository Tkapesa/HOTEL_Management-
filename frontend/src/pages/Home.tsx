import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Common/Header';
import Footer from '../components/Common/Footer';

const Home: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-section">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-black/10"></div>
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-8">
              <span className="text-white">Discover Your Perfect</span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Luxury Escape
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-100 mb-12 max-w-4xl mx-auto leading-relaxed">
              From boutique hotels to luxury resorts, discover extraordinary accommodations 
              that transform your travels into unforgettable experiences.
            </p>

            {/* Search Bar */}
            <div className="max-w-4xl mx-auto mb-12">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 md:p-8 border border-white/20">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-white/80 mb-2">Destination</label>
                    <input 
                      type="text" 
                      placeholder="Where would you like to go?"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">Check-in</label>
                    <input 
                      type="date"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">Check-out</label>
                    <input 
                      type="date"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                    />
                  </div>
                </div>
                <button className="w-full md:w-auto mt-6 bg-white text-primary-600 hover:bg-gray-50 px-12 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:scale-105 shadow-lg">
                  <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Search Hotels
                </button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/hotels" className="btn-primary text-lg px-10 py-4">
                Explore Hotels
              </Link>
              <Link to="/register" className="btn-secondary text-lg px-10 py-4">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-6">
              Why Choose HotelLux?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Experience the difference with our premium features designed to make your hotel booking seamless and memorable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Feature 1 */}
            <div className="group text-center p-8 rounded-3xl bg-gradient-to-br from-blue-50 to-primary-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-secondary-900 mb-4">Smart Search</h3>
              <p className="text-gray-700 leading-relaxed">
                Find your perfect hotel with AI-powered search that understands your preferences and budget.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group text-center p-8 rounded-3xl bg-gradient-to-br from-green-50 to-green-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-secondary-900 mb-4">Secure Booking</h3>
              <p className="text-gray-700 leading-relaxed">
                Book with confidence using our bank-level security and get instant confirmation with flexible cancellation.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group text-center p-8 rounded-3xl bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-secondary-900 mb-4">Best Prices</h3>
              <p className="text-gray-700 leading-relaxed">
                Get guaranteed best rates with our price match promise and exclusive member discounts up to 25% off.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-6">
              Popular Destinations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover trending destinations loved by travelers worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Destination 1 */}
            <div className="group card overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=600&h=400&fit=crop" 
                  alt="Paris"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-bold mb-1">Paris</h3>
                  <p className="text-white/80">From $120/night</p>
                </div>
              </div>
            </div>

            {/* Destination 2 */}
            <div className="group card overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&h=400&fit=crop" 
                  alt="Bali"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-bold mb-1">Bali</h3>
                  <p className="text-white/80">From $80/night</p>
                </div>
              </div>
            </div>

            {/* Destination 3 */}
            <div className="group card overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop" 
                  alt="New York"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-bold mb-1">New York</h3>
                  <p className="text-white/80">From $200/night</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-16">Trusted Worldwide</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="group cursor-pointer">
              <div className="text-5xl md:text-6xl font-bold mb-2 group-hover:scale-110 transition-transform">1M+</div>
              <div className="text-blue-100 text-lg">Happy Travelers</div>
            </div>
            <div className="group cursor-pointer">
              <div className="text-5xl md:text-6xl font-bold mb-2 group-hover:scale-110 transition-transform">50K+</div>
              <div className="text-blue-100 text-lg">Hotels Worldwide</div>
            </div>
            <div className="group cursor-pointer">
              <div className="text-5xl md:text-6xl font-bold mb-2 group-hover:scale-110 transition-transform">200+</div>
              <div className="text-blue-100 text-lg">Countries</div>
            </div>
            <div className="group cursor-pointer">
              <div className="text-5xl md:text-6xl font-bold mb-2 group-hover:scale-110 transition-transform">24/7</div>
              <div className="text-blue-100 text-lg">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-8">
            Ready for Your Next Adventure?
          </h2>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            Join millions of travelers who trust HotelLux for their perfect getaway. 
            Your dream destination is just one click away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/hotels" className="btn-primary text-lg px-12 py-4">
              Start Exploring
            </Link>
            <Link to="/register" className="btn-secondary text-lg px-12 py-4">
              Sign Up Free
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;