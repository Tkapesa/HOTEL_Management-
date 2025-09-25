import React from 'react';

// Define Hotel interface
interface Hotel {
    id: string;
    name: string;
    description: string;
    location: string;
    price: number;
    rating: number;
    imageUrl?: string;
}

interface HotelListProps {
    hotels: Hotel[];
}

const HotelList: React.FC<HotelListProps> = ({ hotels }) => {
    if (!hotels || hotels.length === 0) {
        return <div>No hotels available</div>;
    }

    return (
        <div>
            <h2>Available Hotels</h2>
            <div className="hotel-grid">
                {hotels.map(hotel => (
                    <div key={hotel.id} className="hotel-card">
                        <h3>{hotel.name}</h3>
                        <p>{hotel.description}</p>
                        <p>Location: {hotel.location}</p>
                        <p>Price: ${hotel.price}/night</p>
                        <p>Rating: {hotel.rating}/5</p>
                        {hotel.imageUrl && (
                            <img src={hotel.imageUrl} alt={hotel.name} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HotelList;