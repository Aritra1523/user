export interface DepartmentPayload {
  name: string;
  description: string;
}

export interface Department {
  _id: string;
  name: string;
  description: string;
}

export interface DepartmentState {
  departments: Department[];
  loading: boolean;
  error: string | null;
  success: boolean;
}


//DOCTOR

export interface Schedule {
  startTime: string;
  endTime: string;
  slotDuration: number;
}

export interface Doctor {
  _id: string;
  name: string;
  fees: number;
  departmentId: string;
  schedule: Schedule;
}

export interface DoctorState {
  doctors: Doctor[];
  doctor: Doctor | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

export interface UpdateDoctorPayload {
  id: string;
  name: string;
  fees: number;
  departmentId: string;
  schedule: Schedule;
}