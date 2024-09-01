import jwt from 'jsonwebtoken'
import httpStatus from 'http-status'
import { TUser } from './user.interface'
import { User } from './user.model'
import config from '../../config'
import AppError from '../../errors/AppError'

const createUserIntoDB = async (payload: TUser) => {
  // create a user object

  const isAlreadyRegister = await User.findOne({ email: payload?.email })

  if (!isAlreadyRegister) {
    const result = await User.create(payload)
    return result
  } else {
    throw new AppError(httpStatus.ALREADY_REPORTED, 'User is already register')
  }
}

const loginUserFromDB = async (payload: TUser) => {
  const result = await User.findOne({
    email: payload?.email,
    password: payload?.password,
  })
  // generate token for a login user

  const SignInToken = jwt.sign(
    {
      email: result?.email,
      role: result?.role,
      name: result?.name,
    },
    config.JWT_SECRET as string,
    { expiresIn: '5d' },
  )

  return {
    result,
    token: SignInToken,
  }
}

const getAllUsersFromDB = async () => {
  const result = await User.find({})
    .sort({ createdAt: -1 })
    .select('name role status email')
  return result
}

const updateStatusIntoDB = async (id: string, payload: TUser) => {
  console.log(payload)
  const result = await User.findByIdAndUpdate(
    id,
    {
      $set: {
        role: payload?.role,
        status: payload?.status,
      },
    },
    { new: true },
  ).select("name role status email")

  return result
}

export {
  createUserIntoDB,
  loginUserFromDB,
  getAllUsersFromDB,
  updateStatusIntoDB,
}

