import { bookingModels } from '../booking/booking.model'
import { TCar } from './car.interface'
import { carModels } from './car.model'
import { priceCalculate } from './car.utils'
import noDataFound from '../../utils/notDataFound'
import httpStatus from 'http-status'
import { TBooking, TCarBooking } from '../booking/booking.interface'

const createCarIntoDB = async (payload: TCar) => {
  const result = await carModels.carModel.create(payload)
  return result
}

const getAllCarFromDB = async () => {
  const result = await carModels.carModel.find({})
  return result
}

const getSingleCarFromDB = async (id: string) => {
  const result = await carModels.carModel.findById(id)
  return result
}

const updateCarFromDB = async (id: string, payload: TCar) => {
  const { features, ...carInfo } = payload

  const updateQuery: Partial<any> = { $set: carInfo }

  if (features) {
    updateQuery.$push = { features: { $each: features } }
  }

  const result = await carModels.carModel.findByIdAndUpdate(id, updateQuery, {
    timestamps: true,
    new: true,
    runValidators: true,
  })

  return result
}

const updateBookingCarIntoDB = async (id: string, endTime: string) => {
  const booking = await bookingModels.BookingModel.findById(id as string)
    .populate('car')
    .populate('user')

  const totalCost = priceCalculate(booking as any, endTime as string)

  const result = await bookingModels.BookingModel.findByIdAndUpdate(
    booking?._id,
    {
      $set: {
        endTime,
        totalCost,
      },
    },
    { new: true, runValidators: true },
  )
    .populate('user')
    .populate('car')

  const findOne = await carModels.carModel.findByIdAndUpdate(
    result?.car,
    {
      status: 'available',
    },
    {
      new: true,
      runValidators: true,
    },
  )

  if (!findOne) {
    noDataFound({
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'No data found',
      data: findOne,
    })
  }

  const bookingResult = await bookingModels.BookingModel.findById(id)
    .populate('user')
    .populate('car')
  return bookingResult
}

const softDeleteCarFromDB = async (id: string) => {
  const result = await carModels.carModel.findByIdAndDelete(id, {
    new: true,
    runValidators: true,
  })

  return result
}

export const carServices = {
  createCarIntoDB,
  getAllCarFromDB,
  getSingleCarFromDB,
  updateCarFromDB,
  updateBookingCarIntoDB,
  softDeleteCarFromDB,
}
