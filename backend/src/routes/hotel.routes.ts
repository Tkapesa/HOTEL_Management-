import { Router } from 'express';
import { createHotel, getHotels } from '../controllers/hotel.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

// Route to create a new hotel
router.post('/', authMiddleware, createHotel);

// Route to fetch all hotels
router.get('/', getHotels);

export default router;