import React from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

import DefaultContainer from "../../../components/DefaultContainer";
import { TBookingState } from "../../../interfaces";
import { useNavigate } from "react-router-dom";
import { setConfirmBooking } from "../../../redux/features/booking/confirmBookingSlice";

const CarDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  
  const dispatch = useAppDispatch();
  
  const { carId, date, startTime, booking,childSeat,gps } = useAppSelector(
    (state) => state.booking
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TBookingState>();

  const onSubmit = (data: TBookingState) => {
   
    // Handle booking submission
    const bookingData = {
      carId,
      date,
      startTime,
      name: data.name,
      booking,
      address: data.address,
      phone: data.phone,
      license: data.license,
      nid: data.nid,
      gps: gps,
      childSeat:childSeat,
    }

    dispatch(setConfirmBooking(bookingData));
    navigate("/confirm-booking")
  };

  return (
    <div className="py-10">
      <DefaultContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Car Details Section */}
          <div className="car-details bg-white shadow-lg rounded-md p-6 mb-6">
            <h1 className="text-4xl font-bold mb-4">{booking?.name}</h1>

            <p className="text-gray-700 text-lg mb-6">{booking?.description}</p>
            <div className="features mb-6">
              <h2 className="text-xl font-semibold mb-2">Features:</h2>
              <ul className="list-disc list-inside">
                {booking?.features?.map((feature, index) => (
                  <li key={index} className="text-gray-600 text-md">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Booking Form */}
          <div className="booking-form bg-white shadow-lg rounded-md p-6">
            <h2 className="text-2xl font-bold mb-4">Booking Form</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Personal Details */}
              <div>
                <label
                  htmlFor="nid"
                  className="block text-gray-700 font-medium"
                >
                  NID/Passport
                </label>
                <input
                  type="text"
                  id="nid"
                  className="w-full border-gray-300 rounded-md p-3 mt-1"
                  {...register("nid", { required: true })}
                />
                {errors.nid && (
                  <p className="text-red-500 text-sm">
                    NID/Passport is required.
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="license"
                  className="block text-gray-700 font-medium"
                >
                  Driving License
                </label>
                <input
                  type="text"
                  id="license"
                  className="w-full border-gray-300 rounded-md p-3 mt-1"
                  {...register("license", { required: true })}
                />
                {errors.license && (
                  <p className="text-red-500 text-sm">
                    Driving License is required.
                  </p>
                )}
              </div>

              {/* Payment Information */}
              <div className="payment-section">
                <h3 className="text-xl font-semibold">Payment Information</h3>

                <div>
                  <label
                    htmlFor="name"
                    className="block text-gray-700 font-medium mt-3"
                  >
                 Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full border-gray-300 rounded-md p-3 mt-1"
                    {...register("name", {
                      required: true,
                
                    })}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">
                      Name
                    </p>
                  )}
                </div>

                <div className="flex flex-col">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-gray-700 font-medium"
                    >
                    Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full border-gray-300 rounded-md p-3 mt-1"
                      {...register("phone", {
                        required: true,
                      })}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm">
                        Enter phone number
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="Address"
                      className="block text-gray-700 font-medium"
                    >
                    Address
                    </label>
                    <textarea
                      id="address"
                      className="w-full border-gray-300 rounded-md p-3 mt-1"
                      {...register("address", {
                        required: true,
                      })}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm">
                       Enter Address
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700"
              >
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      </DefaultContainer>
    </div>
  );
};

export default CarDetailsPage;
