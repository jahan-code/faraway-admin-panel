import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

export const signupUser = createAsyncThunk(
  "user/signupUser",
  async (
    credentials: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `http://localhost:8001/auth/register`,
        credentials,
        {
          withCredentials: true
        }
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
      const message =
        axiosError.response?.data?.message ||
        axiosError.message ||
        "Something went wrong";
      return rejectWithValue({ error: { message } });
    }
  }
);

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface AuthState {
  loading: boolean;
  user: User | null;
  error: string | null;
}

const initialState: AuthState = {
  loading: false,
  user: null,
  error: null,
};

const signupSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.error = null;
      })

      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        const payload = action.payload as { error: { message: string } };
        state.error = payload?.error?.message || "Signup failed.";
      });
  },
});

export default signupSlice.reducer;