import mongoose, { Schema } from 'mongoose'
import { TCar } from './car.interface'

const carSchema = new Schema<TCar>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    color: { type: String, required: true },
    isElectric: { type: Boolean, required: true },
    image: {type: String, required: true},
    category: {type: String, required: true},
    reviews: {type: Number, required: true},
    location: {type: String, required: true},
    status: {
      type: String,
      enum: ['available', 'unavailable'],
      default: 'available',
    },
    features: { type: [String], required: true },
    pricePerHour: { type: Number, required: true },
    isDeleted: { type: Boolean, required: true, default: false },
  },
  { timestamps: true },
)

const carModel = mongoose.model<TCar>('Car', carSchema)

export const carModels = { carModel }
