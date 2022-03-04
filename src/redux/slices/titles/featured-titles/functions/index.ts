import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { IFeaturedTitlesState } from "..";
import axios from "../../../../../axios";

export const fetchFeaturedTitles = createAsyncThunk(
  "featuredTitles",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_NODE_SERVER}/movies`,
      { params: { featured: true, queryAll: true } }
    );
    return response.data.movies.movies;
  }
);

const extraReducers = (
  builder: ActionReducerMapBuilder<IFeaturedTitlesState>
) => {
  builder
    .addCase(fetchFeaturedTitles.pending, (state) => {
      return { ...state, loading: true };
    })
    .addCase(fetchFeaturedTitles.rejected, (state) => {
      return { ...state, loading: false, error: "Error loading movies" };
    })
    .addCase(fetchFeaturedTitles.fulfilled, (state, action) => {
      if (action.payload.length === 0) {
        return {
          ...state,
          value: action.payload,
          loading: false,
          error: "No movies returned from server",
          fetched: true,
        };
      }

      return { ...state, value: action.payload, loading: false, error: "" };
    });
};

export default extraReducers;
