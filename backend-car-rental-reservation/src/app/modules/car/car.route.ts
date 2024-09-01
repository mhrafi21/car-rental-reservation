import { TUserRole } from './../user/user.interface'
import express from 'express'

import validateRequest from '../../middlewares/validateRequest'
import { carController } from './car.controller'
import { carValidation } from './car.validation'

import { USER_ROLE } from '../user/user.constant'
import { auth } from '../Auth/auth'

const router = express.Router()

router.post(
  '/',
  // auth(USER_ROLE.ADMIN as TUserRole),
  validateRequest(carValidation.carValidationSchema),
  carController.createCar,
)

router.get('/', carController.getAllCar)

router.get('/:id', carController.getSingleCar)

router.put(
  '/return',
  auth(USER_ROLE.ADMIN as TUserRole),
  carController.updateBookingCar,
)

router.put(
  '/:id',
  auth(USER_ROLE.ADMIN as TUserRole),
  validateRequest(carValidation.updateCarValidationSchema),
  carController.updateCar,
)



router.delete(
  '/:id',
  auth(USER_ROLE.ADMIN as TUserRole),
  carController.softDeleteCar,
)

export const carRoutes = router
