import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "@/api/axiosInstance";
import { endpoints } from "@/api/endpoints";
import { AxiosError } from "axios";
import {
  AppointmentPayload,
  Doctor,
  DoctorState,
} from "@/typescript/authtypes";

const initialState: DoctorState = {
  doctors: [],
  loading: false,
  error: null,
};

// ================= Doctor List =================

export const getDoctorList = createAsyncThunk<
  Doctor[],
  void,
  { rejectValue: string }
>("doctor/list", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(endpoints.doctorList);

    return response.data.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;

    return rejectWithValue(
      err.response?.data?.message || "Failed to fetch doctors",
    );
  }
});

// ================= Book Appointment =================

export const bookAppointment = createAsyncThunk<
  any,
  AppointmentPayload,
  { rejectValue: string }
>("doctor/bookAppointment", async (data, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(
      endpoints.doctorAppointment,
      data,
    );

    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;

    return rejectWithValue(
      err.response?.data?.message || "Appointment booking failed",
    );
  }
});

const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // Doctor List

      .addCase(getDoctorList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getDoctorList.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = action.payload;
      })

      .addCase(getDoctorList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch doctors";
      })

      // Appointment

      .addCase(bookAppointment.pending, (state) => {
        state.loading = true;
      })

      .addCase(bookAppointment.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(bookAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Appointment failed";
      });
  },
});

export default doctorSlice.reducer;
