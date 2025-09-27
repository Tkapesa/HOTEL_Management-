import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api/v1', // Updated to match our backend server
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth API calls
export const registerUser = async (userData) => {
  return await api.post('/auth/register', userData);
};

export const loginUser = async (credentials) => {
  return await api.post('/auth/login', credentials);
};

// Hotel API calls
export const fetchHotels = async () => {
  return await api.get('/hotels');
};

export const fetchHotelDetails = async (hotelId) => {
  return await api.get(`/hotels/${hotelId}`);
};

// Add aliases for components that expect different function names
export const getHotels = fetchHotels;
export const getHotelDetails = fetchHotelDetails;
export const getHotelById = fetchHotelDetails;

// Room API calls
export const fetchRooms = async (hotelId) => {
  return await api.get(`/hotels/${hotelId}/rooms`);
};

export const getRooms = fetchRooms;

// Booking API calls
export const createBooking = async (bookingData) => {
  return await api.post('/bookings', bookingData);
};

export const fetchBookingHistory = async (userId) => {
  return await api.get(`/bookings/user/${userId}`);
};

// Add aliases for components that expect different function names
export const getBookingHistory = fetchBookingHistory;
export const getUserBookings = fetchBookingHistory;

// User API calls
export const getUserProfile = async () => {
  return await api.get('/auth/profile');
};

// Payment API calls
export const createPaymentIntent = async (paymentData) => {
  return await api.post('/payments', paymentData);
};

export default api;