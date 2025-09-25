export const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

export const validatePassword = (password: string): boolean => {
    return password.length >= 6;
};

export const validateHotelData = (data: any): boolean => {
    return data.name && data.location && Array.isArray(data.rooms);
};

export const validateRoomData = (data: any): boolean => {
    return data.type && data.price && data.availability !== undefined;
};

export const validateBookingData = (data: any): boolean => {
    return data.userId && data.hotelId && data.roomId && data.dates;
};