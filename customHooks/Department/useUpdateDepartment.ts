"use client";

import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import Swal from "sweetalert2";
import { getDepartmentList, updateDepartment } from "@/redux/slice/admin/departmentSlice/departmentSlice";

const useUpdateDepartment = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleUpdate = async (data: {
    id: string;
    name: string;
    description: string;
  }) => {
    try {
      await dispatch(updateDepartment(data)).unwrap();

      await dispatch(getDepartmentList());

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Department updated successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error || "Department update failed.",
      });
    }
  };

  return {
    handleUpdate,
  };
};

export default useUpdateDepartment;