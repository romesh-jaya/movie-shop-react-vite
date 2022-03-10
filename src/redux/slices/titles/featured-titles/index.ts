import { createSlice } from "@reduxjs/toolkit";
import { Title } from "../../../../types/Title";
import extraReducersFunctions from "./functions";

export interface IFeaturedTitlesState {
  value: Title[];
  loading: boolean;
  error: string;
  fetched: boolean;
}

const initialState: IFeaturedTitlesState = {
  value: [],
  loading: true,
  error: "",
  fetched: false,
};

export const featuredTitles = createSlice({
  name: "featuredTitles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    extraReducersFunctions(builder);
  },
});

export const featuredTitlesReducer = featuredTitles.reducer;
