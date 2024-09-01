import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { TCarBooking } from '../booking/booking.interface'

export const priceCalculate = (booking: TCarBooking, endTime: string) => {
  const start = new Date(`1970-01-01T${booking?.startTime}:00`)
  const end = endTime ? new Date(`1970-01-01T${endTime}:00`) : new Date()

  if (end < start) {
    throw new AppError(
      httpStatus.EXPECTATION_FAILED,
      'End time must be larger than start time!',
    )
  }

  const diffMs = end.getTime() - start.getTime()
  const diffHours = diffMs / 1000 / 60 / 60
  const totalCost = diffHours * booking?.car?.pricePerHour
  return totalCost.toFixed(2)
}
