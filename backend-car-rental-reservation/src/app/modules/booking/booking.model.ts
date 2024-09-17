import mongoose, { Schema } from 'mongoose'
import { TBooking } from './booking.interface'

const bookingSchema = new Schema<TBooking>(
  {
    date: {
      type: String,
      required: true,
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    car: {
      type: Schema.Types.ObjectId,
      ref: 'Car',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'cancelled'],
      default: 'pending',
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      default: null,
    },
    totalCost: {
      type: Number,
      default: 0,
    },
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    license: { type: String, required: true },
    nid: { type: String, required: true },
    gps: { type: Boolean, required: true },
    childSeat: { type: Boolean, required: true },
    approved: { type: Boolean, default: false },
    isCancel: { type: Boolean, default: false },
  },
  { timestamps: true },
)

const BookingModel = mongoose.model<TBooking>('Booking', bookingSchema)

export const bookingModels = { BookingModel }
