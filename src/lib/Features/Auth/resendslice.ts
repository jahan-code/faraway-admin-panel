import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

export const resendotpUser = createAsyncThunk(
  "user/resendotpUser",
  async (
    credentials: {
      email: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `http://localhost:8001/auth/resend-otp`,
        credentials
      );
      if (response?.data.error) {
        throw new Error(
          response?.data?.error?.message || "Something went wrong"
        );
      }
      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>;
      const message = axiosError.message;
      return rejectWithValue(message);
    }
  }
);

interface User {
  id: string;
}

interface AuthState {
  loading: boolean;
  user: User | null;
  error: string | null;
}

interface CustomErrorPayload {
  error: {
    message: string;
  };
}

const initialState: AuthState = {
  loading: false,
  user: null,
  error: null,
};

const resendotpSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(resendotpUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(resendotpUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(resendotpUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        const payload = action.payload as CustomErrorPayload;
        state.error = payload.error.message;
      });
  },
});

export default resendotpSlice.reducer;