import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";

interface UpdateCartResponse {
  success: boolean;
  cartId?: string;
}

// Update the UpdateCartMutationResult type definition
export type UpdateCartMutationResult =
  | {
      data: UpdateCartResponse;
    }
  | {
      error: unknown;
    };

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["Cars", "Bookings"],

  endpoints: (builder) => ({

    createSignup: builder.mutation({
      query: (signupInfo) => {
        return {
          url: "/auth/signup",
          method: "POST",
          body: signupInfo,
        };
      },
    }),
    createLogin: builder.mutation({
      query: (loginInfo) => {
        return {
          url: "/auth/signin",
          method: "POST",
          body: loginInfo,
        };
      },
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

    // update car

    updateSingleCarById: builder.mutation({
      query: ({ productId, ...carUpdateInfo }) => ({
        url: `/cars/${productId}`,
        method: "PUT",
        body: carUpdateInfo,
      }),
      invalidatesTags: [{ type: "Cars" }],
    }),

    getBooking: builder.query({
      query: () => ({
        url: `/bookings/my-bookings`,
        method: "GET",
      }),
      providesTags: (id) => [{ type: "Bookings", id }],
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
      invalidatesTags: [{ type: "Bookings", id: "LIST" }],
    }),

    // single booking
    getSingleBookings: builder.query({
      query: () => ({
        url: `/bookings/my-bookings`,
        method: "GET",
      }),
      providesTags: [{ type: "Bookings", id: "LIST" }],
    }),

    carReturnAndUpdateDate: builder.mutation({
      query: (carsInfo) => ({
        url: `/cars/return`,
        method: "PUT",
        body: carsInfo,
      }),
      invalidatesTags: [{ type: "Cars" }],
    }),

    carBookingCancel: builder.mutation({
      query: ({ bookingId, isCancel }) => {
        return {
          url: `/bookings/cancel/${bookingId}`,
          method: "PATCH",
          body: { isCancel: isCancel },
        };
      },
      invalidatesTags: [{ type: "Bookings" }],
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
      query: ({ id, approved }) => {
        return {
          url: `/bookings/${id}`,
          method: "PATCH",
          body: { approved },
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
      providesTags: () => [{ type: "Cars" }],
    }),

    // update user status and role

    updateUserStatusOrRole: builder.mutation({
      query: ({ id, role, status }) => {
        return {
          url: `/auth/users/${id}`,
          method: "PUT",
          body: { role, status },
        };
      },
      invalidatesTags: ({ id }) => [{ type: "Cars", id: id }],
    }),
  }),
});

export const {
  useCreateSignupMutation,
  useCreateLoginMutation,
  useCreateCarMutation,
  useDeleteSingleCarMutation,
  useGetSingleBookingsQuery,
  useGetAllCarsQuery,
  useUpdateUserStatusOrRoleMutation,
  useGetAllUsersQuery,
  useUpdateSingleCarByIdMutation,
  useCarBookingCancelMutation,
  useCarReturnAndUpdateDateMutation,
  useUpdateSingCarBookingApprovedStatusMutation,
  useGetAllBookingsQuery,
  useGetSingleCarByIdQuery,
  useCreateBookingCarMutation,
  useGetBookingQuery,

} = baseApi;
