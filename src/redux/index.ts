import { configureStore } from "@reduxjs/toolkit";
import { featuredTitlesReducer } from "./slices/titles/featured-titles";

const store = configureStore({
  reducer: {
    featuredTitlesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
