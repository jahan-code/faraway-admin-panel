import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

export interface AddVendorPayload {
  category: string;
  name: string;
  street: string;
  zip: string;
  city: string;
  state: string;
  primaryContactNumber: string;
  contactPerson: string;
  alternativeContactNumber?: string;
  email: string;
  accountNumber?: string;
  taxIdOrSSN: string;
  note?: string;
}

export interface Vendor extends AddVendorPayload {
  id: string; 
}

interface VendorState {
  loading: boolean;
  vendor: Vendor | null;
  error: string | null;
}

const initialState: VendorState = {
  loading: false,
  vendor: null,
  error: null,
};

export const addVendor = createAsyncThunk<
  Vendor,                         
  AddVendorPayload,              
  { rejectValue: { error: { message: string } } } 
>(
  "vendor/addVendor",
  async (credentials, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      console.log(token, "token");
      const response = await axios.post(
        "http://localhost:8001/vendor/add-vendor",
        credentials,
        { withCredentials: true,
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

const addVendorSlice = createSlice({
  name: "vendor",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addVendor.pending, (state) => {
        state.loading = true;
        state.vendor = null;
        state.error = null;
      })
      .addCase(addVendor.fulfilled, (state, action) => {
        state.loading = false;
        state.vendor = action.payload;
        state.error = null;
      })
      .addCase(addVendor.rejected, (state, action) => {
        state.loading = false;
        state.vendor = null;
        const payload = action.payload as { error: { message: string } };
        state.error = payload?.error?.message || "Failed to add vendor.";
      });
  },
});

export default addVendorSlice.reducer;