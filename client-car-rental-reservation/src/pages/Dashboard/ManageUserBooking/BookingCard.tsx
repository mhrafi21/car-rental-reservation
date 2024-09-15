import React from "react";
import { TBookingState } from "../../../interfaces";

interface BookingCardProps {
  booking: TBookingState;
  onModify: (id: string) => void;
  onCancel: (id: string) => void;
}

const BookingCard: React.FC<BookingCardProps> = ({
  booking,
  onModify,
  onCancel,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4">
      <div className="flex justify-between">
        <h3 className="text-lg font-semibold">Booking ID: {booking?._id}</h3>
        <p className="text-sm">
          {booking?.approved === true ? (
            <strong className="text-green-600">Approved</strong>
          ) : (
            <strong className="text-red-600">Pending</strong>
          )}
        </p>
      </div>
      <p className="mt-2 text-gray-600">
        {" "}
        <strong>Name:</strong> {booking?.name}
      </p>
      <p className="mt-2 text-gray-600">
        <strong>Address</strong>: {booking?.address}
      </p>
      <p className="mt-2 text-gray-600">
        <strong>Phone</strong>: {booking?.phone}
      </p>
      <p className="mt-2 text-gray-600">
        <strong>Date</strong>: {booking?.date}
      </p>
      <p className="mt-2 text-gray-600">
        <strong>Start Time</strong>: {booking?.startTime}
      </p>
      <p className="mt-2 text-gray-600">
        <strong>End Time</strong>: {booking?.endTime || "Car is not return yet"}
      </p>
      <p className="mt-2 text-gray-600">
        <strong>GPS:</strong> {booking?.gps ? "Yes" : "No"},{" "}
        <strong>Child Seat:</strong> {booking.childSeat ? "Yes" : "No"}
      </p>

      <div className="flex justify-between">
        <p className="mt-2 text-gray-600">
          <strong>Total Cost:</strong> ${booking?.totalCost?.toFixed(2)}
        </p>
        <button
        title="After return the car total will be counted"
          className={`py-2 px-4 bg-green-500 text-white rounded ${
            booking?.totalCost === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={booking?.totalCost === 0}
        >
          Pay Now
        </button>
      </div>

      <div className="mt-4 flex space-x-4">
        {booking?.isCancel === true ? (
          <button
            className={`py-2 px-4 bg-blue-500 text-white rounded ${
              booking.approved ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => onModify(booking._id as string)}
            disabled={booking.approved}
          >
            Booking Again
          </button>
        ) : (
          <button
            className={`py-2 px-4 bg-blue-500 text-white rounded ${
              booking.approved ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={booking.approved}
          >
            Booked
          </button>
        )}

        {booking?.isCancel === false ? (
          <button
            className={`py-2 px-4 bg-red-500 text-white rounded ${
              booking.approved || booking.isCancel
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            onClick={() => onCancel(booking?._id as string)}
            disabled={booking.approved || booking.isCancel}
          >
            Cancel
          </button>
        ) : (
          <button
            className={`py-2 px-4 bg-red-500 text-white rounded ${
              booking.approved || booking.isCancel
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            onClick={() => onCancel(booking?._id as string)}
            disabled={booking.approved || booking.isCancel}
          >
            Cancelled
          </button>
        )}
      </div>
    </div>
  );
};

export default BookingCard;
