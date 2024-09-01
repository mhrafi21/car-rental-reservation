import { Request, Response } from 'express'

const allNotFound = (req: Request, res: Response) => {
  return res.status(404).json({
    success: false,
    message: 'API NOT MATCHED!',
    error: '',
  })
}

export default allNotFound
