import React from "react";
import { useAppSelector } from "../../../../redux/hooks";
import DefaultContainer from "../../../../components/DefaultContainer";
import { TBookingState } from "../../../../interfaces";
import { useCreateBookingCarMutation } from "../../../../redux/baseApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const BookingConfirmation: React.FC = () => {
  const [addToBooking, { isLoading }] = useCreateBookingCarMutation(undefined);
  const navigate = useNavigate();
  const {
    carId,
    date,
    startTime,
    name,
    booking,
    address,
    phone,
    license,
    nid,
    gps,
    childSeat,
  } = useAppSelector((state) => state.confirmBooking);

  const handleConfirm = async (confirmBookingData: TBookingState) => {
   
    const res = await addToBooking(confirmBookingData).unwrap();
    if (res.success === true) {
      toast.success("Your order has been placed!");
      navigate("/dashboard/my-bookings")
    }
  };

  return (
    <div className="py-10 dark:bg-black">
      <DefaultContainer>
        <div className="max-w-3xl mx-auto p-6 bg-white dark:text-white dark:bg-gray-700 shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Booking Confirmation</h2>

          <div className="mb-6">
            <h3 className="text-lg font-semibold">Car Details</h3>
            <p>
              <strong>Car:</strong> {booking?.name}
            </p>
            <p>
              <strong>Date:</strong> {date}
            </p>
            <p>
              <strong>Time:</strong> {startTime}
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold">Personal Information</h3>
            <p>
              <strong>Name:</strong> {name}
            </p>
            <p>
              <strong>Phone:</strong> {phone}
            </p>
            <p>
              <strong>Email:</strong> {address}
            </p>
            <p>
              <strong>NID/Passport:</strong> {nid}
            </p>
            <p>
              <strong>Driving License:</strong> {license}
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold">Payment Information</h3>
            <p>
              <strong>Payment Method:</strong> {"card"}
            </p>
          </div>

          <div className="flex justify-end mt-6">
            {!isLoading ? (
              <button
                className="bg-green-600 text-white px-6 py-2 rounded-lg"
                onClick={() =>
                  handleConfirm({
                    carId,
                    date,
                    startTime,
                    name,
                    address,
                    phone,
                    license,
                    nid,
                    gps,
                    childSeat,
                  } as TBookingState)
                }
              >
                Confirm Booking
              </button>
            ) : (
              <button className="bg-green-200 text-white px-6 py-2 rounded-lg">
                Confirm Booking
              </button>
            )}
          </div>
        </div>
      </DefaultContainer>
    </div>
  );
};

export default BookingConfirmation;
