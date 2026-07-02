"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { getDoctorList } from "@/redux/slice/admin/doctorSlice/doctorSlice";

const useDoctorList = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { doctors, loading, error } = useSelector(
    (state: RootState) => state.doctor
  );

  useEffect(() => {
    dispatch(getDoctorList());
  }, [dispatch]);

  return {
    doctors,
    loading,
    error,
  };
};

export default useDoctorList;