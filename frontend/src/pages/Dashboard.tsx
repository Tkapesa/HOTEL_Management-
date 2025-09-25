import React, { useEffect, useState } from 'react';
import { getUserBookings } from '../services/api';
import BookingHistory from '../components/Booking/BookingHistory';
import Header from '../components/Common/Header';
import Footer from '../components/Common/Footer';

const Dashboard: React.FC = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                // For now, use a placeholder userId or get it from auth context
                const userId = "current-user"; // This should come from auth context in real implementation
                const response = await getUserBookings(userId);
                setBookings(response.data || []);
            } catch (error) {
                console.error('Failed to fetch user bookings:', error);
                setBookings([]);
            }
        };

        fetchBookings();
    }, []);

    return (
        <div>
            <Header />
            <h1>User Dashboard</h1>
            <BookingHistory />
            <Footer />
        </div>
    );
};

export default Dashboard;