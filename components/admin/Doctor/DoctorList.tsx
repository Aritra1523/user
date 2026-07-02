"use client";

import useDoctorList from "@/customHooks/doctor/useDoctorList";
import DoctorCard from "./DoctorCard";

const DoctorList = () => {
  const { doctors, loading, error } =
    useDoctorList();

  if (loading) return <h2>Loading...</h2>;

  if (error) return <h2>{error}</h2>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

      {doctors.map((doctor, index) => (
        <DoctorCard
          key={doctor._id}
          doctor={doctor}
          index={index}
        />
      ))}

    </div>
  );
};

export default DoctorList;