import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { featuredTitlesReducer as featuredTitles } from "./slices/titles/featured-titles";

const store = configureStore({
  reducer: {
    featuredTitles,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
