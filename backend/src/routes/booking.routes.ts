import { Router } from 'express';
import { createBooking, getBookings } from '../controllers/booking.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// Route to create a new booking
router.post('/', authenticate, createBooking);

// Route to retrieve all bookings for the authenticated user
router.get('/', authenticate, getBookings);

export default router;