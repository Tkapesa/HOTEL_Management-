import { Request, Response } from 'express';
import Booking from '../models/Booking';
import Hotel from '../models/Hotel';
import Room from '../models/Room';

// Create a new booking
export const createBooking = async (req: Request, res: Response) => {
    const { userId, hotelId, roomId, checkInDate, checkOutDate } = req.body;

    try {
        const hotel = await Hotel.findById(hotelId);
        const room = await Room.findById(roomId);

        if (!hotel || !room) {
            return res.status(404).json({ message: 'Hotel or Room not found' });
        }

        const newBooking = new Booking({
            user: userId,
            hotel: hotelId,
            room: roomId,
            checkInDate,
            checkOutDate,
            status: 'confirmed',
        });

        await newBooking.save();
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(500).json({ message: 'Error creating booking', error });
    }
};

// Retrieve a booking by ID
export const getBookingById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const booking = await Booking.findById(id).populate('hotel room user');
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving booking', error });
    }
};

// Retrieve all bookings for a user
export const getUserBookings = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        const bookings = await Booking.find({ user: userId }).populate('hotel room');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving bookings', error });
    }
};