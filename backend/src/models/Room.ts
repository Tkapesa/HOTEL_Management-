import { Schema, model } from 'mongoose';

const roomSchema = new Schema({
    type: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    availability: {
        type: Boolean,
        default: true,
    },
    hotel: {
        type: Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true,
    },
}, { timestamps: true });

const Room = model('Room', roomSchema);

export default Room;