"use client";

import useDoctorDetails from "@/customHooks/doctor/useDoctorDetails";

interface DoctorDetailsProps {
  id: string;
}

const DoctorDetails = ({ id }: DoctorDetailsProps) => {
  const { doctor, loading, error } = useDoctorDetails(id);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg font-medium">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>No doctor found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">

      <h1 className="text-3xl font-bold mb-8 border-b pb-4">
        Doctor Details
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div>
          <label className="font-semibold text-gray-600">
            Doctor Name
          </label>
          <p className="mt-1">{doctor.name}</p>
        </div>

        <div>
          <label className="font-semibold text-gray-600">
            Fees
          </label>
          <p className="mt-1">₹ {doctor.fees}</p>
        </div>

        <div>
          <label className="font-semibold text-gray-600">
            Department
          </label>
          <p className="mt-1">
            {doctor.departmentId}
          </p>
        </div>

        <div>
          <label className="font-semibold text-gray-600">
            Start Time
          </label>
          <p className="mt-1">
            {doctor.schedule.startTime}
          </p>
        </div>

        <div>
          <label className="font-semibold text-gray-600">
            End Time
          </label>
          <p className="mt-1">
            {doctor.schedule.endTime}
          </p>
        </div>

        <div>
          <label className="font-semibold text-gray-600">
            Slot Duration
          </label>
          <p className="mt-1">
            {doctor.schedule.slotDuration} Minutes
          </p>
        </div>

      </div>
    </div>
  );
};

export default DoctorDetails;