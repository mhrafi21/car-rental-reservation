import { bookingModels } from './booking.model'

export const searchQuery = async (query: Record<string, unknown>) => {
  const searchCriteria: Record<string, unknown> = {}

  if (query?.carId) {
    searchCriteria.car = query?.carId
  }

  if (query?.date) {
    searchCriteria.date = query?.date
  }


  const result = await bookingModels.BookingModel.find(searchCriteria)
    .populate('user')
    .populate('car')
  return result
}
