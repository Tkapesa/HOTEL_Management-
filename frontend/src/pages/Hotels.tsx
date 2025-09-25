import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getHotels } from '../services/api';

interface Hotel {
    id: string;
    name: string;
    location: string;
    description: string;
    price: number;
    rating: number;
    imageUrl?: string;
}

const Hotels: React.FC = () => {
    const [hotels, setHotels] = useState<Hotel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [priceFilter, setPriceFilter] = useState<string>('');

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                setLoading(true);
                const response = await getHotels();
                setHotels(response.data || []);
            } catch (err) {
                setError('Failed to load hotels. Please try again later.');
                // Mock data for demonstration
                setHotels([
                    {
                        id: '1',
                        name: 'Grand Plaza Hotel',
                        location: 'New York, NY',
                        description: 'Luxury hotel in the heart of Manhattan with stunning city views and world-class amenities.',
                        price: 299,
                        rating: 4.5,
                        imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop'
                    },
                    {
                        id: '2',
                        name: 'Ocean View Resort',
                        location: 'Miami, FL',
                        description: 'Beautiful beachfront resort with pristine ocean views and private beach access.',
                        price: 199,
                        rating: 4.3,
                        imageUrl: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&h=400&fit=crop'
                    },
                    {
                        id: '3',
                        name: 'Mountain Lodge Retreat',
                        location: 'Aspen, CO',
                        description: 'Cozy mountain retreat perfect for winter getaways with ski-in/ski-out access.',
                        price: 149,
                        rating: 4.7,
                        imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&h=400&fit=crop'
                    },
                    {
                        id: '4',
                        name: 'City Center Boutique',
                        location: 'San Francisco, CA',
                        description: 'Stylish boutique hotel in the heart of downtown with modern amenities.',
                        price: 179,
                        rating: 4.4,
                        imageUrl: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&h=400&fit=crop'
                    }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchHotels();
    }, []);

    const filteredHotels = hotels.filter(hotel => {
        const matchesSearch = hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            hotel.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesPrice = !priceFilter || 
                           (priceFilter === 'low' && hotel.price < 150) ||
                           (priceFilter === 'medium' && hotel.price >= 150 && hotel.price <= 250) ||
                           (priceFilter === 'high' && hotel.price > 250);
        return matchesSearch && matchesPrice;
    });

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, index) => (
            <svg
                key={index}
                className={`w-4 h-4 ${index < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ));
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Loading amazing hotels...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">Discover Amazing Hotels</h1>
                        <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
                            Find the perfect accommodation for your next adventure from our curated collection of luxury hotels worldwide
                        </p>
                    </div>
                </div>
            </div>

            {/* Search and Filter Section */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Search Hotels</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search by name or location..."
                                    className="input-field pl-10"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                            <select
                                value={priceFilter}
                                onChange={(e) => setPriceFilter(e.target.value)}
                                className="input-field"
                            >
                                <option value="">All Prices</option>
                                <option value="low">Under $150</option>
                                <option value="medium">$150 - $250</option>
                                <option value="high">Above $250</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hotels Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {error && (
                    <div className="mb-8 bg-red-50 border border-red-200 rounded-xl p-6">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-red-800">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">
                        Available Hotels ({filteredHotels.length})
                    </h2>
                </div>

                {filteredHotels.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {filteredHotels.map((hotel) => (
                            <div key={hotel.id} className="card overflow-hidden hover:shadow-2xl transition-all duration-300">
                                <div className="md:flex">
                                    <div className="md:flex-shrink-0 relative">
                                        <img
                                            className="h-48 w-full md:h-full md:w-48 object-cover"
                                            src={hotel.imageUrl || 'https://via.placeholder.com/400x250?text=Hotel+Image'}
                                            alt={hotel.name}
                                        />
                                        <div className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                            ${hotel.price}/night
                                        </div>
                                    </div>
                                    
                                    <div className="p-6 flex flex-col justify-between flex-1">
                                        <div>
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="text-xl font-bold text-gray-900 hover:text-primary-600 transition-colors">
                                                    {hotel.name}
                                                </h3>
                                                <div className="flex items-center ml-4">
                                                    <div className="flex items-center">
                                                        {renderStars(hotel.rating)}
                                                    </div>
                                                    <span className="ml-1 text-sm text-gray-600">({hotel.rating})</span>
                                                </div>
                                            </div>
                                            
                                            <p className="text-gray-600 mb-3 flex items-center">
                                                <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                {hotel.location}
                                            </p>
                                            
                                            <p className="text-gray-700 mb-4 leading-relaxed">{hotel.description}</p>
                                        </div>
                                        
                                        <div className="flex justify-between items-center">
                                            <div className="text-right">
                                                <span className="text-2xl font-bold text-primary-600">
                                                    ${hotel.price}
                                                </span>
                                                <span className="text-gray-500 text-sm ml-1">/night</span>
                                            </div>
                                            <Link 
                                                to={`/hotels/${hotel.id}`}
                                                className="btn-primary"
                                            >
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <svg className="w-16 h-16 text-gray-400 mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0H3m2 0v-8a2 2 0 012-2h4m6 0a2 2 0 012 2v8m-6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v12" />
                        </svg>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No hotels found</h3>
                        <p className="text-gray-600 mb-8">Try adjusting your search criteria or filters to find more options.</p>
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setPriceFilter('');
                            }}
                            className="btn-primary"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Hotels;