import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "@/api/axiosInstance";
import { endpoints } from "@/api/endpoints";
import { AxiosError } from "axios";

import { DepartmentPayload, DepartmentState } from "@/typescript/admin/crud";

const initialState: DepartmentState = {
  departments: [],
  loading: false,
  error: null,
  success: false,
};

// ==================== Create Department ====================

export const createDepartment = createAsyncThunk<
  any,
  DepartmentPayload,
  { rejectValue: string }
>("department/create", async (data, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(endpoints.departmentCreate, data);

    return response.data;
  } catch (error) {
    const err = error as AxiosError<{
      message: string;
    }>;

    return rejectWithValue(
      err.response?.data?.message || "Department creation failed",
    );
  }
});

// ==================== Get Department List ====================

export const getDepartmentList = createAsyncThunk<
  any,
  void,
  { rejectValue: string }
>("department/list", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(endpoints.departmentList);

    return response.data;
  } catch (error) {
    const err = error as AxiosError<{
      message: string;
    }>;

    return rejectWithValue(
      err.response?.data?.message || "Failed to fetch departments",
    );
  }
});

//Update
export const updateDepartment = createAsyncThunk(
  "department/update",
  async (
    data: {
      id: string;
      name: string;
      description: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosInstance.post(
        endpoints.departmentUpdate,
        data,
      );

      return response.data;
    } catch (error) {
      const err = error as AxiosError<{
        message: string;
      }>;

      return rejectWithValue(
        err.response?.data?.message || "Department update failed",
      );
    }
  },
);
//Delete
export const deleteDepartment = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("department/delete", async (id, { rejectWithValue }) => {
  try {
    await axiosInstance.post(endpoints.departmentDelete, { id });

    return id;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;

    return rejectWithValue(
      err.response?.data?.message || "Department delete failed",
    );
  }
});
const departmentSlice = createSlice({
  name: "department",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // ==================== Create ====================

      .addCase(createDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(createDepartment.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })

      .addCase(createDepartment.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload ?? "Department creation failed";
      })

      // ==================== List ====================

      .addCase(getDepartmentList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getDepartmentList.fulfilled, (state, action) => {
        state.loading = false;
        state.departments = action.payload.data;
      })

      .addCase(getDepartmentList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch departments";
      })

      // ================= UPDATE =================

      .addCase(updateDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateDepartment.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        const updatedDepartment = action.payload.data;

        const index = state.departments.findIndex(
          (dept) => dept._id === updatedDepartment._id,
        );

        if (index !== -1) {
          state.departments[index] = updatedDepartment;
        }
      })

      .addCase(updateDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //Delete
      .addCase(deleteDepartment.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteDepartment.fulfilled, (state, action) => {
        state.loading = false;

        state.departments = state.departments.filter(
          (item) => item._id !== action.payload,
        );
      })

      .addCase(deleteDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Delete failed";
      });
  },
});

export default departmentSlice.reducer;
