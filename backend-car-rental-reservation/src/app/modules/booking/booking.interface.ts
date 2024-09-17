import { ObjectId, Types } from 'mongoose'
import { TCar } from '../car/car.interface'
import { TUser } from '../user/user.interface'

export type TBooking = {
  date: string
  user: Types.ObjectId
  car: Types.ObjectId
  startTime: string
  endTime: string | null
  paymentStatus: 'pending' | 'paid' | 'cancelled'
  name: string
  address: string
  phone: string
  license: string
  nid: string
  gps: boolean
  childSeat: boolean
  totalCost?: number
  approved: boolean
  isCancel: boolean
}

export type TCarBooking = {
  _id: ObjectId
  date: string
  user: TUser
  car: TCar
  startTime: string
  endTime: string | null
  totalCost: number
  approved: boolean
}
