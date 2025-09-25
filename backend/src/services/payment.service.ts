import { Stripe } from 'stripe';
import { Booking } from '../models/Booking';
import { User } from '../models/User';
import { Hotel } from '../models/Hotel';
import { Room } from '../models/Room';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});

export const createPaymentIntent = async (amount: number, currency: string) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });
    return paymentIntent;
  } catch (error) {
    throw new Error(`Payment Intent creation failed: ${error.message}`);
  }
};

export const processPayment = async (paymentIntentId: string) => {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    if (paymentIntent.status === 'succeeded') {
      return paymentIntent;
    } else {
      throw new Error('Payment not successful');
    }
  } catch (error) {
    throw new Error(`Payment processing failed: ${error.message}`);
  }
};

export const handleWebhook = async (req: any) => {
  const event = req.body;

  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      // Handle successful payment here (e.g., update booking status)
      break;
    case 'payment_intent.payment_failed':
      // Handle payment failure here
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
};