import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBookingHistory } from '../../services/api';

// Define types locally instead of importing from shared folder
interface Hotel {
  id: string;
  name: string;
  location?: string;
}

interface Room {
  id: string;
  type: string;
}

interface Booking {
  id: string;
  hotel: Hotel;
  room: Room;
  checkInDate: string;
  checkOutDate: string;
  status: string;
  totalAmount?: number;
  nights?: number;
  imageUrl?: string;
}

interface BookingHistoryProps {
  bookings?: Booking[];
  showTitle?: boolean;
  maxItems?: number;
}

// Mock data for demonstration
const mockBookings: Booking[] = [
    {
        id: '1',
        hotel: { id: '1', name: 'Grand Plaza Hotel', location: 'New York, NY' },
        room: { id: '1', type: 'Deluxe Suite' },
        checkInDate: '2025-10-15',
        checkOutDate: '2025-10-18',
        status: 'confirmed',
        totalAmount: 897,
        nights: 3,
        imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=250&fit=crop'
    },
    {
        id: '2',
        hotel: { id: '2', name: 'Ocean View Resort', location: 'Miami, FL' },
        room: { id: '2', type: 'Ocean Front Room' },
        checkInDate: '2025-11-02',
        checkOutDate: '2025-11-05',
        status: 'pending',
        totalAmount: 597,
        nights: 3,
        imageUrl: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&h=250&fit=crop'
    },
    {
        id: '3',
        hotel: { id: '3', name: 'Mountain Lodge Retreat', location: 'Aspen, CO' },
        room: { id: '3', type: 'Mountain View Suite' },
        checkInDate: '2025-09-10',
        checkOutDate: '2025-09-14',
        status: 'completed',
        totalAmount: 756,
        nights: 4,
        imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=250&fit=crop'
    },
    {
        id: '4',
        hotel: { id: '4', name: 'City Center Boutique', location: 'San Francisco, CA' },
        room: { id: '4', type: 'Premium Room' },
        checkInDate: '2025-08-22',
        checkOutDate: '2025-08-25',
        status: 'completed',
        totalAmount: 537,
        nights: 3,
        imageUrl: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=250&fit=crop'
    },
    {
        id: '5',
        hotel: { id: '5', name: 'Beachside Paradise', location: 'Malibu, CA' },
        room: { id: '5', type: 'Oceanview Suite' },
        checkInDate: '2025-07-15',
        checkOutDate: '2025-07-20',
        status: 'cancelled',
        totalAmount: 1200,
        nights: 5,
        imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=250&fit=crop'
    }
];

const BookingHistory: React.FC<BookingHistoryProps> = ({ 
    bookings: propBookings, 
    showTitle = true,
    maxItems 
}) => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<string>('all');

    useEffect(() => {
        // If bookings are passed as props, use them
        if (propBookings) {
            setBookings(propBookings);
            setLoading(false);
            return;
        }

        // Otherwise, fetch booking history
        const fetchBookingHistory = async () => {
            try {
                setLoading(true);
                // For demonstration, use mock data
                setBookings(mockBookings);
                // const userId = "current-user"; 
                // const response = await getBookingHistory(userId);
                // setBookings(response.data);
            } catch (err) {
                setError('Failed to fetch booking history');
                setBookings(mockBookings); // Fallback to mock data
            } finally {
                setLoading(false);
            }
        };

        fetchBookingHistory();
    }, [propBookings]);

    const getStatusBadge = (status: string) => {
        const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
        switch (status) {
            case 'confirmed':
                return `${baseClasses} bg-green-100 text-green-800`;
            case 'pending':
                return `${baseClasses} bg-yellow-100 text-yellow-800`;
            case 'cancelled':
                return `${baseClasses} bg-red-100 text-red-800`;
            case 'completed':
                return `${baseClasses} bg-blue-100 text-blue-800`;
            default:
                return `${baseClasses} bg-gray-100 text-gray-800`;
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'confirmed':
                return (
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
            case 'pending':
                return (
                    <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
            case 'cancelled':
                return (
                    <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
            case 'completed':
                return (
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                );
            default:
                return null;
        }
    };

    const filteredBookings = bookings.filter(booking => {
        if (filter === 'all') return true;
        return booking.status === filter;
    });

    const displayBookings = maxItems ? filteredBookings.slice(0, maxItems) : filteredBookings;

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-center">
                    <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading your bookings...</p>
                </div>
            </div>
        );
    }

    if (error && bookings.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Unable to load bookings</h3>
                <p className="text-gray-600 mb-4">{error}</p>
                <button 
                    onClick={() => window.location.reload()}
                    className="btn-primary"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {showTitle && (
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Booking History</h1>
                    <p className="text-gray-600">Manage and view all your hotel reservations</p>
                </div>
            )}

            {/* Filter Tabs */}
            {!maxItems && (
                <div className="mb-6">
                    <nav className="flex space-x-8 border-b border-gray-200">
                        {[
                            { key: 'all', label: 'All Bookings', count: bookings.length },
                            { key: 'confirmed', label: 'Confirmed', count: bookings.filter(b => b.status === 'confirmed').length },
                            { key: 'pending', label: 'Pending', count: bookings.filter(b => b.status === 'pending').length },
                            { key: 'completed', label: 'Completed', count: bookings.filter(b => b.status === 'completed').length },
                            { key: 'cancelled', label: 'Cancelled', count: bookings.filter(b => b.status === 'cancelled').length }
                        ].map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setFilter(tab.key)}
                                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                                    filter === tab.key
                                        ? 'border-primary-500 text-primary-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                {tab.label} ({tab.count})
                            </button>
                        ))}
                    </nav>
                </div>
            )}

            {displayBookings.length > 0 ? (
                <div className="space-y-4">
                    {displayBookings.map((booking) => (
                        <div key={booking.id} className="card overflow-hidden hover:shadow-lg transition-all duration-300">
                            <div className="md:flex">
                                <div className="md:flex-shrink-0">
                                    <img
                                        className="h-48 w-full md:h-32 md:w-48 object-cover"
                                        src={booking.imageUrl || `https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=250&fit=crop`}
                                        alt={booking.hotel.name}
                                    />
                                </div>
                                <div className="p-6 flex-1">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center mb-2">
                                                <h3 className="text-xl font-bold text-gray-900 mr-3">
                                                    {booking.hotel.name}
                                                </h3>
                                                <span className={getStatusBadge(booking.status)}>
                                                    <span className="flex items-center">
                                                        {getStatusIcon(booking.status)}
                                                        <span className="ml-1">{booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}</span>
                                                    </span>
                                                </span>
                                            </div>
                                            
                                            {booking.hotel.location && (
                                                <p className="text-gray-600 mb-1 flex items-center">
                                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                    {booking.hotel.location}
                                                </p>
                                            )}
                                            
                                            <p className="text-gray-600 mb-3">{booking.room.type}</p>
                                            
                                            <div className="flex items-center text-sm text-gray-500 mb-4">
                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <span>
                                                    {new Date(booking.checkInDate).toLocaleDateString()} - {new Date(booking.checkOutDate).toLocaleDateString()}
                                                </span>
                                                {booking.nights && (
                                                    <span className="ml-2">• {booking.nights} night{booking.nights > 1 ? 's' : ''}</span>
                                                )}
                                            </div>
                                        </div>
                                        
                                        <div className="text-right ml-4">
                                            {booking.totalAmount && (
                                                <div className="mb-3">
                                                    <span className="text-2xl font-bold text-gray-900">
                                                        ${booking.totalAmount}
                                                    </span>
                                                </div>
                                            )}
                                            
                                            <div className="space-y-2">
                                                {booking.status === 'confirmed' && (
                                                    <button className="btn-primary text-sm w-full">
                                                        View Details
                                                    </button>
                                                )}
                                                {booking.status === 'pending' && (
                                                    <button className="btn-secondary text-sm w-full">
                                                        Modify Booking
                                                    </button>
                                                )}
                                                {(booking.status === 'completed' || booking.status === 'cancelled') && (
                                                    <button className="btn-ghost text-sm w-full">
                                                        View Receipt
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings found</h3>
                    <p className="text-gray-600 mb-8">
                        {filter === 'all' 
                            ? "You haven't made any hotel reservations yet."
                            : `You don't have any ${filter} bookings.`
                        }
                    </p>
                    <Link to="/hotels" className="btn-primary">
                        Book Your First Hotel
                    </Link>
                </div>
            )}

            {/* Show "View All" link if maxItems is set and there are more items */}
            {maxItems && bookings.length > maxItems && (
                <div className="text-center mt-6">
                    <Link to="/booking-history" className="btn-ghost">
                        View All Bookings ({bookings.length})
                    </Link>
                </div>
            )}
        </div>
    );
};

export default BookingHistory;