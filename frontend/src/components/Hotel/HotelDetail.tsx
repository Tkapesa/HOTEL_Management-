import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getHotelDetails } from '../../services/api';
import './HotelDetail.css';

// Define types locally
interface Room {
    id: string;
    type: string;
    price: number;
}

interface Hotel {
    id: string;
    name: string;
    description: string;
    location: string;
    rooms: Room[];
}

interface RouteParams {
    id: string;
}

const HotelDetail: React.FC = () => {
    const { id } = useParams<RouteParams>();
    const [hotel, setHotel] = useState<Hotel | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchHotelDetails = async () => {
            if (!id) return;
            
            try {
                const response = await getHotelDetails(id);
                setHotel(response.data); // Extract data from Axios response
            } catch (err) {
                setError('Failed to fetch hotel details');
            } finally {
                setLoading(false);
            }
        };

        fetchHotelDetails();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!hotel) return <div>Hotel not found</div>;

    return (
        <div className="hotel-detail">
            <h1>{hotel.name}</h1>
            <p>{hotel.description}</p>
            <p>Location: {hotel.location}</p>
            <h2>Rooms</h2>
            <ul>
                {hotel.rooms.map(room => (
                    <li key={room.id}>
                        {room.type} - ${room.price} per night
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HotelDetail;