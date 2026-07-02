
"use client";

import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { verifyOtp,  } from "@/redux/slice/authSlice/authSlice";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { AppDispatch, RootState } from "@/redux/store/store";
import { OtpFormData } from "@/typescript/authtypes";
import { otpSchema } from "@/schemas/authSchema/authSchemas";

const useOtp = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const userId = useSelector((state: RootState) => state.auth.user?.id);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<OtpFormData>({
    resolver: yupResolver(otpSchema),
    mode: "onChange",
    defaultValues: { otp: "" },
  });

  const onSubmit = async (data: OtpFormData) => {
    if (!userId) {
      await Swal.fire({
        icon: "error",
        title: "User ID not found",
        text: "Please register again.",
        confirmButtonColor: "#6366f1",
        background: "#1a1d23",
        color: "#f1f3f5",
        backdrop: "rgba(0,0,0,0.8)",
      });
      router.push("/auth/register");
      return;
    }

    try {
      const result = await dispatch(verifyOtp({ userId, otp: data.otp })).unwrap();
      if (result) {
        await Swal.fire({
          icon: "success",
          title: "OTP Verified!",
          text: "Your email has been confirmed. You can now log in.",
          confirmButtonColor: "#6366f1",
          background: "#1a1d23",
          color: "#f1f3f5",
          backdrop: "rgba(0,0,0,0.8)",
          timer: 3000,
          timerProgressBar: true,
        });
        router.push("/auth/login");
      }
    } catch (error: unknown) {
      let errorMessage = "OTP verification failed. Please try again.";
      if (typeof error === "string") errorMessage = error;
      setError("otp", { type: "server", message: errorMessage });
      await Swal.fire({
        icon: "error",
        title: "Verification Failed",
        text: errorMessage,
        confirmButtonColor: "#6366f1",
        background: "#1a1d23",
        color: "#f1f3f5",
        backdrop: "rgba(0,0,0,0.8)",
        confirmButtonText: "Try Again",
      });
    }
  };

  // const handleResend = async () => {
  //   if (!userId) {
  //     await Swal.fire({
  //       icon: "error",
  //       title: "User ID not found",
  //       text: "Please register again.",
  //       confirmButtonColor: "#6366f1",
  //     });
  //     router.push("/auth/register");
  //     return;
  //   }

  //   try {
  //     await dispatch(resendOtp({ userId })).unwrap();
  //     await Swal.fire({
  //       icon: "success",
  //       title: "OTP Resent",
  //       text: "A new OTP has been sent to your email.",
  //       confirmButtonColor: "#6366f1",
  //       background: "#1a1d23",
  //       color: "#f1f3f5",
  //       backdrop: "rgba(0,0,0,0.8)",
  //       timer: 2000,
  //       timerProgressBar: true,
  //     });
  //     // Reset timer and clear inputs will be handled by the component
  //   } catch (error) {
  //     const msg = typeof error === "string" ? error : "Failed to resend OTP.";
  //     await Swal.fire({
  //       icon: "error",
  //       title: "Resend Failed",
  //       text: msg,
  //       confirmButtonColor: "#6366f1",
  //     });
  //   }
  // };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
    userId,
    // handleResend,
  };
};

export default useOtp;