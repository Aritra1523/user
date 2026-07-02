"use client";

import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import { bookAppointment } from "@/redux/slice/admin/doctorSlice/doctorSlice";

const useAppointment = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleAppointment = async (
    doctorId: string,
    date: string,
    time: string
  ) => {
    const user = JSON.parse(
      localStorage.getItem("user") || "{}"
    );

    const payload = {
      doctorId,
      userId: user.id,
      name: user.name,
      date,
      time,
    };

    try {
      const result = await dispatch(
        bookAppointment(payload)
      ).unwrap();

      alert("Appointment booked successfully");
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return { handleAppointment };
};

export default useAppointment;