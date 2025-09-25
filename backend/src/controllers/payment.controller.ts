import { Request, Response } from 'express';
import { PaymentService } from '../services/payment.service';

const paymentService = new PaymentService();

export const createPaymentIntent = async (req: Request, res: Response) => {
    try {
        const { amount, currency } = req.body;
        const paymentIntent = await paymentService.createPaymentIntent(amount, currency);
        res.status(200).json(paymentIntent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const handleWebhook = async (req: Request, res: Response) => {
    try {
        const event = req.body;
        await paymentService.handleWebhook(event);
        res.status(200).send('Webhook received');
    } catch (error) {
        res.status(400).send(`Webhook Error: ${error.message}`);
    }
};