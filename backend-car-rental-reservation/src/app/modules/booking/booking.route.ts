import express from 'express'
import { bookingControllers } from './booking.controller'
import validateRequest from '../../middlewares/validateRequest'
import { bookingValidation } from './booking.validation'
import { USER_ROLE } from '../user/user.constant'
import { auth, authUser } from '../Auth/auth'
import { TUserRole } from '../user/user.interface'
const router = express.Router()

router.post(
  '/',
  authUser(USER_ROLE.USER as TUserRole),
  validateRequest(bookingValidation.bookingValidationSchema),
  bookingControllers.createBooking,
)

router.get(
  '/',
  auth(USER_ROLE.ADMIN as TUserRole),
  bookingControllers.getBookings,
)

router.get(
  '/my-bookings',
  authUser(USER_ROLE.USER as TUserRole),
  bookingControllers.getUserSpecificBookings,
)

router.patch(
  '/:id',
  auth(USER_ROLE.ADMIN as TUserRole),
  bookingControllers.updateBooking,
)

router.patch(
  '/cancel/:id',
  auth(USER_ROLE.USER as TUserRole),
  bookingControllers.cancelBooking,
)

export const bookingRoutes = router
