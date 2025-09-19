import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCitizenStats } from "../../services/api/citizens";

export const loadStats = createAsyncThunk("stats/loadStats", async () => {
  return await fetchCitizenStats();
});

const statsSlice = createSlice({
  name: "stats",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadStats.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(loadStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default statsSlice.reducer;
