export interface Schedule {
  startTime: string;
  endTime: string;
  slotDuration: number;
}

export interface Department {
  _id: string;
  name: string;
}

export interface Doctor {
  _id: string;
  name: string;
  fees: number;
  departmentId: string;
  department?: Department;
  schedule: Schedule;
}

export interface CreateDoctorPayload {
  name: string;
  fees: number;
  departmentId: string;
  schedule: Schedule;
}

export interface UpdateDoctorPayload {
  id: string;
  name: string;
  fees: number;
  departmentId: string;
  schedule: Schedule;
}

export interface DeleteDoctorPayload {
  id: string;
}

export interface DoctorDetailsResponse {
  status: boolean;
  message: string;
  data: Doctor;
}

export interface DoctorListResponse {
  status: boolean;
  message: string;
  data: Doctor[];
}

export interface DoctorState {
  doctors: Doctor[];
  doctor: Doctor | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}