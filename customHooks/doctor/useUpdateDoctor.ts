"use client";

import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import { updateDoctor } from "@/redux/slice/admin/doctorSlice/doctorSlice";
import { UpdateDoctorPayload } from "@/typescript/admin/crud";

const useUpdateDoctor = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleUpdate = async (
    data: UpdateDoctorPayload
  ) => {
    try {
      await dispatch(updateDoctor(data)).unwrap();

      Swal.fire({
        icon: "success",
        title: "Doctor Updated Successfully",
      });

      return true;
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: error,
      });

      return false;
    }
  };

  return {
    handleUpdate,
  };
};

export default useUpdateDoctor;