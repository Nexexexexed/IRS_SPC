import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCitizens, fetchCitizenById } from "../../services/api/citizens";

export const loadCitizens = createAsyncThunk(
  "citizens/loadCitizens",
  async ({ page, size, filters }) => {
    const response = await fetchCitizens({ page, size, filters });
    return response;
  }
);

export const loadCitizenDetails = createAsyncThunk(
  "citizens/loadCitizenDetails",
  async (id) => {
    const citizen = await fetchCitizenById(id);
    return citizen;
  }
);

const citizensSlice = createSlice({
  name: "citizens",
  initialState: {
    list: [],
    currentCitizen: null,
    loading: false,
    loadingDetails: false,
    error: null,
    pagination: {
      currentPage: 0,
      pageSize: 20,
      totalCount: 0,
    },
    filters: {
      search: "",
      gender: "",
      status: "",
      ageFrom: "",
      ageTo: "",
      maritalStatus: "",
      education: "",
    },
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.currentPage = 0;
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    clearCurrentCitizen: (state) => {
      state.currentCitizen = null;
    },
    clearFilters: (state) => {
      state.filters = {
        search: "",
        gender: "",
        status: "",
        ageFrom: "",
        ageTo: "",
        maritalStatus: "",
        education: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCitizens.pending, (state) => {
        state.loading = true;
        state.error = null;
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
      .addCase(loadCitizenDetails.pending, (state) => {
        state.loadingDetails = true;
        state.error = null;
      })
      .addCase(loadCitizenDetails.fulfilled, (state, action) => {
        state.loadingDetails = false;
        state.currentCitizen = action.payload;
      })
      .addCase(loadCitizenDetails.rejected, (state, action) => {
        state.loadingDetails = false;
        state.error = action.error.message;
      });
  },
});

export const { setFilters, setPagination, clearCurrentCitizen, clearFilters } =
  citizensSlice.actions;
export default citizensSlice.reducer;
