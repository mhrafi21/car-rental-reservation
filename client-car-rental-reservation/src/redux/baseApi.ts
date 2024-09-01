import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";

interface UpdateCartResponse {
  success: boolean;
  cartId?: string;

  // Add other properties as needed
}

// Update the UpdateCartMutationResult type definition
export type UpdateCartMutationResult =
  | {
      data: UpdateCartResponse;
    }
  | {
      error: unknown;
    };

/// https://backend-campers-shop.vercel.app/api/v1

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ 
    baseUrl: "http://localhost:5000/api",
    credentials:  "include",
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth.token;
    
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      } 
      return headers;
    },
    

   }),

  tagTypes: ["Cars", "Carts"],
  endpoints: (builder) => ({
    createSignup: builder.mutation({
      query: (signupInfo) => {
        return {
          url: "/auth/signup",
          method: "POST",
          body: signupInfo
        }
      }
    }),
    createLogin: builder.mutation({
      query: (loginInfo) => {
        return {
          url: "/auth/signin",
          method: "POST",
          body: loginInfo
        }
      }
    }),
    createProduct: builder.mutation({
      query: (product) => {
        return {
          url: "/products/create-product",
          method: "POST",
          body: product,
        };
      },
      invalidatesTags: [{ type: "Cars", id: "LIST" }],
    }),

    createCar: builder.mutation({
      query: (car) => {
        return {
          url: "/cars",
          method: "POST",
          body: car,
        };
      },
      invalidatesTags: [{ type: "Cars", id: "LIST" }],
    }),

    getAllCars: builder.query({
      query: (params) => {
        return {
          url: "/cars",
          method: "GET",
          params,
        };
      },
      providesTags: [{ type: "Cars", id: "LIST" }],
    }),
    getSingleCarById: builder.query({
      query: (id) => ({
        url: `/cars/${id}`,
        method: "GET",
      }),
      providesTags: (id) => [{ type: "Cars", id }],
    }),

    getBooking: builder.query({
      query: () => ({
        url: `/bookings/my-bookings`,
        method: "GET",
      }),
      providesTags: (id) => [{ type: "Cars", id }],
    }),

    getAllBookings: builder.query({
      query: () => ({
        url: `/bookings`,
        method: "GET",
      }),
      providesTags: (id) => [{ type: "Cars", id }],
    }),


    createBookingCar: builder.mutation({
      query: (bookingInfo) => ({
        url: `/bookings`,
        method: "POST",
        body: bookingInfo,
      }),
      invalidatesTags: ({ _id }) => [{ type: "Cars", id: _id }],
    }),


    carReturnAndUpdateDate: builder.mutation({
    
      query: (carsInfo) => ({
        url: `/cars/return`,
        method: "PUT",
        body: carsInfo
      }),
      invalidatesTags: [{type: "Cars"}],
    }),

    carBookingCancel : builder.mutation({
      query: ({id, isCancel}) => {
        return {
          url: `/bookings/cancel/${id}`,
          method: "PATCH",
          body: {isCancel:isCancel}
        };
      },
      invalidatesTags: [{ type: "Cars" }],
    }),


    updateProductById: builder.mutation({
      query: ({ productId, ...product }) => ({
        url: `/products/${productId}`,
        method: "PUT",
        body: product,
      }),
      invalidatesTags: ({ _id }) => [{ type: "Cars", id: _id }],
    }),

    deleteSingleCar: builder.mutation({
      query: (id) => {
        return {
          url: `/cars/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ({ _id }) => [{ type: "Cars", id: _id }],
    }),

    updateSingCarBookingApprovedStatus: builder.mutation({
      query: ({id,approved}) => {
        return {
          url: `/bookings/${id}`,
          method: "PATCH",
          body: {approved},
        };
      },
      invalidatesTags: ({ _id }) => [{ type: "Cars", id: _id }],
    }),

    // getAllUsers

    getAllUsers: builder.query({
      query: () => {
        return {
          url: `/auth/users`,
          method: "GET",
        };
      },
      providesTags: () => [{ type: "Cars"}],
    }),


    // update user status and role 

    updateUserStatusOrRole: builder.mutation({
      query: ({id, role, status}) => {
        return {
          url: `/auth/users/${id}`,
          method: "PUT",
          body: {role, status},
        };
      },
      invalidatesTags: ({ id }) => [{ type: "Cars", id: id }],
    }),







 

    deleteSingleProduct: builder.mutation({
      query: (id) => {
        return {
          url: `/products/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ({ _id }) => [{ type: "Cars", id: _id }],
    }),
    createCartProduct: builder.mutation({
      query: (product) => {
        return {
          url: "/carts/create-cart",
          method: "POST",
          body: product,
        };
      },
      invalidatesTags: [{ type: "Carts", id: "LIST" }],
    }),

    getAllCarts: builder.query({
      query: () => ({
        url: "/carts",
        method: "GET",
      }),
      providesTags: [{ type: "Carts", id: "LIST" }],
    }),
    deleteCart: builder.mutation({
      query: (cartId) => ({
        url: `/carts/${cartId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Carts" }],
    }),
    updateCart: builder.mutation({
      query: (cart) => {
        return {
          url: `/carts`,
          method: "PUT",
          body: cart,
        };
      },
      invalidatesTags: ({ _id }) => [{ type: "Carts", id: _id }],
    }),
    updateCartItem: builder.mutation<
      void,
      { productId: string; quantity: number }
    >({
      query: ({ productId, quantity }) => ({
        url: `/carts/${productId}`,
        method: "PATCH",
        body: { quantity },
      }),
      invalidatesTags: [{ type: "Carts" }],
    }),
    removeCartItem: builder.mutation<void, string>({
      query: (productId) => ({
        url: `/cart/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Carts" }],
    }),
    createOrderItem: builder.mutation({
      query: (orderData) => {
        console.log(orderData);
        return {
          url: `/orders/create-order`,
          method: "POST",
          body: orderData,
        };
      },
      invalidatesTags: [{ type: "Cars" }],
    }),
  }),
});

export const {
  useCreateSignupMutation,
  useCreateLoginMutation,
  useCreateProductMutation,
  useCreateCarMutation,
  useDeleteSingleCarMutation,
  useGetAllCarsQuery,
  useUpdateUserStatusOrRoleMutation,
  useGetAllUsersQuery,
  useCarBookingCancelMutation,
  useCarReturnAndUpdateDateMutation,
  useUpdateSingCarBookingApprovedStatusMutation,
  useGetAllBookingsQuery,
  useGetSingleCarByIdQuery,
  useCreateBookingCarMutation,
  useGetBookingQuery,
  useUpdateProductByIdMutation,
  useDeleteSingleProductMutation,
  useCreateCartProductMutation,
  useGetAllCartsQuery,
  useDeleteCartMutation,
  useUpdateCartMutation,
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
  useCreateOrderItemMutation,
} = baseApi;
