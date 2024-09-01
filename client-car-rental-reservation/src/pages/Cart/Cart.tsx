import React from "react";
import Swal from "sweetalert2";
import {
  useDeleteCartMutation,
  useGetAllCartsQuery,
  useUpdateCartItemMutation,
} from "../../redux/baseApi";
import { TCartsProps, TProduct } from "../../interfaces";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import DefaultContainer from "../../components/DefaultContainer";
import Title from "../../components/Title";


const Cart: React.FC = () => {

  const { data: cartItems, isLoading, error } = useGetAllCartsQuery(undefined);

  const [updateCartItem] = useUpdateCartItemMutation(undefined);
  const [removeCartItem] = useDeleteCartMutation(undefined);

  const handleIncreaseQuantity = async (
    productId: string,
    quantity: number,
    stock: TProduct
  ) => {
    if (quantity >= stock?.stockQuantity) {
      toast.error("Not enough stock");
    } else {
      await updateCartItem({ productId, quantity: quantity + 1 });
    }
  };

  const handleDecreaseQuantity = async (
    productId: string,
    quantity: number
  ) => {
    if (quantity > 1) {
      await updateCartItem({ productId, quantity: quantity - 1 });
    }
  };

  const handleRemoveProduct = async (productId: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    });

    if (result.isConfirmed) {
      const res = await removeCartItem(productId).unwrap();
      if(res.success === true){
        Swal.fire("Deleted!", `${res?.message}`, "success");
      }

    }
  };

  const calculateTotalPrice = () => {
    return cartItems?.data
      .reduce(
        (total: number, item: TCartsProps) =>
          total + item?.product.price * item.quantity,
        0
      )
      .toFixed(2);
  };

  if (error) {
    return <div>Error loading cart items</div>;
  }

  return (
    <div className=" my-8">
      <DefaultContainer>
        {isLoading && <div>Loading...</div>}
        <Title>Cart</Title>
        <div>
          <div className="bg-white shadow-md rounded-lg p-4">
            {cartItems?.data.length === 0 ? (
              <p className="text-center text-gray-700">Your cart is empty.</p>
            ) : (
              <div>
                <ul className="divide-y divide-gray-200">
                  {cartItems?.data?.map((item: TCartsProps) => (
                    <li
                      key={item?._id}
                      className="py-4 flex justify-between items-center"
                    >
                      <div className="flex items-center">
                        <img
                          src={item?.product.images[0]}
                          alt={item?.product.name}
                          className="w-16 h-16 object-cover mr-4"
                        />
                        <div>
                          <h3 className="text-lg font-bold">
                            {item?.product.name}
                          </h3>
                          <p className="text-gray-700">
                            ${item?.product.price.toFixed(2)}
                          </p>
                          <div className="flex items-center mt-2">
                            <button
                              onClick={() =>
                                handleDecreaseQuantity(
                                  item._id as string,
                                  item?.quantity
                                )
                              }
                              className="bg-gray-200 px-2 py-1 rounded-l"
                            >
                              -
                            </button>
                            <span className="px-4 py-1 bg-gray-100 border">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                handleIncreaseQuantity(
                                  item._id as string,
                                  item.quantity,
                                  item.product as TProduct
                                )
                              }
                              className="bg-gray-200 px-2 py-1 rounded-r"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveProduct(item._id as string)}
                        className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">Total:</h2>
                    <p className="text-xl font-bold">
                      ${calculateTotalPrice()}
                    </p>
                  </div>
                  {cartItems?.data?.some(
                    (item: TCartsProps) =>
                      item?.product.stockQuantity <= item.quantity
                  ) ? (
                    <button className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded cursor-not-allowed opacity-50">
                      Place order
                    </button>
                  ) : (
                    <Link to={"/checkout"}>
                      <button className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
                        Place Order
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </DefaultContainer>
    </div>
  );
};

export default Cart;
