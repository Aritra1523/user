"use client";

import { useRouter } from "next/navigation";
// import { Doctor } from "@/typescript/admin/doctor";

import useDeleteDoctor from "@/customHooks/doctor/useDeleteDoctor";
import { Doctor } from "@/typescript/admin/crud";

interface DoctorCardProps {
  doctor: Doctor;
  index: number;
}

const DoctorCard = ({
  doctor,
  index,
}: DoctorCardProps) => {
  const router = useRouter();

  const { handleDelete } = useDeleteDoctor();

  return (
    <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-teal-500 hover:shadow-xl transition-all">

      <div className="flex justify-between items-center mb-4">
        <span className="font-bold text-gray-500">
          #{String(index + 1).padStart(2, "0")}
        </span>

        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
          Active
        </span>
      </div>

      <h2 className="text-xl font-semibold">
        {doctor.name}
      </h2>

      <p className="text-gray-600 mt-2">
        Department: {doctor.departmentId}
      </p>

      <p className="text-gray-600">
        Fees: ₹{doctor.fees}
      </p>

      <div className="mt-3 text-sm text-gray-500">
        <p>
          {doctor.schedule.startTime} -{" "}
          {doctor.schedule.endTime}
        </p>

        <p>
          Slot Duration : {doctor.schedule.slotDuration} mins
        </p>
      </div>

      <div className="flex gap-2 mt-5">

        <button
          onClick={() =>
            router.push(
              `/admin/doctor/details/${doctor._id}`
            )
          }
          className="px-3 py-2 rounded bg-blue-500 text-white"
        >
          Details
        </button>

        <button
          onClick={() =>
            router.push(
              `/admin/doctor/edit/${doctor._id}`
            )
          }
          className="px-3 py-2 rounded bg-yellow-500 text-white"
        >
          Edit
        </button>

        <button
          onClick={() =>
            handleDelete(doctor._id)
          }
          className="px-3 py-2 rounded bg-red-500 text-white"
        >
          Delete
        </button>

      </div>
    </div>
  );
};

export default DoctorCard;