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
    approved: {type: Boolean, default: false},
    isCancel: { type: Boolean, default: false },
  },
  { timestamps: true },
)

const BookingModel = mongoose.model<TBooking>('Booking', bookingSchema)

export const bookingModels = { BookingModel }
