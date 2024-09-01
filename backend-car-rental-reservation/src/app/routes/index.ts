import { Router } from 'express'

import { carRoutes } from '../modules/car/car.route'
import { bookingRoutes } from '../modules/booking/booking.route'
import { userRouter } from '../modules/user/user.route'

const router = Router()

const moduleRoutes = [
  { path: '/auth', route: userRouter },
  { path: '/cars', route: carRoutes },
  { path: '/bookings', route: bookingRoutes },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
