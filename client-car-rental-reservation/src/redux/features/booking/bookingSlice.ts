import { createSlice } from "@reduxjs/toolkit";

import {  TCar } from "../../../interfaces";

type TBookingState = {
  carId: string
  date: string
  startTime: string
  booking:TCar | null
  childSeat: boolean
  gps: boolean
};

const initialState: TBookingState = {
    carId: "",
    date: "",
    startTime: "",
    booking: null,
    childSeat: false ,
    gps: false
}


const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBooking: (state, action) => {
      const { carId, date,startTime,booking,childSeat,gps } = action.payload;
      state.carId = carId;
      state.date = date;
      state.startTime = startTime;
      state.booking = booking;
      state.childSeat = childSeat;
      state.gps = gps;
    }
  },
});

export const { setBooking } = bookingSlice.actions;

export default bookingSlice.reducer;