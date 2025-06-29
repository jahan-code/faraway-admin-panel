import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

export const resetpasswordUser = createAsyncThunk(
  "user/resetpasswordUser",
  async (
    credentials: { newPassword: string; confirmPassword: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `http://localhost:8001/auth/reset-password`,
        credentials,
        {
          withCredentials: true
        }
      );
      if(response?.data.error){
        throw new Error(response?.data?.error?.message || "Something went wrong");
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

const resetSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(resetpasswordUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(resetpasswordUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(resetpasswordUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        const payload = action.payload as { error: { message: string } };
        state.error = payload.error.message;
      });
  },
});

export default resetSlice.reducer;