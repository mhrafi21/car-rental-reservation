import { Response } from 'express'

type Data<T> = {
  statusCode: number
  success: boolean
  message?: string
  data: T
}

const noDataFound = <T>(data: Data<T>) => {
  return (res: Response) => {
    res.status(data?.statusCode).json({
      success: data?.success,
      statusCode: data?.statusCode,
      message: data?.message,
      data: data?.data,
    })
  }
}

export default noDataFound
