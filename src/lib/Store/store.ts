import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "@/lib/Features/Auth/authSlice"

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: AuthReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};


export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];