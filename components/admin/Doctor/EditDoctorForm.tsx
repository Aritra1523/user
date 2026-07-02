"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useDoctorDetails from "@/customHooks/doctor/useDoctorDetails";
import useUpdateDoctor from "@/customHooks/doctor/useUpdateDoctor";
import { UpdateDoctorPayload } from "@/typescript/admin/doctor/doctor";

interface Props {
  id: string;
}

const EditDoctorForm = ({ id }: Props) => {
  const { doctor, loading } = useDoctorDetails(id);

  const { handleUpdate } = useUpdateDoctor();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<UpdateDoctorPayload>();

  useEffect(() => {
    if (doctor) {
      reset({
        id: doctor._id,
        name: doctor.name,
        fees: doctor.fees,
        departmentId: doctor.departmentId,
        schedule: {
          startTime: doctor.schedule.startTime,
          endTime: doctor.schedule.endTime,
          slotDuration: doctor.schedule.slotDuration,
        },
      });
    }
  }, [doctor, reset]);

  const onSubmit = async (
    data: UpdateDoctorPayload
  ) => {
    await handleUpdate(data);
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-xl"
    >
      <input
        {...register("name")}
        placeholder="Doctor Name"
        className="border p-3 w-full rounded"
      />

      <input
        type="number"
        {...register("fees", {
          valueAsNumber: true,
        })}
        placeholder="Fees"
        className="border p-3 w-full rounded"
      />

      <input
        {...register("departmentId")}
        placeholder="Department Id"
        className="border p-3 w-full rounded"
      />

      <input
        {...register("schedule.startTime")}
        placeholder="Start Time"
        className="border p-3 w-full rounded"
      />

      <input
        {...register("schedule.endTime")}
        placeholder="End Time"
        className="border p-3 w-full rounded"
      />

      <input
        type="number"
        {...register("schedule.slotDuration", {
          valueAsNumber: true,
        })}
        placeholder="Slot Duration"
        className="border p-3 w-full rounded"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-5 py-3 rounded"
      >
        Update Doctor
      </button>
    </form>
  );
};

export default EditDoctorForm;