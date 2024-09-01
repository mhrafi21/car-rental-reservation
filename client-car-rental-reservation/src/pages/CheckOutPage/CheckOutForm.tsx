import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  useCreateOrderItemMutation,
  useGetAllCartsQuery,
} from "../../redux/baseApi";
import { TCartsProps } from "../../interfaces";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

type UserDetails = {
  name: string;
  email: string;
  phone: string;
  totalAmount: number;
  address: string;
  paymentMethod: string;
  data: string[];
};

const CheckoutForm: React.FC = () => {
  const navigate = useNavigate();
  const [addToOrder] = useCreateOrderItemMutation(undefined);
  const { data: CartData, isLoading } = useGetAllCartsQuery(undefined);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserDetails>();

  const calculateTotalAmount = () => {
    return Number(
      CartData?.data
        .reduce(
          (total: number, item: TCartsProps) =>
            total + item.product.price * item.quantity,
          0
        )
        .toFixed(2)
    );
  };

  const totalAmount: number = calculateTotalAmount();

  const onSubmit: SubmitHandler<UserDetails> = async (data) => {
    const orderInfo = {
      name: data?.name,
      email: data?.email,
      phone: data?.phone,
      totalAmount: calculateTotalAmount(),
      paymentMethod: data?.paymentMethod,
      address: data?.address,
      data: CartData?.data,
    };

    // Corrected line:
    const res = await addToOrder(orderInfo).unwrap();

    if (res?.success === true) {
      toast.success("Order created Successfully");
      navigate("/success");
    }
  };

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      <div>
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Checkout</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                className="mt-1 p-2 w-full border rounded-md"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span className="text-red-500">Name is required</span>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                className="mt-1 p-2 w-full border rounded-md"
                type="email"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-red-500">Email is required</span>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Phone</label>
              <input
                className="mt-1 p-2 w-full border rounded-md"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10,15}$/,
                    message: "Phone number must be between 10 and 15 digits",
                  },
                })}
              />
              {errors.phone && (
                <span className="text-red-500">{errors.phone.message}</span>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Address</label>
              <input
                type="text"
                className="mt-1 p-2 w-full border rounded-md"
                {...register("address", { required: true })}
              />
              {errors.address && (
                <span className="text-red-500">Address is required</span>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Payment Method</label>
              <div className="mt-1">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio"
                    {...register("paymentMethod", { required: true })}
                    value="cashOnDelivery"
                  />
                  <span className="ml-2">Cash on Delivery</span>
                </label>
              </div>
              {errors.paymentMethod && (
                <span className="text-red-500">PaymentMethod is required</span>
              )}
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Total Amount:</span>
                <span className="text-lg font-bold block mt-2">
                  ${totalAmount}
                </span>
              </div>
            </div>
            <button
              type="submit"
              className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Place Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
