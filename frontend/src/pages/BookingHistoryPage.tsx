import React from 'react';
import BookingHistory from '../components/Booking/BookingHistory';

const BookingHistoryPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 pt-16">
            <BookingHistory showTitle={true} />
        </div>
    );
};

export default BookingHistoryPage;
