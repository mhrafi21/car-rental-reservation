import { createUserIntoDB, getAllUsersFromDB, loginUserFromDB, updateStatusIntoDB, updateUserProfileIntoDB } from './user.service'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'

import { TUser } from './user.interface'
import httpStatus from 'http-status'

const createUser = catchAsync(async (req, res) => {

  const result = await createUserIntoDB(req.body as TUser)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'User registered successfully',
    data: result,
  })
})

const loginUser = catchAsync(async (req, res) => {
  const { result, token } = await loginUserFromDB(req.body as TUser)


  if (result === null) {
    return sendResponse(res, {
      success: false,
      statusCode: 200,
      message: 'Invalid email or password',
      data: null,
    })
  }
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'User logged in successfully',
    token: token,
  })
})

const getAllUser = catchAsync(async(req,res) => {
  const result = await getAllUsersFromDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'All Users',
    data: result,
  })
})

const updateRoleOrStatus = catchAsync(async(req,res) => {
const payload = req.body
  const result = await updateStatusIntoDB(req.params.id as string, payload);
    sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Status updated',
    data: result,
  })
})

const updateUserProfile = catchAsync(async(req,res) => {
  const {id, name} = req.body;
  console.log(id,name);
  const result = await updateUserProfileIntoDB(id as string, name as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User Profile updated',
    data: result,
  })
})

export const UserController = {
  createUser,
  loginUser,
  getAllUser,
  updateRoleOrStatus,
  updateUserProfile
}
