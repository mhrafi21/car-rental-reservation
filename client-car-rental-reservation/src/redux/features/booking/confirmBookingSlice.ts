import { createSlice } from "@reduxjs/toolkit";

import { TBookingState } from "../../../interfaces";

const initialState: TBookingState = {
  carId: "",
  date: "",
  startTime: "",
  booking: null,
  name: "",
  address: "",
  phone: "",
  license: "",
  nid: "",
  gps: false,
  childSeat: false,
};

const confirmBookingSlice = createSlice({
  name: "confirmBooking",
  initialState,
  reducers: {
    setConfirmBooking: (state, action) => {
      const {
        carId,
        date,
        startTime,
        booking,
        name,
        address,
        phone,
        license,
        nid,
        gps,
        childSeat,
      } = action.payload;
      state.carId = carId;
      state.date = date;
      state.startTime = startTime;
      state.booking = booking;
      state.name = name;
      state.address = address;
      state.phone = phone;
      state.license = license;
      state.nid = nid;
      state.gps = gps;
      state.childSeat = childSeat;
    },
  },
});

export const { setConfirmBooking } = confirmBookingSlice.actions;

export default confirmBookingSlice.reducer;
