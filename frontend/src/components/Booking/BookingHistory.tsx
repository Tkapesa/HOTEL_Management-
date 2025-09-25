import React, { useEffect, useState } from 'react';
import { getBookingHistory } from '../../services/api';

// Define types locally instead of importing from shared folder
interface Hotel {
  id: string;
  name: string;
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
}

interface BookingHistoryProps {
  bookings?: Booking[];
}

const BookingHistory: React.FC<BookingHistoryProps> = ({ bookings: propBookings }) => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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
                // For now, use a placeholder userId or get it from auth context
                const userId = "current-user"; // This should come from auth context in real implementation
                const response = await getBookingHistory(userId);
                setBookings(response.data);
            } catch (err) {
                setError('Failed to fetch booking history');
            } finally {
                setLoading(false);
            }
        };

        fetchBookingHistory();
    }, [propBookings]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Your Booking History</h2>
            <ul>
                {bookings.map((booking) => (
                    <li key={booking.id}>
                        <p>Hotel: {booking.hotel.name}</p>
                        <p>Room: {booking.room.type}</p>
                        <p>Check-in: {booking.checkInDate}</p>
                        <p>Check-out: {booking.checkOutDate}</p>
                        <p>Status: {booking.status}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookingHistory;