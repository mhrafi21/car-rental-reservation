import React from "react";
import {
  useCarBookingCancelMutation,
  useGetBookingQuery,
} from "../../../redux/baseApi";
import DefaultContainer from "../../../components/DefaultContainer";
import { TBooking } from "../../../interfaces";
import Swal from "sweetalert2";

const Booking: React.FC = () => {
  const { data, isLoading } = useGetBookingQuery(undefined);
  const [carBookingCancel] = useCarBookingCancelMutation(undefined);

  const handleCancel = async (id: string) => {
  
   
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You will be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Cancel it!",
      });

      if (result.isConfirmed) {
        const res = await carBookingCancel({ id: id, isCancel: true }).unwrap();

        if (res?.success === true) {
          Swal.fire("Cancelled!", `${res?.message}`, "success");
        }
      }
    } catch (error) {
      Swal.fire(
        "Failed!",
        "There was a problem Cancelling your product.",
        "error"
      );
      console.error("Failed to Cancel product:", error);
    }


  };

  const handleBooking = async (id: string) => {

    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You will be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Booking it!",
      });

      if (result.isConfirmed) {
        const res = await carBookingCancel({ id: id, isCancel: false }).unwrap();

        if (res?.success === true) {
          Swal.fire("Booked!", "Booking is successfully added", "success");
        }
      }
    } catch (error) {
      Swal.fire(
        "Failed!",
        "There was a problem Booking your product.",
        "error"
      );
      console.error("Failed to Booking product:", error);
    }
   
  };



  return (
    <div>
      <DefaultContainer>
        {isLoading && "Loading"}
        <div className="py-10">
          {data?.data &&
            data?.data?.map((car: TBooking) => (
              <div
                className="bg-white shadow-lg rounded-lg overflow-hidden"
                key={car?._id}
              >
                <img
                  src={car?.car?.image}
                  alt={car?.car?.name}
                  className="w-full h-64 object-cover"
                />

                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-800">
                        {car?.car?.name}
                      </h2>
                      <p className="text-gray-600 mt-2">
                        {car?.car?.description}
                      </p>
                      <p className="text-gray-600 mt-2">
                        <strong>Color:</strong> {car?.car?.color}
                      </p>
                      <p className="text-gray-600 mt-2">
                        <strong>Category:</strong> {car?.car?.category}
                      </p>
                      <p className="text-gray-600 mt-2">
                        <strong>Price Per Hour:</strong> $
                        {car?.car?.pricePerHour}
                      </p>
                      <p className="text-gray-600 mt-2">
                        <strong>Availability:</strong>{" "}
                        {car?.car?.status === "available"
                          ? "Available"
                          : "Unavailable"}
                      </p>
                      <p className="text-gray-600 mt-2">
                        <strong>Electric car:</strong>{" "}
                        {car?.car?.isElectric ? "Yes" : "No"}
                      </p>
                      <p className="text-gray-600 mt-2">
                        <strong>Features:</strong>{" "}
                        {car?.car?.features.join(", ")}
                      </p>
                      <p className="text-gray-600 mt-2">
                        <strong>Reviews:</strong> {car?.car?.reviews} Stars
                      </p>
                    </div>
                    <div>
                      <div className="mt-6 md:mt-0">
                        <h3 className="text-xl font-semibold text-gray-800">
                          Booking Information
                        </h3>
                        <p className="mt-2">
                          <strong className="text-gray-600 ">
                            Approve Type
                          </strong>
                          :{" "}
                          {car?.approved === false ? (
                            <span className="text-red-600">Pending</span>
                          ) : (
                            <span className="text-green-600">Approved</span>
                          )}
                        </p>
                        <p className="text-gray-600 mt-2">
                          <strong>Date:</strong> {car?.date}
                        </p>
                        <p className="text-gray-600 mt-2">
                          <strong>Start Time:</strong> {car?.startTime}
                        </p>
                        {car.endTime && (
                          <p className="text-gray-600 mt-2">
                            <strong>End Time:</strong> {car?.endTime}
                          </p>
                        )}
                        <p className="text-gray-600 mt-2">
                          <strong>Total Cost:</strong> ${car?.totalCost}
                        </p>
                      </div>

                      {car?.isCancel === false ? (
                        <button
                          className="mt-6 px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white"
                          onClick={() => handleCancel(car._id as string)}
                          disabled={car?.approved === true}
                        >
                          Cancel
                        </button>
                      ) : (
                        <button
                          className="mt-6 px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white"
                          onClick={() => handleBooking(car._id as string)}
                        >
                          Booking
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </DefaultContainer>
    </div>
  );
};

export default Booking;
