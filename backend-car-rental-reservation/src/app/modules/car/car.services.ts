import { bookingModels } from '../booking/booking.model'
import { TCar } from './car.interface'
import { carModels } from './car.model'
import { priceCalculate } from './car.utils'
import noDataFound from '../../utils/notDataFound'
import httpStatus from 'http-status'
import AppError from '../../errors/AppError'

const createCarIntoDB = async (payload: TCar) => {
  const result = await carModels.carModel.create(payload)
  return result
}

const getAllCarFromDB = async (payload : Record<string, unknown>) => {

  try {
    const { search, location, status, category, minPrice, maxPrice, sort, page = 1, limit = 10 } = payload
    console.log(payload)

    let filterQuery = {}

    if(location){
      filterQuery = { $regex: location, $options: "i" };
   }
 
   if(status){
      filterQuery = { status: status }
   }

    // Searching product using product name or description
    if (search) {
      filterQuery = {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
        ],
      }
    }

    // Filter by price - min to max
    if (minPrice || maxPrice) {
      if (minPrice && !maxPrice) {
        filterQuery = { ...filterQuery, pricePerHour: { $gte: Number(minPrice) } }
      }
      if (!minPrice && maxPrice) {
        filterQuery = { ...filterQuery, pricePerHour: { $lte: Number(maxPrice) } }
      }
      if (minPrice && maxPrice) {
        filterQuery = {
          ...filterQuery,
          pricePerHour: { $gte: Number(minPrice), $lte: Number(maxPrice) },
        }
      }
    }

    // Filter by category
    if (category) {
      filterQuery = { ...filterQuery, category }
    }

    // Sorting the products by price
    let sortOption = {}

    if (sort) {
      sortOption = sort === 'asc' ? { pricePerHour: 1 } : { pricePerHour: -1 }
    }

    // pagination 

    const limitNum = Number(limit);
    const skipNum = (Number(page) - 1) * Number(limit);

    const count = await carModels.carModel.countDocuments();
    const totalPages = Math.ceil(count / Number(limit));
    const result = await carModels.carModel.find(filterQuery).sort(sortOption).limit(limitNum).skip(skipNum)

    return result

  } catch (error) {
    console.error('Error fetching products:', error)
  }
}

const getSingleCarFromDB = async (id: string) => {
  const result = await carModels.carModel.findById(id)
  return result
}

const updateCarFromDB = async (id: string, payload: TCar) => {
  const { features, ...carInfo } = payload

  const updateQuery: Partial<any> = { $set: carInfo }

  const isExistFeatures = await carModels.carModel.findById(id)

  if (!isExistFeatures) {
    throw new AppError(httpStatus.NOT_FOUND, 'Not found!')
  }

  const checkExists = isExistFeatures?.features?.find(feature =>
    features.includes(feature),
  )
  if (checkExists) {
    console.log('Already exists')
  } else {
    updateQuery.$push = { features: { $each: features } }
  }

  const result = await carModels.carModel.findByIdAndUpdate(id, updateQuery, {
    timestamps: true,
    new: true,
    runValidators: true,
  })

  return result
}

const updateBookingCarIntoDB = async (id: string, endTime: string) => {
  const booking = await bookingModels.BookingModel.findById(id as string)
    .populate('car')
    .populate('user')

  const totalCost = priceCalculate(booking as any, endTime as string)

  const result = await bookingModels.BookingModel.findByIdAndUpdate(
    booking?._id,
    {
      $set: {
        endTime,
        totalCost,
      },
    },
    { new: true, runValidators: true },
  )
    .populate('user')
    .populate('car')

  const findOne = await carModels.carModel.findByIdAndUpdate(
    result?.car,
    {
      status: 'available',
    },
    {
      new: true,
      runValidators: true,
    },
  )

  if (!findOne) {
    noDataFound({
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'No data found',
      data: findOne,
    })
  }

  const bookingResult = await bookingModels.BookingModel.findById(id)
    .populate('user')
    .populate('car')
  return bookingResult
}

const softDeleteCarFromDB = async (id: string) => {
  const result = await carModels.carModel.findByIdAndDelete(id, {
    new: true,
    runValidators: true,
  })

  return result
}

export const carServices = {
  createCarIntoDB,
  getAllCarFromDB,
  getSingleCarFromDB,
  updateCarFromDB,
  updateBookingCarIntoDB,
  softDeleteCarFromDB,
}
