import React from 'react';
import { useLocation } from 'react-router-dom';

interface LocationState {
    bookingDetails?: {
        hotelName: string;
        roomType: string;
        checkInDate: string;
        checkOutDate: string;
        totalPrice: number;
    };
}

const BookingConfirmation: React.FC = () => {
    const location = useLocation();
    const locationState = location.state || {};
    const bookingDetails = locationState['bookingDetails'];

    return (
        <div className="booking-confirmation">
            <h1>Booking Confirmation</h1>
            {bookingDetails ? (
                <div>
                    <h2>Thank you for your booking!</h2>
                    <p>Hotel: {bookingDetails.hotelName}</p>
                    <p>Room Type: {bookingDetails.roomType}</p>
                    <p>Check-in Date: {bookingDetails.checkInDate}</p>
                    <p>Check-out Date: {bookingDetails.checkOutDate}</p>
                    <p>Total Price: ${bookingDetails.totalPrice}</p>
                </div>
            ) : (
                <p>No booking details available.</p>
            )}
        </div>
    );
};

export default BookingConfirmation;