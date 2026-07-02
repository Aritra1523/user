"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { getDoctorDetails } from "@/redux/slice/admin/doctorSlice/doctorSlice";

const useDoctorDetails = (id: string) => {
  const dispatch = useDispatch<AppDispatch>();

  const { doctor, loading, error } = useSelector(
    (state: RootState) => state.doctor
  );

  useEffect(() => {
    if (id) {
      dispatch(getDoctorDetails(id));
    }
  }, [dispatch, id]);

  return {
    doctor,
    loading,
    error,
  };
};

export default useDoctorDetails;