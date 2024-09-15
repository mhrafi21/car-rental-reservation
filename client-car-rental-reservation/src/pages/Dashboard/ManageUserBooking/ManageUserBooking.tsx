import React from "react";
import {
  useCarBookingCancelMutation,
  useGetSingleBookingsQuery,
} from "../../../redux/baseApi";
import { TBookingState } from "../../../interfaces";
import BookingCard from "./BookingCard";
import Swal from "sweetalert2";

const BookingManagement: React.FC = () => {
  // const [bookings, setBookings] = useState<Booking[]>([]);

  const { data, isLoading } = useGetSingleBookingsQuery(undefined);
  const [addToModify] = useCarBookingCancelMutation(undefined);

  const handleModify = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Booked it!",
      });

      if (result.isConfirmed) {
        const res = await addToModify({
          bookingId: id,
          isCancel: false,
        }).unwrap();

        if (res?.success === true) {
          Swal.fire("Booked!", `${res?.message}`, "success");
        }
      }
    } catch (error) {
      Swal.fire(
        "Failed!",
        "There was a problem booking your product.",
        "error"
      );
      console.error("Failed to Cancel product:", error);
    }
  };

  const handleCancel = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Cancelled it!",
      });

      if (result.isConfirmed) {
        const res = await addToModify({
          bookingId: id,
          isCancel: true,
        }).unwrap();

        if (res?.success === true) {
          Swal.fire("Booked!", `${res?.message}`, "success");
        }
      }
    } catch (error) {
      Swal.fire(
        "Failed!",
        "There was a problem Cancel your product.",
        "error"
      );
      console.error("Failed to Cancel product:", error);
    }
  };

  // const upcomingBookings = bookings.filter(booking => new Date(booking.date) >= new Date());
  // const pastBookings = bookings.filter(booking => new Date(booking.date) < new Date());

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Booking Management</h1>
      {isLoading && <div>Loading...</div>}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Upcoming Bookings</h2>
        {data?.data.length > 0 ? (
          data?.data.map((booking: TBookingState) => (
            <BookingCard
              key={booking._id}
              booking={booking}
              onModify={handleModify}
              onCancel={handleCancel}
            />
          ))
        ) : (
          <p>No upcoming bookings.</p>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Past Bookings</h2>
        {data?.data.length > 0 ? (
          data?.data.map((booking: TBookingState) => (
            <BookingCard
              key={booking._id}
              booking={booking}
              onModify={handleModify}
              onCancel={handleCancel}
            />
          ))
        ) : (
          <p>No past bookings.</p>
        )}
      </div>
    </div>
  );
};

export default BookingManagement;
