import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./baseApi";
import productsReducer from "../redux/features/products/productsSlice";
import cartReducer from "../redux/features/products/cartSlice";
import paginationReducer from "../redux/features/products/paginationSlice";
import authReducer from "../redux/features/auth/authSlice";
import storage from "redux-persist/lib/storage";
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
    cart: cartReducer,
    pagination: paginationReducer,
    auth: persistedAuthReducer,
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
