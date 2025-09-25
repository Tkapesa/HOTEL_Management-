export type User = {
    id: string;
    username: string;
    email: string;
    password: string;
    roles: string[];
};

export type Hotel = {
    id: string;
    name: string;
    location: string;
    availableRooms: number;
};

export type Room = {
    id: string;
    hotelId: string;
    type: string;
    price: number;
    availability: boolean;
};

export type Booking = {
    id: string;
    userId: string;
    hotelId: string;
    roomId: string;
    status: 'confirmed' | 'canceled' | 'pending';
    checkInDate: string;
    checkOutDate: string;
};