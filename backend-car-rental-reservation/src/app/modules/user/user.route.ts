import express from 'express'
import { UserController } from './user.controller'
import { userValidation } from './user.validation'
import validateRequest from '../../middlewares/validateRequest'

const router = express.Router()

router.post(
  '/signup',
  validateRequest(userValidation.userValidationSchema),
  UserController.createUser,
)

router.post('/signin', UserController.loginUser)

router.get('/users', UserController.getAllUser)

router.put("/users/:id", UserController.updateRoleOrStatus);

export const userRouter = router
