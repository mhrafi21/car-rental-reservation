import { JwtPayload } from 'jsonwebtoken'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { bookingServices } from './booking.services'

const createBooking = catchAsync(async (req, res) => {
  const { email } = req.user as JwtPayload
  const result = await bookingServices.createBookingIntoDB(email as string, {
    car: req.body.carId,
    ...req.body,
  })

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Booking created successfully!',
    data: result,
  })
})

const getBookings = catchAsync(async (req, res) => {
  const result = await bookingServices.getBookingsFromDB(
    req.query as Record<string, unknown>,
  )
  if (!result) {
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
    message: 'Bookings retrieved successfully',
    data: result,
  })
})

const getUserSpecificBookings = catchAsync(async (req, res) => {
  const { email } = req.user as JwtPayload

  const result = await bookingServices.getUserSpecificBookingsFromDB(email)

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
    message: 'My Bookings retrieved successfully',
    data: result,
  })
})

const updateBooking = catchAsync(async (req, res) => {
  const { id } = req.params
  const {approved} = req.body;
  const result = await bookingServices.updateBookingStatusIntoDB(id as string, approved as boolean)

  if (!result) {
    sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'Booking not found',
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

const cancelBooking = catchAsync(async(req, res) => {
    const {isCancel} = req.body;
  const result = await bookingServices.cancelBookingIntoDB(req.params.id as string , isCancel as boolean)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Booking canceled successfully',
    data: result,
  })
})

export const bookingControllers = {
  createBooking,
  getBookings,
  getUserSpecificBookings,
  updateBooking,
  cancelBooking
}
