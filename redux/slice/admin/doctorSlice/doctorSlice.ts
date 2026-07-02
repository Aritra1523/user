import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "@/api/axiosInstance";
import { endpoints } from "@/api/endpoints";
import { AxiosError } from "axios";
import { DoctorState, UpdateDoctorPayload } from "@/typescript/admin/crud";

const initialState: DoctorState = {
  doctors: [],
  doctor: null,
  loading: false,
  error: null,
  success: false,
};
//Doctor List
export const getDoctorList = createAsyncThunk<
  any,
  void,
  { rejectValue: string }
>("doctor/list", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(endpoints.doctorList);

    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;

    return rejectWithValue(
      err.response?.data?.message || "Failed to fetch doctors",
    );
  }
});

//Doctor Details
export const getDoctorDetails = createAsyncThunk<
  any,
  string,
  { rejectValue: string }
>("doctor/details", async (id, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(
      `${endpoints.doctorDetails}/${id}`,
    );

    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;

    return rejectWithValue(
      err.response?.data?.message || "Failed to fetch doctor details",
    );
  }
});

//Update Doctor
export const updateDoctor = createAsyncThunk<
  any,
  UpdateDoctorPayload,
  { rejectValue: string }
>("doctor/update", async (data, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(endpoints.doctorUpdate, data);

    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;

    return rejectWithValue(
      err.response?.data?.message || "Doctor update failed",
    );
  }
});
//Delete Doctor
export const deleteDoctor = createAsyncThunk<
  any,
  string,
  { rejectValue: string }
>("doctor/delete", async (id, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(endpoints.doctorDelete, {
      id,
    });

    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;

    return rejectWithValue(
      err.response?.data?.message || "Doctor delete failed",
    );
  }
});
// export const bookAppointment = createAsyncThunk(
//   "doctor/bookAppointment",
//   async (
//     appointmentData: AppointmentPayload,
//     { rejectWithValue }
//   ) => {
//     try {
//       const response = await axiosInstance.post(
//         endpoints.doctorAppointment,
//         appointmentData
//       );

//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(
//         error.response?.data?.message ||
//           "Appointment booking failed"
//       );
//     }
//   }
// );

const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // ================= LIST =================

      .addCase(getDoctorList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getDoctorList.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = action.payload.data;
      })

      .addCase(getDoctorList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed";
      })

      // ================= DETAILS =================

      .addCase(getDoctorDetails.pending, (state) => {
        state.loading = true;
      })

      .addCase(getDoctorDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.doctor = action.payload.data;
      })

      .addCase(getDoctorDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed";
      })

      // ================= UPDATE =================

      .addCase(updateDoctor.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateDoctor.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })

      .addCase(updateDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Update Failed";
      })

      // ================= DELETE =================

      .addCase(deleteDoctor.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteDoctor.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })

      .addCase(deleteDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Delete Failed";
      });
  },
});

export default doctorSlice.reducer;
