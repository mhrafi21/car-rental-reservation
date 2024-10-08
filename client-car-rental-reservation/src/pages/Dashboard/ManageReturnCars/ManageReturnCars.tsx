import React, { useState } from "react";
import {
  useCarReturnAndUpdateDateMutation,
  useGetAllBookingsQuery,
} from "../../../redux/baseApi";
import { TBooking } from "../../../interfaces";

const ManageReturnCars: React.FC = () => {
  const { data, isLoading } = useGetAllBookingsQuery(undefined);
  const [updateReturnCar] = useCarReturnAndUpdateDateMutation(undefined);
  const [editBookingId, setEditBookingId] = useState<string | null>(null);
  const [newEndTime, setNewEndTime] = useState<string>("");

  const handleEditClick = async (id: string, currentEndTime: string) => {
    setEditBookingId(id);
    setNewEndTime(currentEndTime);
  };

  const handleUpdateEndTime = async (id: string) => {
    const updateTime = {
      bookingId: id,
      endTime: newEndTime,
    };
    await updateReturnCar(updateTime).unwrap();
    setEditBookingId(null);
    setNewEndTime("");
  };

  return (
    <div className="py-10 bg-gray-100 dark:bg-gray-700 w-full">

        <div className=" bg-white dark:bg-gray-700 shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-semibold dark:text-white text-gray-800">
            Manage Bookings
          </h1>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 dark:bg-gray-600">
              <tr>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
                  Customer
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
                  Car Model
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
                  Booking Date
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
                  Return Date
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
                  Total Cost
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
              {isLoading && <div>Loading...</div>}
              {data?.data &&
                data?.data?.map((booking: TBooking) => (
                  <tr key={booking._id}>
                    <td className="py-4 px-6 text-sm dark:text-white font-medium text-gray-900">
                      {booking?.user?.name}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500 dark:text-white">
                      {booking?.car?.name}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500 dark:text-white">
                      {booking?.date} ({booking?.startTime})
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500 dark:text-white">
                      {editBookingId === booking._id ? (
                        <input
                          type="time"
                          value={newEndTime}
                          onChange={(e) => setNewEndTime(e.target.value)}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      ) : (
                        booking?.endTime
                      )}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500 dark:text-white">
                      $ {booking?.totalCost}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500 dark:text-white">
                      <p
                        className={`inline-flex px-2 py-1 font-semibold leading-5 rounded-full text-red-600`}
                      >
                        {booking?.approved === true ? (
                          <span className="text-green-600">Approved</span>
                        ) : (
                          <span className="text-red-600">Pending</span>
                        )}
                      </p>
                    </td>
                    <td className="py-4 px-6 text-sm flex gap-2">
                      {editBookingId === booking._id ? (
                        <>
                          <button
                            onClick={() =>
                              handleUpdateEndTime(booking._id as string)
                            }
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-300"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditBookingId(null)}
                            className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-600 transition duration-300"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() =>
                            handleEditClick(
                              booking._id as string,
                              booking?.endTime
                            )
                          }
                          className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600 transition duration-300"
                        >
                          Edit
                        </button>
                      )}
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

export default ManageReturnCars;
