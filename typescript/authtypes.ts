export interface Doctor {
  _id: string;
  name: string;
  email: string;
  address: string;
  image?: string;
  department?: string;
  specialization?: string;
  fees?: number;
}

export interface DoctorState {
  doctors: Doctor[];
  loading: boolean;
  error: string | null;
}

export interface AppointmentPayload {
  doctorId: string;
  userId: string;
  name: string;
  date: string;
  time: string;
}



// ================= USER =================

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  role?: string;
}

// ================= REGISTER =================

export interface RegisterPayload {
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  password: string;
  confirm_password: string;
}

export interface RegisterResponse {
  status: boolean;
  message: string;
  data: User;
}

// ================= OTP =================

export interface VerifyOtpPayload {
  userId: string;
  otp: string;
}

export interface OtpResponse {
  status: boolean;
  message: string;
}

// ================= LOGIN =================

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: boolean;
  message: string;
  accessToken: string;
  refreshToken: string;
  data: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

// ================= AUTH STATE =================

export interface AuthState {
  user: User | null;
  token: string | null;
  role?: string | null;
  loading: boolean;
  error: string | null;
  isOtpVerified: boolean;
}

// ================= FORM TYPES =================

export interface RegisterFormData extends RegisterPayload {}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginFormErrors {
  email?: string;
  password?: string;
}

export interface RegisterFormErrors {
  first_name?: string;
  last_name?: string;
  email?: string;
  address?: string;
  password?: string;
  confirm_password?: string;
}

export interface OtpFormData {
  otp: string;
}