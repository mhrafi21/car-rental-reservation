import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./baseApi";
import productsReducer from "./features/cars/carsSlice.ts";
import paginationReducer from "./features/cars/paginationSlice.ts";
import authReducer from "../redux/features/auth/authSlice";
import storage from "redux-persist/lib/storage";
import searchReducer from "../redux/features/search/searchSlice.ts"
import bookingReducer from "../redux/features/booking/bookingSlice.ts"
import confirmBookingReducer from "../redux/features/booking/confirmBookingSlice.ts"
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "auth",
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    products: productsReducer,
    pagination: paginationReducer,
    auth: persistedAuthReducer,
    search: searchReducer,
    booking: bookingReducer,
    confirmBooking: confirmBookingReducer
  }, // Your root reducer goes here. Replace with your actual reducer.

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
         serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware), // Add the api middleware
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
