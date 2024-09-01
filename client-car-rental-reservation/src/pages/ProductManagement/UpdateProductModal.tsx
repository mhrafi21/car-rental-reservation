import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  useGetSingleCarByIdQuery,
  useUpdateProductByIdMutation,
} from "../../redux/baseApi";
import { TProduct } from "../../interfaces";

interface Props {
  productId: string | null;
  onClose: () => void;
}

const categories = [
  {
    key: "Camping Tent",
    value: "camping-tent",
  },
  {
    key: "Sleeping Bag",
    value: "sleeping-bag",
  },
  {
    key: "Backpack",
    value: "backpack",
  },
  {
    key: "Portable Stove",
    value: "portable-stove",
  },
  {
    key: "Hiking Boots",
    value: "hiking-boots",
  },
  {
    key: "Outdoor Clothing",
    value: "outdoor-clothing",
  },
  {
    key: "Camping Cookware",
    value: "camping-cookware",
  },
  {
    key: "First Aid Kit",
    value: "first-aid-kit",
  },
  {
    key: "Camping Hammock",
    value: "camping-hammock",
  },
  {
    key: "Camping Cooler",
    value: "camping-cooler",
  },
  {
    key: "Camping Knife",
    value: "camping-knife",
  },
  {
    key: "Camping Chair",
    value: "camping-chair",
  },
  {
    key: "Lantern",
    value: "lantern",
  },
  {
    key: "Water Bottle",
    value: "water-bottle",
  },
];

const UpdateProductModal: React.FC<Props> = ({ productId, onClose }) => {
  const [addToUpdate] = useUpdateProductByIdMutation(undefined);

  const { data, isLoading } = useGetSingleCarByIdQuery(productId!, {
    skip: !productId,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TProduct>();

  const onSubmit: SubmitHandler<TProduct> = async (data) => {
    try {
      const updateProduct = {
        name: data?.name,
        price: Number(data?.price),
        stockQuantity: Number(data?.stockQuantity),
        description: data?.description,
        category: data?.category,
        ratings: Number(data?.ratings),
        images: ([data?.images]?.join(",") || "")
          .split(",")
          .map((url: string) => url.trim()),
      };

      await addToUpdate({ productId, ...updateProduct }).unwrap();

      // Reset form and close modal
      onClose();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  if (!productId) return null; // Return null if

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      <div className="fixed inset-0 flex overflow-y-scroll items-center justify-center z-[600] bg-gray-900 bg-opacity-50 ">
        <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-xl w-full  mx-4 md:mx-auto">
          <p className="text-lg font-semibold bg-gray-200 py-2 px-4">
            Update Product
          </p>

          {data?.data.map((product: TProduct) => (
            <form
              onSubmit={handleSubmit(onSubmit)}
              key={product._id}
              className="p-4"
            >
              {/* Product Name */}
              <div className="mb-4">
                <label
                  htmlFor="productName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  id="productName"
                  defaultValue={product?.name}
                  {...register("name")}
                  className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                    errors.name ? "border-red-500" : ""
                  }`}
                />
                {errors.name && (
                  <p className="text-xs text-red-500">
                    Product Name is required
                  </p>
                )}
              </div>

              {/* Price */}
              <div className="mb-4">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  defaultValue={product?.price}
                  {...register("price", { required: true, min: 0 })}
                  className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                    errors.price ? "border-red-500" : ""
                  }`}
                />
                {errors.price && (
                  <p className="text-xs text-red-500">
                    Price is required and must be a positive number
                  </p>
                )}
              </div>

              {/* Stock Quantity */}
              <div className="mb-4">
                <label
                  htmlFor="stockQuantity"
                  className="block text-sm font-medium text-gray-700"
                >
                  Stock Quantity
                </label>
                <input
                  type="number"
                  defaultValue={product?.stockQuantity}
                  id="stockQuantity"
                  {...register("stockQuantity", { required: true, min: 0 })}
                  className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                    errors.stockQuantity ? "border-red-500" : ""
                  }`}
                />
                {errors.stockQuantity && (
                  <p className="text-xs text-red-500">
                    Stock Quantity is required and must be a positive number
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  defaultValue={product?.description}
                  {...register("description")}
                  className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                    errors.description ? "border-red-500" : ""
                  }`}
                />
                {errors.description && (
                  <p className="text-xs text-red-500">
                    Description is required
                  </p>
                )}
              </div>

              {/* Category */}
              <div className="mb-4">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category
                </label>
                <select
                  id="category"
                  {...register("category")}
                  defaultValue={product?.category}
                  className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                    errors.category ? "border-red-500" : ""
                  }`}
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.key} value={category.value}>
                      {category.key}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-xs text-red-500">Category is required</p>
                )}
              </div>

              {/* Ratings */}
              <div className="mb-4">
                <label
                  htmlFor="ratings"
                  className="block text-sm font-medium text-gray-700"
                >
                  Ratings
                </label>
                <input
                  type="number"
                  step="0.1"
                  id="ratings"
                  defaultValue={product?.ratings}
                  {...register("ratings", { required: true, min: 0, max: 5 })}
                  className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                    errors.ratings ? "border-red-500" : ""
                  }`}
                />
                {errors.ratings && (
                  <p className="text-xs text-red-500">
                    Ratings are required and must be between 0 and 5
                  </p>
                )}
              </div>

              {/* Images */}
              <div className="mb-4">
                <label
                  htmlFor="images"
                  className="block text-sm font-medium text-gray-700"
                >
                  Images (URLs, separated by commas)
                </label>
                <textarea
                  id="images"
                  defaultValue={product?.images}
                  {...register("images")}
                  className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                    errors.images ? "border-red-500" : ""
                  }`}
                />
                {errors.images && (
                  <p className="text-xs text-red-500">
                    Images URLs are required, separated by commas
                  </p>
                )}
              </div>

              {/* Submit and Cancel Buttons */}
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded mr-2"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded ml-2`}
                >
                  Update
                </button>
              </div>
            </form>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpdateProductModal;
