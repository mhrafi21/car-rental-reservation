import React, { useState } from "react";
import UpdateProductModal from "./UpdateProductModal";
import AddProductsModal from "./AddProductsModal";
import { TProduct } from "../../interfaces";
import {
  useDeleteSingleProductMutation,
  useUpdateProductByIdMutation,
} from "../../redux/baseApi";
import Swal from "sweetalert2";

const ProductManagement: React.FC<{ products: TProduct[] }> = ({
  products,
}) => {

  const [deleteProduct] = useDeleteSingleProductMutation(undefined);
  const [deleteImage] = useUpdateProductByIdMutation(undefined);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [productIdToUpdate, setProductIdToUpdate] = useState<string | null>(
    null
  );
  const [isCreating, setIsCreating] = useState<boolean>(false);


  const handleDeleteProduct = async (productId: string) => {
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
        const res = await deleteProduct(productId).unwrap();

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

  const handleDeleteImage = async (
    productId: string,
    deleteImages: string[]
  ) => {
    try {
      const image = {
        deleteImages: deleteImages,
      };

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
        const res = await deleteImage({ productId, ...image }).unwrap();

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

  const openUpdateModal = (productId: string) => {
    setProductIdToUpdate(productId);
    setIsUpdating(true);
  };

  const closeUpdateModal = () => {
    setIsUpdating(false);
    setProductIdToUpdate(null);
  };

  const openCreateModal = () => {
    setIsCreating(true);
  };

  const closeCreateModal = () => {
    setIsCreating(false);
  };

  //   delete product;

  return (
    <div className=" my-8">
      <div className="flex justify-end mb-6">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded "
          onClick={() => openCreateModal()}
        >
          Create Product
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className=" bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">Name</th>
              <th className="py-2 px-4 border-b text-left">Price</th>
              <th className="py-2 px-4 border-b text-left">Stock Quantity</th>
              <th className="py-2 px-4 border-b text-left">Description</th>
              <th className="py-2 px-4 border-b text-left">Category</th>
              <th className="py-2 px-4 border-b text-left">Ratings</th>
              <th className="py-2 px-4 border-b text-left">Images</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((product: TProduct) => (
                <tr key={Math.random()}>
                  <td className="py-2 px-4 border-b">{product.name}</td>
                  <td className="py-2 px-4 border-b">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {product.stockQuantity}
                  </td>
                  <td className="py-2 px-4 border-b">{product.description}</td>
                  <td className="py-2 px-4 border-b">{product.category}</td>
                  <td className="py-2 px-4 border-b">{product.ratings}</td>
                  <td className="py-2 px-4 border-b">
                    <div className="flex flex-wrap gap-2">
                      {product.images.map((image: string) => (
                        <div key={Math.random()} className="relative">
                          <img
                            src={image}
                            alt={product.name}
                            className="w-16 h-16 object-cover"
                          />
                          <button
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center"
                            onClick={() =>
                              handleDeleteImage(product._id as string, [
                                image as string,
                              ])
                            }
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <div className="flex gap-2">
                      <button
                        className="bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded"
                        onClick={() => openUpdateModal(product._id as string)}
                      >
                        Update
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded"
                        onClick={() =>
                          handleDeleteProduct(product._id as string)
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

      </div>
      {/* Delete confirmation modal */}
      {/* Update product modal */}
      {isUpdating && (
        <UpdateProductModal
          key={Math.random()}
          productId={productIdToUpdate}
          onClose={closeUpdateModal}
        />
      )}
      {/* Create product modal */}
      {isCreating && (
        <AddProductsModal
          key={Math.random()}
          onClose={closeCreateModal}
        ></AddProductsModal>
      )}
    </div>
  );
};

export default ProductManagement;
