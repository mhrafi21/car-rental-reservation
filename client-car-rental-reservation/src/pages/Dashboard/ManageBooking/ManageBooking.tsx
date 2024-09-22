import React from "react";
import {
  useGetAllBookingsQuery,
  useUpdateSingCarBookingApprovedStatusMutation,
} from "../../../redux/baseApi";
import { TBooking } from "../../../interfaces";
import Swal from "sweetalert2";


const ManageBooking: React.FC = () => {
  const { data } = useGetAllBookingsQuery(undefined);
  const [updateStatus] =
    useUpdateSingCarBookingApprovedStatusMutation(undefined);

  const handleApproveBooking = async (id: string) => {
   
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You will be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, approve it",
      });

      if (result.isConfirmed) {
        const res =  await updateStatus({ id, approved: true }).unwrap();

        if (res?.success === true) {
          Swal.fire("Approved!", `${res?.message}`, "success");
        }
      }
    } catch (error) {
      Swal.fire(
        "Failed!",
        "There was a problem deleting your product.",
        "error"
      );
      console.error("Failed to delete product:", error);
    }
  };

  const handleCancelBooking = async (id: string) => {
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
        const res =  await updateStatus({ id, approved: false }).unwrap();

        if (res?.success === true) {
          Swal.fire("Cancelled!", `${res?.message}`, "success");
        }
      }
    } catch (error) {
      Swal.fire(
        "Failed!",
        "There was a problem deleting your product.",
        "error"
      );
      console.error("Failed to delete product:", error);
    }
  };

  return (
    <div className="  min-h-screen py-10">

      <div className=" bg-white dark:bg-gray-700 shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-2xl dark:text-white font-semibold text-gray-800">
            Manage Bookings
          </h1>
        </div>
        <div className="overflow-x-auto">
          <table className="max-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
                  Customer
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
                  Car Model
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
                  Booking Status
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
                  Booking Date
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
                  Return Date
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
                  Status
                </th>
    
                
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-700 divide-y divide-gray-200">
              {data?.data?.map((booking: TBooking) => (
                <tr key={booking._id}>
                  <td className="py-4 px-6 text-sm dark:text-white font-medium text-gray-900">
                    {booking?.user?.name}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-500 dark:text-white">
                    {booking?.car?.name}
                  </td>
                  <td className="py-4 px-6 text-sm flex gap-2">
                      {
                        booking?.isCancel === false ? <span className="text-green-500 font-semibold">Booked</span>
                        :
                        <span className="text-red-500 font-semibold">Cancelled</span>
                      }
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-500 dark:text-white">
                    {booking?.date}({booking?.startTime})
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-500 dark:text-white">
                    {booking?.endTime}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-500 dark:text-white">
                    <p
                      className={`inline-flex px-2 py-1 font-semibold
                    
                        leading-5 rounded-full text-red-600`}
                    >
                      {booking?.approved === true ? (
                        <span className="text-green-600">Approved</span>
                      ) : (
                        <span className="text-red-600">Pending</span>
                      )}
                    </p>
                  </td>
                  <td className="py-4 px-6 text-sm flex gap-2">
                    <button
                      onClick={() =>
                        handleApproveBooking(booking._id as string)
                      }
                      className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition duration-300"
                      disabled={booking?.approved === true}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleCancelBooking(booking._id as string)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition duration-300"
                      disabled={booking?.approved === false }
                    >
                      Cancel
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
  
    </div>
  );
};

export default ManageBooking;
