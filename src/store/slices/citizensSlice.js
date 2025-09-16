import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCitizens, fetchCitizenById } from "../../services/api/citizens";

export const loadCitizens = createAsyncThunk(
  "citizens/loadCitizens",
  async ({ page, size, filters }) => {
    const responce = await fetchCitizens({ page, size, filters });
    return responce;
  }
);

export const loadCitizensDetails = createAsyncThunk(
  "citizens/loadCitizensDetails",
  async (id) => {
    const citizen = await fetchCitizenById(id);
    return citizen;
  }
);

const citizensSlice = createSlice({
  name: "citizen",
  initialState: {
    list: [],
    currentCitizen: null,
    loading: false,
    error: null,
    pagination: {
      currentPage: 0,
      pageSize: 20,
      totalCount: 0,
    },
    filters: {},
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
      state.pagination.currentPage = 0;
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    clearCurrentCitizen: (state) => {
      state.currentCitizen = null;
    },
    extraReducers: (builder) => {
      builder
        .addCase(loadCitizens.pending, (state) => {
          state.loading = true;
          state.error = false;
        })
        .addCase(loadCitizens.fulfilled, (state, action) => {
          state.loading = false;
          state.list = action.payload.data;
          state.pagination.totalCount = action.payload.totalCount;
        })
        .addCase(loadCitizens.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(loadCitizensDetails.fulfilled, (state, action) => {
          state.currentCitizen = action.payload;
        });
    },
  },
});

export const { setFilters, setPagination, clearCurrentCitizen } =
  citizensSlice.actions;
export default citizensSlice.reducer;
