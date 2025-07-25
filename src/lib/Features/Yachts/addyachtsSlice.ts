import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

export interface AddYachtsPayload {
  boatType: string;
  price: string;
  capacity: string;
  length: string;
  lengthRange: string;
  cabins: string;
  bathrooms: string;
  passengerDayTrip: string;
  passengerOvernight: string;
  guests: string;
  guestsRange: string;
  dayTripPrice: string;
  daytripPriceUSD: string;
  overnightPrice: string;
  daytripPriceEuro: string;
  daytripPriceTHB: string;
  priceEditor?: string;
  tripDetailsEditor?: string;
  dayCharter?: string;
  overnightCharter?: string;
  aboutThisBoat?: string;
  specifications?: string;
  boatLayout?: string;
  videoLink: string;
  videoLink2?: string;
  videoLink3?: string;
  badge?: string;
  design: string;
  built: string;
  cruisingSpeed: string;
  lengthOverall: string;
  fuelCapacity: string;
  waterCapacity: string;
  code?: string;
  title: string;
  type: string;
  primaryImage: File;
  galleryImages: File[];
}

export interface YachtsApiResponse {
  _id: string;
  boatType: string;
  title: string;
  price: string;
  capacity: string;
  length: string;
  lengthRange: string;
  cabins: string;
  bathrooms: string;
  passengerDayTrip: string;
  passengerOvernight: string;
  guests: string;
  guestsRange: string;
  dayTripPrice: string;
  daytripPriceUSD: string;
  overnightPrice: string;
  daytripPriceEuro: string;
  daytripPriceTHB: string;
  primaryImage: string;
  galleryImages: string[];
  priceEditor?: string;
  tripDetailsEditor?: string;
  dayCharter?: string;
  overnightCharter?: string;
  aboutThisBoat?: string;
  specifications?: string;
  boatLayout?: string;
  videoLink: string;
  videoLink2?: string;
  videoLink3?: string;
  badge?: string;
  design: string;
  built: string;
  cruisingSpeed: string;
  lengthOverall: string;
  fuelCapacity: string;
  waterCapacity: string;
  type: string;
  code?: string;
  createdAt: string;
  __v: number;
}

export interface Yachts extends YachtsApiResponse {
  id: string;
}

interface GetYachtsParams {
  page: number;
  limit: number;
}

interface YachtsResponse {
  yachts: YachtsApiResponse[];
  total: number;
  totalPages: number;
  currentPage: number;
}

interface YachtsState {
  loading: boolean;
  yachts: Yachts | null;
  allYachts: YachtsApiResponse[];
  error: string | null;
  addLoading: boolean;
  total: number;
  totalPages: number;
  currentPage: number;
  getLoading: boolean;
  deleteLoading: boolean;
}

const initialState: YachtsState = {
  loading: false,
  yachts: null,
  allYachts: [],
  error: null,
  addLoading: false,
  total: 0,
  totalPages: 0,
  currentPage: 1,
  getLoading: false,
  deleteLoading: false,
};

// Add Yacht
export const addYachts = createAsyncThunk<
  Yachts,
  AddYachtsPayload,
  { rejectValue: { error: { message: string } } }
>(
  "yachts/addYacht",
  async (credentials, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://faraway.thedevapp.online/yacht/add-yacht",
        credentials,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response?.data.error) {
        throw new Error(
          response?.data?.error?.message || "Something went wrong"
        );
      }
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>;
      const message =
        axiosError.response?.data?.message ||
        axiosError.message ||
        "Something went wrong";
      return rejectWithValue({ error: { message } });
    }
  }
);

// Get All Yachts
export const getYachts = createAsyncThunk<
  YachtsResponse,
  GetYachtsParams,
  { rejectValue: { error: { message: string } } }
>(
  "yachts/getYachts",
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `https://faraway.thedevapp.online/yacht/all-yachts?page=${page}&limit=${limit}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.data.error) {
        throw new Error(
          response?.data?.error?.message || "Something went wrong"
        );
      }
      return response.data.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>;
      const message =
        axiosError.response?.data?.message ||
        axiosError.message ||
        "Something went wrong";
      return rejectWithValue({ error: { message } });
    }
  }
);

// Delete Yacht
export const deleteYachts = createAsyncThunk<
  { success: boolean; id: string },
  string,
  { rejectValue: { error: { message: string } } }
>(
  "yachts/deleteYacht",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `https://faraway.thedevapp.online/yacht/delete-yacht?id=${id}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.data.error) {
        throw new Error(
          response?.data?.error?.message || "Something went wrong"
        );
      }
      return { success: true, id };
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>;
      const message =
        axiosError.response?.data?.message ||
        axiosError.message ||
        "Something went wrong";
      return rejectWithValue({ error: { message } });
    }
  }
);

const yachtsSlice = createSlice({
  name: "yachts",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearYachts: (state) => {
      state.yachts = null;
      state.allYachts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Add Yacht
      .addCase(addYachts.pending, (state) => {
        state.addLoading = true;
        state.error = null;
      })
      .addCase(addYachts.fulfilled, (state, action) => {
        state.addLoading = false;
        state.yachts = action.payload;
        state.error = null;
      })
      .addCase(addYachts.rejected, (state, action) => {
        state.addLoading = false;
        const payload = action.payload as { error: { message: string } };
        state.error = payload?.error?.message || "Failed to add yacht.";
      })
      // Get Yachts
      .addCase(getYachts.pending, (state) => {
        state.getLoading = true;
        state.error = null;
      })
      .addCase(getYachts.fulfilled, (state, action) => {
        state.getLoading = false;
        state.allYachts = action.payload.yachts;
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.error = null;
      })
      .addCase(getYachts.rejected, (state, action) => {
        state.getLoading = false;
        const payload = action.payload as { error: { message: string } };
        state.error = payload?.error?.message || "Failed to get yachts.";
      })
      // Delete Yacht
      .addCase(deleteYachts.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })
      .addCase(deleteYachts.fulfilled, (state, action) => {
        state.deleteLoading = false;
        // Remove the deleted yacht from the list
        state.allYachts = state.allYachts.filter(yacht => yacht._id !== action.payload.id);
        state.error = null;
      })
      .addCase(deleteYachts.rejected, (state, action) => {
        state.deleteLoading = false;
        const payload = action.payload as { error: { message: string } };
        state.error = payload?.error?.message || "Failed to delete yacht.";
      });
  },
});

export const { clearError, clearYachts } = yachtsSlice.actions;
export default yachtsSlice.reducer;