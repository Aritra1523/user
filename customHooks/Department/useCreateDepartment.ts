"use client";

import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import { createDepartment } from "@/redux/slice/admin/departmentSlice/departmentSlice";
import Swal from "sweetalert2";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DepartmentFormData, departmentSchema } from "@/schemas/departmentSchema/departmentSchema";



const useCreateDepartment = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DepartmentFormData>({
    resolver: yupResolver(departmentSchema),
  });

  const onSubmit = async (data: DepartmentFormData) => {
    try {
      await dispatch(createDepartment(data)).unwrap();

      await Swal.fire({
        icon: "success",
        title: "Department Created",
      });

      reset();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: error,
      });
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    reset,
    isSubmitting,
  };
};

export default useCreateDepartment;