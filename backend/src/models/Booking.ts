import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
    user: mongoose.Types.ObjectId;
    hotel: mongoose.Types.ObjectId;
    room: mongoose.Types.ObjectId;
    checkInDate: Date;
    checkOutDate: Date;
    status: string; // e.g., 'confirmed', 'cancelled'
}

const BookingSchema: Schema = new Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    hotel: { type: mongoose.Types.ObjectId, ref: 'Hotel', required: true },
    room: { type: mongoose.Types.ObjectId, ref: 'Room', required: true },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    status: { type: String, enum: ['confirmed', 'cancelled'], default: 'confirmed' },
}, {
    timestamps: true,
});

export default mongoose.model<IBooking>('Booking', BookingSchema);