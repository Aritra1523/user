import * as yup from "yup";

export const departmentSchema = yup.object({
  name: yup
    .string()
    .required("Department name is required")
    .min(3, "Minimum 3 characters"),

  description: yup
    .string()
    .required("Description is required")
    .min(5, "Minimum 5 characters"),
});

export type DepartmentFormData = yup.InferType<
  typeof departmentSchema
>;