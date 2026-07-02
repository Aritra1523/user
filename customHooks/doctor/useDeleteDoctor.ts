"use client";

import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import {
  deleteDoctor,
  getDoctorList,
} from "@/redux/slice/admin/doctorSlice/doctorSlice";

const useDeleteDoctor = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Delete Doctor?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
    });

    if (!result.isConfirmed) return;

    try {
      await dispatch(deleteDoctor(id)).unwrap();

      Swal.fire({
        icon: "success",
        title: "Doctor Deleted",
      });

      dispatch(getDoctorList());
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: error,
      });
    }
  };

  return {
    handleDelete,
  };
};

export default useDeleteDoctor;