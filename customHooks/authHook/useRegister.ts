"use client";

import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Swal from "sweetalert2";
import { registerUser } from "@/redux/slice/authSlice/authSlice";
import { AppDispatch } from "@/redux/store/store";
import { RegisterFormData } from "@/typescript/authtypes";
import { registerSchema } from "@/schemas/authSchema/authSchemas";

const useRegister = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
     mode: "onChange",  
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      address: "",
      password: "",
      confirm_password: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await dispatch(registerUser(data)).unwrap();

      await Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: "OTP sent to your email.",
        confirmButtonColor: "#6366f1",
        background: "#1a1d23",
        color: "#f1f3f5",
        backdrop: "rgba(0,0,0,0.8)",
        timer: 3000,
        timerProgressBar: true,
      });

      console.log(response);
      router.push("/auth/otp");

    } catch (error: unknown) {
      let errorMessage = "Registration failed. Please try again.";

      if (typeof error === "string") {
        errorMessage = error;
      } else if (error && typeof error === "object" && "message" in error) {
        errorMessage = String(error.message);
      } else if (
        error &&
        typeof error === "object" &&
        "data" in error &&
        error.data &&
        typeof error.data === "object" &&
        "message" in error.data
      ) {
        errorMessage = String(error.data.message);
      }

      // Optionally set a server error on a field (e.g., "email" if already taken)
      // setError("email", { type: "server", message: errorMessage });

      await Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: errorMessage,
        confirmButtonColor: "#6366f1",
        background: "#1a1d23",
        color: "#f1f3f5",
        backdrop: "rgba(0,0,0,0.8)",
        confirmButtonText: "Try Again",
      });
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
  };
};

export default useRegister;