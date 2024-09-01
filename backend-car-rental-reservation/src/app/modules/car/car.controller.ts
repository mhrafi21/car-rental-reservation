import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { TCar } from './car.interface'
import { carServices } from './car.services'
import { bookingServices } from '../booking/booking.services'

const createCar = catchAsync(async (req, res) => {
  const result = await carServices.createCarIntoDB(req.body as TCar)
  if (!result) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'No Data Found',
      data: result,
    })
  }
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Car create successfully!',
    data: result,
  })
})

const getAllCar = catchAsync(async (req, res) => {
  const result = await carServices.getAllCarFromDB()

  if (!result?.length) {
    sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'No Data Found',
      data: result,
    })
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Cars retrieved successfully',
    data: result,
  })
})

const getSingleCar = catchAsync(async (req, res) => {
  const result = await carServices.getSingleCarFromDB(req.params.id)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'A Car retrieved successfully',
    data: result,
  })
})

const updateCar = catchAsync(async (req, res) => {
  const result = await carServices.updateCarFromDB(
    req.params.id as string,
    req.body as TCar,
  )
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Car updated successfully successfully',
    data: result,
  })
})

const updateBookingCar = catchAsync(async (req, res) => {
  const { bookingId, endTime } = req.body

  console.log(req.body);

  const result = await carServices.updateBookingCarIntoDB(
    bookingId as string,
    endTime as string,
  )
  if (!result) {
    sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'Not not found',
      data: result,
    })
  }
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Booking updated successfully',
    data: result,
  })
})

const getAllBookings = catchAsync(async (req, res) => {
  const result = await bookingServices.getBookingsFromDB(req.query)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bookings retrieved successfully',
    data: result,
  })
})

const softDeleteCar = catchAsync(async (req, res) => {
  const result = await carServices.softDeleteCarFromDB(req.params.id as string)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Car deleted successfully',
    data: result,
  })
})

export const carController = {
  createCar,
  getAllCar,
  getSingleCar,
  updateCar,
  updateBookingCar,
  getAllBookings,
  softDeleteCar,
}
