import React, { useState } from "react";
import { TBookingState, TCar } from "../../interfaces";
import moment from "moment";
import { useForm, SubmitHandler } from 'react-hook-form';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { useAppDispatch } from "../../redux/hooks";
import { setBooking } from "../../redux/features/booking/bookingSlice";
import { useNavigate } from "react-router-dom";

const ProductDetail: React.FC<{ product: TCar }> = ({ product }) => {
  // const [addToBooking] = useCreateBookingCarMutation(undefined);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<TBookingState>();
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  
  const onSubmit: SubmitHandler<TBookingState> = async(data) => {
    const formattedDate = moment(data.date).format('YYYY-MM-DD');
    const formattedTime = moment(data.time, 'HH:mm').format('HH:mm');
    
    const bookingData = {
      carId: product._id,
      date: formattedDate,
      startTime: formattedTime,
      booking: product,
      childSeat: data.childSeat,
      gps: data.gps,
    }

    dispatch(setBooking(bookingData))
    navigate("/booking")
  };

  return (
    <div className="py-8 dark:bg-gray-700 dark:text-white dark:px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Zoom>
            <img
              src={product?.image}
              alt={product?.name}
              className="rounded-lg shadow-md object-cover w-full"
            />
          </Zoom>
        </div>
        <div className="flex flex-col">
          <h2 className="text-3xl font-semibold mb-4">{product?.name}</h2>
          <div className="flex mb-4">
            <span className="text-gray-600 mr-2 dark:text-white">Ratings:</span>
            {product?.reviews + "/5"}
          </div>
          <p className="mb-4">Category: {product?.category}</p>
          <p className="mb-4">
            Status:{" "}
            <span className="text-green-600 font-semibold">
              {product?.status}
            </span>
          </p>
          <p className="text-gray-600 mb-6 dark:text-white">{product?.description}</p>
          <div className=" mb-4">
            <span className="text-2xl font-semibold dark:text-white text-gray-900 mr-4">
              ${product?.pricePerHour.toFixed(2)}/hour
            </span>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-4">
              <h5 className="font-semibold mb-4">Please select the booking time and date</h5>
              <div className="md:flex justify-between gap-3">
                <div className="mb-4 md:w-1/2">
                  <label
                    htmlFor="date"
                    className="block text-sm dark:text-white font-medium text-gray-700"
                  >
                    Select Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    {...register('date', { required: true })}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className={`mt-1 block w-full p-2 border ${
                      errors.date ? 'border-red-500' : 'border-gray-300'
                    } rounded-md focus:ring-indigo-500 dark:text-black focus:border-indigo-500 sm:text-sm`}
                  />
                  {errors.date && <p className="text-red-500 text-sm mt-1">Date is required</p>}
                </div>
                <div className="md:w-1/2">
                  <label
                    htmlFor="time"
                    className="block text-sm dark:text-white font-medium text-gray-700"
                  >
                    Select Time
                  </label>
                  <input
                    type="time"
                    id="time"
                    {...register('time', { required: true })}
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className={`mt-1 block w-full p-2 border ${
                      errors.time ? 'border-red-500' : 'border-gray-300'
                    } rounded-md dark:text-black  focus:ring-indigo-500  focus:border-indigo-500 sm:text-sm`}
                  />
                  {errors.time && <p className="text-red-500 text-sm mt-1">Time is required</p>}
                </div>

                
              {/* Additional Options */}
              </div>
            </div>
              <div>
                <h3 className="text-xl font-semibold">Additional Options</h3>
                <div className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    id="gps"
                    className="mr-2"
                    {...register("gps")}
                  />
                  <label htmlFor="gps" className="text-gray-700 dark:text-white">
                    GPS
                  </label>
                </div>
                <div className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    id="childSeat"
                    className="mr-2"
                    {...register("childSeat")}
                  />
                  <label htmlFor="childSeat" className="text-gray-700 dark:text-white">
                    Child Seat
                  </label>
                </div>
              </div>
                
            <div className="">
              <button
                type="submit"
                className={`mt-6 px-4 py-2 rounded-md text-white ${
                  product?.status === 'available'
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
                disabled={product?.status !== 'available'}
              >
                {product?.status === 'available' ? 'Book Now' : 'Unavailable'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
