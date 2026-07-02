"use client";

import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";

interface Props {
  id: string;
}

const DepartmentEdit = ({ id }: Props) => {
  const departments = useSelector(
    (state: RootState) => state.department.departments
  );

  const department = useMemo(() => {
    return departments.find((item) => item._id === id);
  }, [departments, id]);

  if (!department) {
    return <h2>Department not found.</h2>;
  }

  return (
    <div>
      <h1>Edit Department</h1>

      <p>Name : {department.name}</p>

      <p>Description : {department.description}</p>
    </div>
  );
};

export default DepartmentEdit;