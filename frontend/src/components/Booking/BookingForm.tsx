import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createBooking } from '../../services/api';

interface BookingFormProps {
    hotelId: string;
    roomId?: string;
}

const BookingForm: React.FC<BookingFormProps> = ({ hotelId, roomId }) => {
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [guestCount, setGuestCount] = useState(1);
    const [error, setError] = useState('');
    const history = useHistory();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!checkInDate || !checkOutDate) {
            setError('Please fill in all fields.');
            return;
        }

        try {
            const bookingData = {
                hotelId,
                roomId,
                checkInDate,
                checkOutDate,
                guestCount,
            };
            await createBooking(bookingData);
            history.push('/booking-confirmation');
        } catch (err) {
            setError('Failed to create booking. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Booking Form</h2>
            {error && <p className="error">{error}</p>}
            <div>
                <label>Check-in Date:</label>
                <input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Check-out Date:</label>
                <input
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Number of Guests:</label>
                <input
                    type="number"
                    value={guestCount}
                    onChange={(e) => setGuestCount(parseInt(e.target.value) || 1)}
                    min="1"
                    required
                />
            </div>
            <button type="submit">Book Now</button>
        </form>
    );
};

export default BookingForm;