
import * as yup from "yup";
//Login Schema
export const loginSchema = yup.object({
  email: yup
    .string()
    .required("Email cannot be empty")
    .email("Please enter a valid email address"),
  password: yup
    .string()
    .required("Password cannot be empty")
    .min(6, "Password must be at least 6 characters"),
});
// Register Schema
export const registerSchema = yup.object({
  first_name: yup.string().required("First name cannot be empty"),
  last_name: yup.string().required("Last name cannot be empty"),
  email: yup
    .string()
    .required("Email cannot be empty")
    .email("Please enter a valid email address"),
  address: yup
    .string()
    .required("Address cannot be empty")
    .min(5, "Address should have at least 5 characters"),
  password: yup
    .string()
    .required("Password cannot be empty")
    .min(6, "Password must be at least 6 characters"),
  confirm_password: yup
    .string()
    .required("Confirm password cannot be empty")
    .oneOf([yup.ref("password")], "Passwords must match"),
});


//otpSchema
export const otpSchema = yup.object({
  otp: yup
    .string()
    .required("OTP cannot be empty")
    .matches(/^\d{6}$/, "OTP must be exactly 6 digits"),
});



