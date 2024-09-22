import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  useCreateCarMutation,
  useDeleteSingleCarMutation,
  useGetAllCarsQuery,
} from "../../../redux/baseApi";
import { TCar } from "../../../interfaces";
import Swal from "sweetalert2";
import UpdateCarModal from "./UpdateCarModal";


const CarTable: React.FC = () => {
  const { data, isLoading } = useGetAllCarsQuery(undefined);
  const [createCar] = useCreateCarMutation(undefined);
  const [deleteSingleCar] = useDeleteSingleCarMutation(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm<TCar>();
  const [updateCarId, setUpdateCarId] = useState<string | null>(null);

  // car update modal
  const handleUpdateCar = (id: string) => {
    setUpdateCarId(id);
    setIsUpdateModalOpen(true);
  };

  // close the update car modal
  const handleCancel = () => {
    setIsUpdateModalOpen(false);
    setUpdateCarId(null);
  };

  // delete car
  const handleDeleteCar = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const res = await deleteSingleCar(id).unwrap();

        if (res?.success === true) {
          Swal.fire("Deleted!", `${res?.message}`, "success");
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

  // open the add car modal
  const handleAddCar = () => {
    setIsModalOpen(true);
  };

  // add car submit
  const onSubmit = async (data: TCar) => {
    const carInfo = {
      name: data?.name,
      description: data?.description,
      image: data?.image,
      category: data?.category,
      color: data?.color,
      isElectric: data?.isElectric,
      features: [data?.features],
      pricePerHour: Number(data?.pricePerHour),
      reviews: Number(data?.reviews),
    };

    const res = await createCar(carInfo).unwrap();

    if (res?.success == true) {
      Swal.fire("Success!", `${res?.message}`, "success");
    }

    reset();
    setIsModalOpen(false);
  };

  return (
    <div className="py-10">

        {" "}
        <div className=" bg-gray-100">
          {isLoading && <div>Loading...</div>}
          <div className="bg-white dark:bg-gray-700 shadow-lg rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h1 className="text-2xl font-semibold dark:text-white text-gray-800">
                Car Management
              </h1>
              <button
                onClick={handleAddCar}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition duration-300"
              >
                Add Car
              </button>
            </div>
            <div className="overflow-x-auto flex-none">
              <table className=" divide-y divide-gray-200">
                <thead className="bg-gray-50 dark:bg-gray-600 ">
                  <tr>
                    <th className="py-3 px-6 text-left text-xs  font-medium text-gray-500 dark:text-white uppercase tracking-wider">
                      Image
                    </th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
                      Name
                    </th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
                      Description
                    </th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
                      Color
                    </th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
                      Electric
                    </th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
                      Category
                    </th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
                      Status
                    </th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
                      Features
                    </th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
                      Price/Hour
                    </th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
                      Reviews
                    </th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-700 divide-y divide-gray-200">
                  {data?.data?.map((car: TCar) => (
                    <tr key={car._id}>
                      <td className="py-4 px-6 text-sm">
                        <img
                          className="w-16 h-16 object-cover"
                          src={car.image}
                          alt={car.name}
                        />
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-900 dark:text-white">
                        {car.name}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-500 dark:text-white">
                        {car.description.slice(0, 20) + "..."}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-500 dark:text-white">
                        {car.color}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-500 dark:text-white">
                        {car.isElectric ? "Yes" : "No"}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-500 dark:text-white">
                        {car.category}
                      </td>
                      <td className="py-4 px-6 text-sm ">
                        {car.status === "available" ? (
                          <span className="text-green-600">{car.status}</span>
                        ) : (
                          <span className="text-red-600">{car.status}</span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-500 dark:text-white">
                        {car.features.join(", ")}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-500 dark:text-white">
                        ${car.pricePerHour}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-500 dark:text-white">
                        {car.reviews}
                      </td>
                      <td className="py-4 text-sm">
                        <button
                          onClick={() => handleUpdateCar(car._id as string)}
                          className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600 transition duration-300 mr-2"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDeleteCar(car._id as string)}
                          className="bg-red-500 text-white px-4 py-2 mt-3 rounded-lg shadow hover:bg-red-600 transition duration-300"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add Car Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center overflow-auto bg-gray-800 bg-opacity-50">
              <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4">Add New Car</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-4">
                    <label className="block dark:text-white text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      {...register("name", { required: "Name is required" })}
                      type="text"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm dark:text-white font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      {...register("description", {
                        required: "Description is required",
                      })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    ></textarea>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm dark:text-white font-medium text-gray-700">
                      Color
                    </label>
                    <input
                      {...register("color", { required: "Color is required" })}
                      type="text"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="flex gap-2 items-start text-sm dark:text-white font-medium text-gray-700">
                   
                    <input
                      {...register("isElectric")}
                      type="checkbox"
                      className="mt-1"
                    />
                       Is Electric
                       </label>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm dark:text-white font-medium text-gray-700">
                      Image URL
                    </label>
                    <input
                      {...register("image", {
                        required: "Image URL is required",
                      })}
                      type="text"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm dark:text-white font-medium text-gray-700">
                      Category
                    </label>
                    <select
                      {...register("category", {
                        required: "Category is required",
                      })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value="">Select a category</option>
                      <option value="SUV">SUV</option>
                      <option value="hybrid">Hybrid</option>
                      <option value="sedan">Sedan</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm dark:text-white font-medium text-gray-700">
                      Reviews
                    </label>
                    <input
                      {...register("reviews", {
                        required: "reviews is required",
                      })}
                      type="number"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm dark:text-white font-medium text-gray-700">
                      Features (comma-separated)
                    </label>
                    <input
                      {...register("features")}
                      type="text"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm dark:text-white font-medium text-gray-700">
                      Price/Hour
                    </label>
                    <input
                      {...register("pricePerHour", {
                        required: "Price is required",
                      })}
                      type="number"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="mr-2 bg-gray-500 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
                    >
                      Add Car
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Update Car */}

          {isUpdateModalOpen && (
            <UpdateCarModal
              key={Math.random()}
              productId={updateCarId}
              onClose={handleCancel}
            />
          )}
        </div>

    </div>
  );
};

export default CarTable;
