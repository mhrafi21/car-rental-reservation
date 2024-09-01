import { Schema, model } from 'mongoose'
import { TUser } from './user.interface'

const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true },
    terms: { type: Boolean, required: true },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    status: {
      type: String,
      enum: ['active','blocked'],
      default: 'active',
    }
  },
  { timestamps: true },
)

export const User = model<TUser>('User', userSchema)
