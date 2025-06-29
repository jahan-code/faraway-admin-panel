"use client";

import Input from "@/common/Input";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "@/common/Button";
import MailBox from "@/icons/MailBox";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { forgotpasswordUser } from "@/lib/Features/Auth/forgotpasswordslice";
import type { AppDispatch, RootState } from '@/lib/Store/store';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ForgetPasswordForm: React.FC = () => {

    const dispatch = useDispatch<AppDispatch>();
    const { error } = useSelector((state: RootState) => state.forgotpassword);
    const router = useRouter();

    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm, setSubmitting, setFieldError }) => {
            try {
                const resultAction = await dispatch(forgotpasswordUser({
                    email: values.email,
                }));

                if (forgotpasswordUser.fulfilled.match(resultAction)) {
                    const message = resultAction.payload?.message;
                    toast.success(message, {
                        onClose: () => {
                            router.push("/otp")
                        },
                    });
                    localStorage.setItem("userEmail", values.email);
                    resetForm();
                } else if (forgotpasswordUser.rejected.match(resultAction)) {
                    const errorMessage = resultAction.payload as string;
                    toast.error(errorMessage);
                }
            } catch (error) {
                console.error("Login error:", error);
                setFieldError("password", "An unexpected error occurred");
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="px-6 sm:px-10 xl:px-12 space-y-3">
                <div className="flex flex-col gap-4">
                    <Image src="/images/logo.png" alt="logo" width={552} height={210} className="w-[15rem]"/>
                    <h2 className="text-[#1E1E1E] text-[19px] font-bold font-plusjakarta">Anchor Your Dreams</h2>
                    <h1 className="text-[#012A50] font-bold text-[24px] font-plusjakarta max-w-sm">Lost at Sea? Reset Your Password!</h1>
                    <p className="text-[14px] font-medium text-[#888888] font-plusjakarta">
                        Don&apos;t worry! Enter your email below, and we&apos;ll send you a link to reset your password and get back to sailing in no time.
                    </p>
                    {error && <p className="text-[#FF4234] text-sm">{error}</p>}
                </div>
                <div className="space-y-5">
                    <div className="space-y-1">
                        <label htmlFor="" className="text-[#012A50] font-plusjakarta font-bold text-[14px] mb-[15px] block">Email</label>
                        <Input
                            name="email"
                            type="email"
                            icon={<MailBox />}
                            placeholder="Your email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && !!formik.errors.email}
                        />
                        {formik.touched.email && formik.errors.email && (<p className="text-[#FF4234] text-sm">{formik.errors.email}</p>)}
                    </div>
                    <Button
                        type="submit"
                        className={`w-full ${formik.isSubmitting ? "bg-[#C3974C]" : "bg-[#001B48]"}`}
                        disabled={formik.isSubmitting}
                    >
                        {formik.isSubmitting ? "Loading..." : "Next"}
                    </Button>
                    <p className="text-[14px] font-medium text-[#B0B0B0]">
                        If you don&apos;t receive the email within a minute, please check your
                        spam folder or try again.
                    </p>
                </div>
            </div>
        </form>
    );
};

export default ForgetPasswordForm;