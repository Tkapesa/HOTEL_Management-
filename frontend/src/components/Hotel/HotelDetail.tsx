import React, { useState, useEffect } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { getHotelById } from '../../services/api';

interface HotelDetailParams {
    id: string;
}

interface Hotel {
    id: string;
    name: string;
    location: string;
    description: string;
    price: number;
    rating: number;
    imageUrl?: string;
    images?: string[];
    amenities?: string[];
    rooms?: Room[];
}

interface Room {
    id: string;
    type: string;
    price: number;
    description: string;
    amenities: string[];
    maxGuests: number;
    images?: string[];
}

const mockHotel: Hotel = {
    id: '1',
    name: 'Grand Plaza Hotel',
    location: 'New York, NY',
    description: 'Experience luxury at its finest in the heart of Manhattan. Our Grand Plaza Hotel offers world-class accommodations with breathtaking city views, premium amenities, and exceptional service that will make your stay unforgettable.',
    price: 299,
    rating: 4.5,
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=500&fit=crop',
    images: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=500&fit=crop',
        'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=500&fit=crop',
        'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=500&fit=crop',
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=500&fit=crop'
    ],
    amenities: [
        'Free WiFi', 'Pool', 'Gym', 'Spa', 'Restaurant', 'Bar', 
        'Room Service', 'Concierge', 'Valet Parking', 'Airport Shuttle',
        'Business Center', 'Pet Friendly'
    ],
    rooms: [
        {
            id: '1',
            type: 'Standard Room',
            price: 199,
            description: 'Comfortable room with city views, modern amenities, and premium bedding.',
            amenities: ['Free WiFi', 'Air Conditioning', 'Flat Screen TV', 'Mini Bar'],
            maxGuests: 2
        },
        {
            id: '2',
            type: 'Deluxe Suite',
            price: 299,
            description: 'Spacious suite with separate living area, premium amenities, and stunning views.',
            amenities: ['Free WiFi', 'Air Conditioning', 'Flat Screen TV', 'Mini Bar', 'Living Area', 'City View'],
            maxGuests: 4
        },
        {
            id: '3',
            type: 'Presidential Suite',
            price: 599,
            description: 'Ultimate luxury with panoramic views, private terrace, and exclusive amenities.',
            amenities: ['Free WiFi', 'Air Conditioning', 'Flat Screen TV', 'Mini Bar', 'Living Area', 'City View', 'Private Terrace', 'Butler Service'],
            maxGuests: 6
        }
    ]
};

const HotelDetail: React.FC = () => {
    const { id } = useParams<HotelDetailParams>();
    const history = useHistory();
    const [hotel, setHotel] = useState<Hotel | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState(2);
    const [selectedRoom, setSelectedRoom] = useState<string>('');

    useEffect(() => {
        const fetchHotel = async () => {
            try {
                setLoading(true);
                // For demonstration, use mock data
                setHotel(mockHotel);
                // const response = await getHotelById(id);
                // setHotel(response.data);
            } catch (err) {
                setError('Failed to load hotel details');
                setHotel(mockHotel); // Fallback to mock data
            } finally {
                setLoading(false);
            }
        };

        fetchHotel();
    }, [id]);

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, index) => (
            <svg
                key={index}
                className={`w-5 h-5 ${index < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ));
    };

    const handleBooking = () => {
        if (!selectedRoom || !checkIn || !checkOut) {
            alert('Please select dates and room type');
            return;
        }
        
        // Navigate to booking form with hotel and room details
        history.push(`/booking/${hotel?.id}?room=${selectedRoom}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Loading hotel details...</p>
                </div>
            </div>
        );
    }

    if (error && !hotel) {
        return (
            <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Hotel not found</h3>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <Link to="/hotels" className="btn-primary">
                        Back to Hotels
                    </Link>
                </div>
            </div>
        );
    }

    if (!hotel) return null;

    return (
        <div className="min-h-screen bg-gray-50 pt-16">
            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <nav className="flex items-center space-x-2 text-sm text-gray-500">
                        <Link to="/" className="hover:text-primary-600 transition-colors">Home</Link>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <Link to="/hotels" className="hover:text-primary-600 transition-colors">Hotels</Link>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <span className="text-gray-900 font-medium">{hotel.name}</span>
                    </nav>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Hotel Images */}
                        <div className="card overflow-hidden">
                            <div className="relative">
                                <img
                                    src={hotel.images?.[selectedImageIndex] || hotel.imageUrl}
                                    alt={hotel.name}
                                    className="w-full h-96 object-cover"
                                />
                                <div className="absolute bottom-4 left-4">
                                    <div className="flex space-x-2">
                                        {hotel.images?.map((image, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setSelectedImageIndex(index)}
                                                className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                                                    selectedImageIndex === index 
                                                        ? 'border-white shadow-lg' 
                                                        : 'border-white/50 hover:border-white/80'
                                                }`}
                                            >
                                                <img
                                                    src={image}
                                                    alt={`${hotel.name} ${index + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Hotel Info */}
                        <div className="card p-8">
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <h1 className="text-4xl font-bold text-gray-900 mb-2">{hotel.name}</h1>
                                    <div className="flex items-center mb-4">
                                        <div className="flex items-center mr-4">
                                            {renderStars(hotel.rating)}
                                            <span className="ml-2 text-lg font-medium text-gray-700">
                                                {hotel.rating} / 5.0
                                            </span>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            {hotel.location}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-3xl font-bold text-primary-600">${hotel.price}</div>
                                    <div className="text-gray-500">per night</div>
                                </div>
                            </div>

                            <p className="text-gray-700 leading-relaxed text-lg mb-8">{hotel.description}</p>

                            {/* Amenities */}
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Hotel Amenities</h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {hotel.amenities?.map((amenity, index) => (
                                        <div key={index} className="flex items-center text-gray-700">
                                            <svg className="w-5 h-5 text-primary-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span>{amenity}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Room Types */}
                        <div className="card p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Available Rooms</h3>
                            <div className="space-y-6">
                                {hotel.rooms?.map((room) => (
                                    <div 
                                        key={room.id} 
                                        className={`border-2 rounded-xl p-6 transition-all cursor-pointer ${
                                            selectedRoom === room.id 
                                                ? 'border-primary-500 bg-primary-50' 
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                        onClick={() => setSelectedRoom(room.id)}
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h4 className="text-xl font-bold text-gray-900 mb-2">{room.type}</h4>
                                                <p className="text-gray-700 mb-3">{room.description}</p>
                                                <div className="flex items-center text-gray-600 mb-4">
                                                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                    </svg>
                                                    Max {room.maxGuests} guests
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-2xl font-bold text-gray-900">${room.price}</div>
                                                <div className="text-gray-500">per night</div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            {room.amenities.map((amenity, index) => (
                                                <div key={index} className="flex items-center text-sm text-gray-600">
                                                    <svg className="w-4 h-4 text-primary-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    {amenity}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Booking Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="card p-6 sticky top-24">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Book Your Stay</h3>
                            
                            <div className="space-y-4 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Check-in</label>
                                    <input
                                        type="date"
                                        value={checkIn}
                                        onChange={(e) => setCheckIn(e.target.value)}
                                        className="input-field"
                                        min={new Date().toISOString().split('T')[0]}
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Check-out</label>
                                    <input
                                        type="date"
                                        value={checkOut}
                                        onChange={(e) => setCheckOut(e.target.value)}
                                        className="input-field"
                                        min={checkIn || new Date().toISOString().split('T')[0]}
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Guests</label>
                                    <select
                                        value={guests}
                                        onChange={(e) => setGuests(parseInt(e.target.value))}
                                        className="input-field"
                                    >
                                        <option value={1}>1 Guest</option>
                                        <option value={2}>2 Guests</option>
                                        <option value={3}>3 Guests</option>
                                        <option value={4}>4 Guests</option>
                                        <option value={5}>5 Guests</option>
                                        <option value={6}>6 Guests</option>
                                    </select>
                                </div>
                            </div>

                            {/* Price Summary */}
                            {selectedRoom && checkIn && checkOut && (
                                <div className="border-t border-gray-200 pt-4 mb-6">
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span>Room rate per night</span>
                                            <span>${hotel.rooms?.find(r => r.id === selectedRoom)?.price || 0}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Nights</span>
                                            <span>{Math.max(1, Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)))}</span>
                                        </div>
                                        <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                                            <span>Total</span>
                                            <span>${(hotel.rooms?.find(r => r.id === selectedRoom)?.price || 0) * Math.max(1, Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)))}</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <button
                                onClick={handleBooking}
                                className="w-full btn-primary"
                                disabled={!selectedRoom || !checkIn || !checkOut}
                            >
                                Book Now
                            </button>

                            <div className="mt-4 text-center text-sm text-gray-500">
                                <p>Free cancellation • No booking fees</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotelDetail;