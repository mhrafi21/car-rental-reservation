import React from "react";
import { useGetSingleCarByIdQuery, useUpdateSingleCarByIdMutation } from "../../../redux/baseApi";
import { SubmitHandler, useForm } from "react-hook-form";
import { TCar } from "../../../interfaces";

interface Props {
  productId: string | null;
  onClose: () => void;
}

const UpdateCarModal: React.FC<Props> = ({ productId, onClose }) => {
  const { register, handleSubmit } = useForm<TCar>();


  const { data: singleCar, isLoading } = useGetSingleCarByIdQuery(productId!, {
    skip: !productId,
  });

  const [addToUpdateCar] = useUpdateSingleCarByIdMutation(undefined);

  const onSubmit: SubmitHandler<TCar> = async (data: TCar) => {
    try {
      const updateCarInfo = {
        category: data?.category,
        color: data?.color,
        description: data?.description,
        features: ([data?.features]?.join(",") || "")
          .split(",")
          .map((url: string) => url.trim()),
        image: data?.image,
        isElectric: data?.isElectric,
        name: data?.name,
        pricePerHour: Number(data?.pricePerHour),
        reviews: Number(data?.reviews),
      };

      const res = await addToUpdateCar({productId, ...updateCarInfo}).unwrap();

      console.log(res);

      

      // await addToUpdate({ productId, ...updateProduct }).unwrap();

      // Reset form and close modal
      onClose();
    } catch (error) {
      console.error("Error updating car:", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  if (!productId) return null;

  return (
    
    <div className="fixed inset-0 flex items-center justify-center overflow-auto bg-gray-800 bg-opacity-50">

      <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Update New Car</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm dark:text-white font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              defaultValue={singleCar?.data?.name}
              {...register("name")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block dark:text-white text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              {...register("description")}
              defaultValue={singleCar?.data?.description}
              className="mt-1 block  w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block dark:text-white text-sm font-medium text-gray-700">
              Color
            </label>
            <input
              type="text"
              defaultValue={singleCar?.data?.color}
              {...register("color")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="mb-4 ">
            <div className="block text-sm font-medium text-gray-700">Is Electric</div>
            <label className="flex dark:text-white items-baseline gap-3">
            <input
              type="checkbox"
              defaultChecked={singleCar?.data?.isElectric}
              {...register("isElectric")}
              className="mt-1 "
            />
              Electric
          
              </label>
          </div>
          <div className="mb-4">
            <label className="block dark:text-white text-sm font-medium text-gray-700">
              Image URL
            </label>
            <input
              type="text"
              defaultValue={singleCar?.data?.image}
              {...register("image")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm dark:text-white font-medium text-gray-700">
              Category
            </label>
            <select
              defaultValue={singleCar?.data?.category}
              {...register("category")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">Select a category</option>
              <option value="SUV">SUV</option>
              <option value="hybrid">Hybrid</option>
              <option value="sedan">Sedan</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block dark:text-white text-sm font-medium text-gray-700">
              Reviews
            </label>
            <input
              type="number"
              defaultValue={singleCar?.data?.reviews}
              {...register("reviews")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm dark:text-white font-medium text-gray-700">
              Features (comma-separated)
            </label>
            <textarea
              id="features"
              defaultValue={singleCar?.data?.features}
              {...register("features")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm dark:text-white font-medium text-gray-700">
              Price/Hour
            </label>
            <input
              type="number"
              defaultValue={singleCar?.data?.pricePerHour}
              {...register("pricePerHour")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 bg-gray-500 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
            >
              Update Car
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCarModal;
