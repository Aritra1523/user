export const endpoints = {
  register: "auth/register",
  otp: "auth/verify_otp",
  login: "auth/login",
  doctorList: "user/doctor/list",
  doctorAppointment: "doctor/appointment",

  // Admin
  departmentCreate: "admin/doctor/department",
  departmentList: "admin/departments/list",
  departmentUpdate:"admin/department/update",
  departmentDelete: "admin/department/delete",

  // Doctor
  adminDoctorList: "admin/doctor/list",
  doctorDetails: "admin/doctor/details",
  doctorUpdate: "admin/doctor/update",
  doctorDelete: "admin/doctor/delete",
};
