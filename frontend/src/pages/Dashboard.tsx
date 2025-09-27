import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUserBookings } from '../services/api';
import BookingHistory from '../components/Booking/BookingHistory';
import useAuth from '../hooks/useAuth';

// Mock data for demonstration
const mockStats = {
    totalBookings: 12,
    upcomingBookings: 2,
    completedBookings: 10,
    totalSpent: 4230,
    favoriteDestination: "Paris"
};

const mockRecentBookings = [
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
    }
];

const Dashboard: React.FC = () => {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState(mockStats);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // For now, use mock data
                setBookings(mockRecentBookings);
                // const response = await getUserBookings(user?.id);
                // setBookings(response.data || []);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
                setBookings(mockRecentBookings);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user]);

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

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Header */}
            <div className="bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">
                                Welcome back, {user?.firstName || 'Traveler'}! 👋
                            </h1>
                            <p className="text-xl text-blue-100">
                                Your next adventure awaits. Manage your bookings and discover new destinations.
                            </p>
                        </div>
                        <div className="hidden md:block">
                            <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
                    <div className="card p-6 text-center hover:shadow-lg transition-shadow">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.totalBookings}</h3>
                        <p className="text-gray-600 text-sm">Total Bookings</p>
                    </div>

                    <div className="card p-6 text-center hover:shadow-lg transition-shadow">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.upcomingBookings}</h3>
                        <p className="text-gray-600 text-sm">Upcoming Trips</p>
                    </div>

                    <div className="card p-6 text-center hover:shadow-lg transition-shadow">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.completedBookings}</h3>
                        <p className="text-gray-600 text-sm">Completed</p>
                    </div>

                    <div className="card p-6 text-center hover:shadow-lg transition-shadow">
                        <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">${stats.totalSpent.toLocaleString()}</h3>
                        <p className="text-gray-600 text-sm">Total Spent</p>
                    </div>

                    <div className="card p-6 text-center hover:shadow-lg transition-shadow">
                        <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{stats.favoriteDestination}</h3>
                        <p className="text-gray-600 text-sm">Favorite City</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Bookings */}
                    <div className="lg:col-span-2">
                        <div className="card">
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-bold text-gray-900">Recent Bookings</h2>
                                    <Link to="/booking-history" className="btn-ghost text-sm">
                                        View All
                                    </Link>
                                </div>
                            </div>
                            <div className="divide-y divide-gray-200">
                                {bookings.slice(0, 3).map((booking: any) => (
                                    <div key={booking.id} className="p-6 hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center space-x-4">
                                            <img
                                                src={booking.imageUrl}
                                                alt={booking.hotel.name}
                                                className="w-16 h-16 rounded-lg object-cover"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between mb-1">
                                                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                                                        {booking.hotel.name}
                                                    </h3>
                                                    <span className={getStatusBadge(booking.status)}>
                                                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                                    </span>
                                                </div>
                                                <p className="text-gray-600 text-sm mb-2">
                                                    {booking.hotel.location} • {booking.room.type}
                                                </p>
                                                <div className="flex items-center text-sm text-gray-500">
                                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    {new Date(booking.checkInDate).toLocaleDateString()} - {new Date(booking.checkOutDate).toLocaleDateString()}
                                                    <span className="ml-4 font-semibold text-gray-900">${booking.totalAmount}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="space-y-6">
                        <div className="card p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
                            <div className="space-y-3">
                                <Link to="/hotels" className="w-full btn-primary text-left justify-start">
                                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    Find Hotels
                                </Link>
                                <button className="w-full btn-secondary text-left justify-start">
                                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                    My Bookings
                                </button>
                                <button className="w-full btn-ghost text-left justify-start">
                                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    Settings
                                </button>
                            </div>
                        </div>

                        {/* Travel Tips */}
                        <div className="card p-6 bg-gradient-to-r from-primary-50 to-purple-50 border border-primary-100">
                            <div className="flex items-center mb-4">
                                <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                                    <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">Travel Tip</h3>
                            </div>
                            <p className="text-gray-700 text-sm leading-relaxed">
                                Book your next stay 2-3 weeks in advance for the best rates. Early bookings often come with free cancellation and exclusive perks!
                            </p>
                        </div>

                        {/* Special Offers */}
                        <div className="card p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200">
                            <div className="flex items-center mb-4">
                                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                                    <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">Special Offer</h3>
                            </div>
                            <p className="text-gray-700 text-sm leading-relaxed mb-3">
                                Get 15% off your next booking! Use code <span className="font-mono bg-yellow-200 px-2 py-1 rounded text-yellow-800">SAVE15</span> at checkout.
                            </p>
                            <Link to="/hotels" className="text-sm font-semibold text-yellow-700 hover:text-yellow-800">
                                Browse Hotels →
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;