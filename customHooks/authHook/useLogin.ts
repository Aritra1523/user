"use client";

import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Swal from "sweetalert2";
import { loginUser } from "@/redux/slice/authSlice/authSlice";
import { AppDispatch } from "@/redux/store/store";
import { LoginFormData } from "@/typescript/authtypes";
import { loginSchema } from "@/schemas/authSchema/authSchemas";

const useLogin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Submit handler
  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await dispatch(loginUser(data)).unwrap();
      console.log("result", result);
      localStorage.setItem("accessToken", result.accessToken);
      await Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: "Welcome back!",
        confirmButtonColor: "#6366f1",
        background: "#1a1d23",
        color: "#f1f3f5",
        backdrop: "rgba(0,0,0,0.8)",
        timer: 3000,
        timerProgressBar: true,
      });
      console.log("result", result);
      router.push("/user/doctorlist");
    } catch (error: unknown) {
      let errorMessage =
        "Login failed. Please check your credentials and try again.";

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

      await Swal.fire({
        icon: "error",
        title: "Login Failed",
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

export default useLogin;
