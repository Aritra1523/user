"use client";

import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import { deleteDepartment } from "@/redux/slice/admin/departmentSlice/departmentSlice";

const useDepartmentDelete = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Delete Department?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      await dispatch(deleteDepartment(id)).unwrap();

      Swal.fire({
        icon: "success",
        title: "Deleted Successfully",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: error,
      });
    }
  };

  return { handleDelete };
};

export default useDepartmentDelete;