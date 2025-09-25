import { Router } from 'express';
import { createPaymentIntent, handleWebhook } from '../controllers/payment.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// Route to create a payment intent
router.post('/create-payment-intent', authenticate, createPaymentIntent);

// Route to handle payment webhook
router.post('/webhook', handleWebhook);

export default router;