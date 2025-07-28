import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "@/lib/Features/Auth/authSlice";
import YachtsReducer from "@/lib/Features/Yachts/yachtsSlice"

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: AuthReducer,
      yachts: YachtsReducer
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