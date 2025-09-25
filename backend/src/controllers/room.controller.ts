import { Request, Response } from 'express';
import Room from '../models/Room';

// Fetch all room types
export const getAllRoomTypes = async (req: Request, res: Response) => {
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching room types', error });
    }
};

// Fetch room availability
export const checkRoomAvailability = async (req: Request, res: Response) => {
    const { roomId, checkInDate, checkOutDate } = req.body;

    try {
        const room = await Room.findById(roomId);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }

        // Logic to check availability based on booking dates
        // This is a placeholder for actual availability logic
        const isAvailable = true; // Replace with actual check

        res.status(200).json({ roomId, isAvailable });
    } catch (error) {
        res.status(500).json({ message: 'Error checking room availability', error });
    }
};