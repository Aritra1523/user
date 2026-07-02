"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { getDepartmentList } from "@/redux/slice/admin/departmentSlice/departmentSlice";

const useDepartmentList = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { departments, loading, error } = useSelector(
    (state: RootState) => state.department
  );

  useEffect(() => {
    dispatch(getDepartmentList());
  }, [dispatch]);

  return {
    departments,
    loading,
    error,
  };
};

export default useDepartmentList;