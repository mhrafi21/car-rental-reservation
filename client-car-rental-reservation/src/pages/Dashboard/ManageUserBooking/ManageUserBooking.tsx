import React, { useState } from "react";
import {
  useCarBookingCancelMutation,
  useGetSingleBookingsQuery,
} from "../../../redux/baseApi";
import { TBookingState } from "../../../interfaces";
import BookingCard from "./BookingCard";
import Swal from "sweetalert2";

const BookingManagement: React.FC = () => {
  const { data, isLoading } = useGetSingleBookingsQuery(undefined);
  const [addToModify] = useCarBookingCancelMutation(undefined);
  
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming"); // Tab state

  const handleModify = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Book it!",
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
      console.error("Failed to book product:", error);
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
        confirmButtonText: "Yes, Cancel it!",
      });

      if (result.isConfirmed) {
        const res = await addToModify({
          bookingId: id,
          isCancel: true,
        }).unwrap();

        if (res?.success === true) {
          Swal.fire("Cancelled!", `${res?.message}`, "success");
        }
      }
    } catch (error) {
      Swal.fire(
        "Failed!",
        "There was a problem cancelling your product.",
        "error"
      );
      console.error("Failed to cancel product:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Filter upcoming and past bookings based on current date

  const upcomingBookings = data?.data.filter((booking: TBookingState) => booking?.approved === true);
  const pastBookings = data?.data.filter((booking: TBookingState) => booking?.totalCost !== 0);

  return (
    <div className="">
      <h1 className="text-3xl font-bold mb-6">Booking Management</h1>
      
      {/* Tabs for switching between upcoming and past bookings */}
      <div className="flex mb-6">
        <button
          className={`px-4 py-2 mr-2 ${
            activeTab === "upcoming" ? "bg-blue-500 text-white" : "bg-gray-200"
          } rounded-md`}
          onClick={() => setActiveTab("upcoming")}
        >
          Upcoming Bookings
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "past" ? "bg-blue-500 text-white" : "bg-gray-200"
          } rounded-md`}
          onClick={() => setActiveTab("past")}
        >
          Past Bookings
        </button>
      </div>

      {/* Conditional rendering for Upcoming and Past bookings */}
      {activeTab === "upcoming" ? (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Upcoming Bookings</h2>
          {upcomingBookings?.length > 0 ? (
            upcomingBookings.map((booking: TBookingState) => (
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
      ) : (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Past Bookings</h2>
          {pastBookings?.length > 0 ? (
            pastBookings.map((booking: TBookingState) => (
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
      )}
    </div>
  );
};

export default BookingManagement;
