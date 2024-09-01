import { TUserRole } from './../user/user.interface'
import httpStatus from 'http-status'

import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../../config'

import catchAsync from '../../utils/catchAsync'
import { Request, Response, NextFunction } from 'express'

export const auth = (...adminAuth: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // if the token is send from the client

    const tokenWithBearer = req.headers.authorization
    const token = tokenWithBearer?.split(' ')[1]

    if (!token) {
      res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        statusCode: httpStatus.UNAUTHORIZED,
        message: 'You have no access to this route',
      })
    }

    // Checking if the token is valid
    jwt.verify(
      token as string,
      config.JWT_SECRET as string,
      function (err, decoded) {
        if (err) {
          res.status(httpStatus.UNAUTHORIZED).json({
            success: false,
            statusCode: httpStatus.UNAUTHORIZED,
            message: 'You have no access to this route',
          })
        }
        // decoded undefined

        const { role } = decoded as JwtPayload

        if (adminAuth && !adminAuth.includes(role)) {
          res.status(httpStatus.UNAUTHORIZED).json({
            success: false,
            statusCode: httpStatus.UNAUTHORIZED,
            message: 'You have no access to this route',
          })
        }

        req.user = decoded as JwtPayload

        next()
      },
    )
  }) //
}

export const authUser = (...userAuth: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // if the token is send from the client

    const tokenWithBearer = req.headers.authorization
    const token = tokenWithBearer?.split(' ')[1]

    if (!token) {
      res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        statusCode: httpStatus.UNAUTHORIZED,
        message: 'You have no access to this route',
      })
    }

    // Checking if the token is valid

    jwt.verify(
      token as string,
      config.JWT_SECRET as string,
      function (err, decoded) {
        if (err) {
          res.status(httpStatus.UNAUTHORIZED).json({
            success: false,
            statusCode: httpStatus.UNAUTHORIZED,
            message: 'You have no access to this route',
          })
        }
        // decoded undefined

        const { role } = decoded as JwtPayload

        if (userAuth && !userAuth.includes(role)) {
          res.status(httpStatus.UNAUTHORIZED).json({
            success: false,
            statusCode: httpStatus.UNAUTHORIZED,
            message: 'You have no access to this route',
          })
        }

        req.user = decoded as JwtPayload

        next()
      },
    )
  }) //
}
