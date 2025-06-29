import { configureStore } from "@reduxjs/toolkit";
import SignupReducer from "@/lib/Features/Auth/signupslice";
import SigninReducer from "@/lib/Features/Auth/signinslice";
import OtpReducer from "@/lib/Features/Auth/otpslice";
import ResendOtpReducer from "@/lib/Features/Auth/resendslice";
import ForgotPasswordReducer from "@/lib/Features/Auth/forgotpasswordslice";
import ResetPasswordReducer from "@/lib/Features/Auth/resetpasswordslice";
import AddVendorReducer from "@/lib/Features/Vendor/addvendorslice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      signup: SignupReducer,
      signin: SigninReducer,
      otp: OtpReducer,
      resendotp: ResendOtpReducer,
      forgotpassword: ForgotPasswordReducer,
      resetpassword: ResetPasswordReducer,
      addvendor: AddVendorReducer
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