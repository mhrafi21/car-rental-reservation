import { createSlice } from "@reduxjs/toolkit";

import {  TCar } from "../../../interfaces";

type TBookingState = {
  carId: string
  date: string
  startTime: string
  booking:TCar | null
};

const initialState: TBookingState = {
    carId: "",
    date: "",
    startTime: "",
    booking: null
}


const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBooking: (state, action) => {
      const { carId, date,startTime,booking } = action.payload;
      state.carId = carId;
      state.date = date;
      state.startTime = startTime;
      state.booking = booking;
    }
  },
});

export const { setBooking } = bookingSlice.actions;

export default bookingSlice.reducer;