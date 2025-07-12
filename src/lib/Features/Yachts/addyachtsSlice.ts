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
  primaryImage: File;
  galleryImages: File[];
}

export interface Yachts extends AddYachtsPayload {
  id: string;
}

interface YachtsState {
  loading: boolean;
  yachts: Yachts | null;
  error: string | null;
}

const initialState: YachtsState = {
  loading: false,
  yachts: null,
  error: null,
};

export const addYachts = createAsyncThunk<
  Yachts,
  AddYachtsPayload,
  { rejectValue: { error: { message: string } } }
>(
  "vendor/addVendor",
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

const addYachtsSlice = createSlice({
  name: "vendor",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addYachts.pending, (state) => {
        state.loading = true;
        state.yachts = null;
        state.error = null;
      })
      .addCase(addYachts.fulfilled, (state, action) => {
        state.loading = false;
        state.yachts = action.payload;
        state.error = null;
      })
      .addCase(addYachts.rejected, (state, action) => {
        state.loading = false;
        state.yachts = null;
        const payload = action.payload as { error: { message: string } };
        state.error = payload?.error?.message || "Failed to add yachts.";
      });
  },
});

export default addYachtsSlice.reducer;