import { User } from '../user/user.model'
import { TBooking } from './booking.interface'
import { bookingModels } from './booking.model'
import { JwtPayload } from 'jsonwebtoken'
import noDataFound from '../../utils/notDataFound'
import httpStatus from 'http-status'
import { carModels } from '../car/car.model'
import { searchQuery } from './booking.utils'
import AppError from '../../errors/AppError'

const createBookingIntoDB = async (email: string, payload: TBooking) => {
  const user = await User.findOne({ email: email })

  if (!email) {
    noDataFound({
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'You have no access',
      data: '',
    })
  }

  if (!user) {
    noDataFound({
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'No data found',
      data: '',
    })
  }

  const bookingCar = await bookingModels.BookingModel.create({
    ...payload,
    user: user?._id,
  })

  const findOne = await carModels.carModel.findByIdAndUpdate(bookingCar?.car, {
    status: 'unavailable',
  })

  if (!findOne) {
    noDataFound({
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'No data found',
      data: findOne,
    })
  }

  const result = await bookingModels.BookingModel.findById(bookingCar._id)
    .populate('user')
    .populate('car')

  return result
}

const getBookingsFromDB = async (query: Record<string, unknown>) => {
  try {
    return await searchQuery(query)
  } catch (error) {
    throw new AppError(httpStatus.NOT_FOUND, `${error}`)
  }
}

const getUserSpecificBookingsFromDB = async (email: JwtPayload) => {
  // Find the data record(s) associated with the user

  if (!email) {
    noDataFound({
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'You have no access',
      data: email,
    })
  }

  const user = await User.findOne({ email: email })

  if (!user) {
    noDataFound({
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'No data found',
      data: user,
    })
  }

  const result = await bookingModels.BookingModel.find({ user: user?._id })
    .populate('user')
    .populate('car')
  return result
}

const updateBookingStatusIntoDB = async (id: string, payload: boolean) => {
  const booking = await bookingModels.BookingModel.findByIdAndUpdate(
    id,
    { approved: payload },
    { new: true },
  )

  if (!booking) {
    noDataFound({
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'No data found',
      data: booking,
    })
  }
  return booking
}

const cancelBookingIntoDB = async (id: string, payload: boolean) => {
  const result = await bookingModels.BookingModel.findByIdAndUpdate(
    id,
    {isCancel: payload},
    { new: true },
  )
  console.log(result)

  return result
}

export const bookingServices = {
  createBookingIntoDB,
  getBookingsFromDB,
  getUserSpecificBookingsFromDB,
  updateBookingStatusIntoDB,
  cancelBookingIntoDB,
}
