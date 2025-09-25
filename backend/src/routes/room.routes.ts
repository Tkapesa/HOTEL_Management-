import { Router } from 'express';
import { getRooms, createRoom, updateRoom, deleteRoom } from '../controllers/room.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

// Get all rooms
router.get('/', getRooms);

// Create a new room
router.post('/', authMiddleware, createRoom);

// Update a room
router.put('/:id', authMiddleware, updateRoom);

// Delete a room
router.delete('/:id', authMiddleware, deleteRoom);

export default router;