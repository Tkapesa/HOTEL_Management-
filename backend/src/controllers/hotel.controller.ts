import { Request, Response } from 'express';
import Hotel from '../models/Hotel';

// Fetch all hotels
export const getAllHotels = async (req: Request, res: Response) => {
    try {
        const hotels = await Hotel.find();
        res.status(200).json(hotels);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching hotels', error });
    }
};

// Create a new hotel
export const createHotel = async (req: Request, res: Response) => {
    const { name, location, availableRooms } = req.body;

    const newHotel = new Hotel({
        name,
        location,
        availableRooms,
    });

    try {
        const savedHotel = await newHotel.save();
        res.status(201).json(savedHotel);
    } catch (error) {
        res.status(500).json({ message: 'Error creating hotel', error });
    }
};

// Fetch a hotel by ID
export const getHotelById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const hotel = await Hotel.findById(id);
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }
        res.status(200).json(hotel);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching hotel', error });
    }
};

// Update a hotel
export const updateHotel = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedHotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }
        res.status(200).json(updatedHotel);
    } catch (error) {
        res.status(500).json({ message: 'Error updating hotel', error });
    }
};

// Delete a hotel
export const deleteHotel = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const deletedHotel = await Hotel.findByIdAndDelete(id);
        if (!deletedHotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }
        res.status(200).json({ message: 'Hotel deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting hotel', error });
    }
};