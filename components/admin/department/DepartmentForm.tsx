// "use client";

// import useCreateDepartment from "@/customHooks/Department/useCreateDepartment";

// const DepartmentForm = () => {
//   const { register, handleSubmit, onSubmit, errors, isSubmitting } =
//     useCreateDepartment();

//   return (
//     <div style={styles.pageWrapper}>
//       {/* Header */}
//       <div style={styles.header}>
//         <span style={styles.headerIcon}>🏥</span>
//         <div>
//           <h1 style={styles.headerTitle}>New Department</h1>
//           <p style={styles.headerSubtitle}>
//             Add a new department to the system
//           </p>
//         </div>
//       </div>

//       {/* Form Card */}
//       <div style={styles.body}>
//         <div style={styles.card}>
//           {/* Card Title Bar */}
//           <div style={styles.cardTitleBar}>
//             <div style={styles.cardTitleDot} />
//             <span style={styles.cardTitleText}>Department Details</span>
//           </div>

//           <form onSubmit={handleSubmit(onSubmit)} style={styles.form} noValidate>
//             {/* Department Name */}
//             <div style={styles.fieldGroup}>
//               <label style={styles.label} htmlFor="dept-name">
//                 Department Name
//                 <span style={styles.required}>*</span>
//               </label>
//               <input
//                 id="dept-name"
//                 type="text"
//                 placeholder="e.g. Cardiology, Neurology, Pediatrics"
//                 {...register("name")}
//                 style={{
//                   ...styles.input,
//                   ...(errors.name ? styles.inputError : {}),
//                 }}
//                 onFocus={(e) => {
//                   if (!errors.name) {
//                     (e.target as HTMLInputElement).style.borderColor = "#0D9488";
//                     (e.target as HTMLInputElement).style.boxShadow =
//                       "0 0 0 3px rgba(13, 148, 136, 0.12)";
//                   }
//                 }}
//                 onBlur={(e) => {
//                   if (!errors.name) {
//                     (e.target as HTMLInputElement).style.borderColor = "#CBD5E1";
//                     (e.target as HTMLInputElement).style.boxShadow = "none";
//                   }
//                 }}
//               />
//               {errors.name && (
//                 <p style={styles.errorMsg}>
//                   <span style={styles.errorIcon}>⚠</span>
//                   {errors.name.message}
//                 </p>
//               )}
//             </div>

//             {/* Description */}
//             <div style={styles.fieldGroup}>
//               <label style={styles.label} htmlFor="dept-desc">
//                 Description
//                 <span style={styles.required}>*</span>
//               </label>
//               <textarea
//                 id="dept-desc"
//                 placeholder="Briefly describe the services and scope of this department…"
//                 rows={5}
//                 {...register("description")}
//                 style={{
//                   ...styles.textarea,
//                   ...(errors.description ? styles.inputError : {}),
//                 }}
//                 onFocus={(e) => {
//                   if (!errors.description) {
//                     (e.target as HTMLTextAreaElement).style.borderColor =
//                       "#0D9488";
//                     (e.target as HTMLTextAreaElement).style.boxShadow =
//                       "0 0 0 3px rgba(13, 148, 136, 0.12)";
//                   }
//                 }}
//                 onBlur={(e) => {
//                   if (!errors.description) {
//                     (e.target as HTMLTextAreaElement).style.borderColor =
//                       "#CBD5E1";
//                     (e.target as HTMLTextAreaElement).style.boxShadow = "none";
//                   }
//                 }}
//               />
//               {errors.description && (
//                 <p style={styles.errorMsg}>
//                   <span style={styles.errorIcon}>⚠</span>
//                   {errors.description.message}
//                 </p>
//               )}
//             </div>

//             {/* Actions */}
//             <div style={styles.actions}>
//               <button
//                 type="button"
//                 style={styles.cancelBtn}
//                 onMouseEnter={(e) => {
//                   (e.currentTarget as HTMLButtonElement).style.backgroundColor =
//                     "#F1F5F9";
//                 }}
//                 onMouseLeave={(e) => {
//                   (e.currentTarget as HTMLButtonElement).style.backgroundColor =
//                     "transparent";
//                 }}
//               >
//                 Cancel
//               </button>

//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 style={{
//                   ...styles.submitBtn,
//                   ...(isSubmitting ? styles.submitBtnDisabled : {}),
//                 }}
//                 onMouseEnter={(e) => {
//                   if (!isSubmitting) {
//                     (e.currentTarget as HTMLButtonElement).style.backgroundColor =
//                       "#0F766E";
//                   }
//                 }}
//                 onMouseLeave={(e) => {
//                   if (!isSubmitting) {
//                     (e.currentTarget as HTMLButtonElement).style.backgroundColor =
//                       "#0D9488";
//                   }
//                 }}
//               >
//                 {isSubmitting ? (
//                   <>
//                     <span style={styles.spinnerSmall} />
//                     Creating...
//                   </>
//                 ) : (
//                   <>✚ Create Department</>
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>

//         {/* Helper note */}
//         <p style={styles.helperNote}>
//           Fields marked with <span style={{ color: "#EF4444" }}>*</span> are
//           required. Departments can be edited after creation.
//         </p>
//       </div>
//     </div>
//   );
// };
// --------------------------------/-



"use client";

import { useEffect } from "react";
import useCreateDepartment from "@/customHooks/Department/useCreateDepartment";
import useUpdateDepartment from "@/customHooks/Department/useUpdateDepartment";
import { Department } from "@/typescript/admin/crud";

interface DepartmentFormProps {
  selectedDepartment: Department | null;
  clearSelectedDepartment: () => void;
}

const DepartmentForm = ({
  selectedDepartment,
  clearSelectedDepartment,
}: DepartmentFormProps) => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    reset,
  } = useCreateDepartment();

  const { handleUpdate } = useUpdateDepartment();

  useEffect(() => {
    if (selectedDepartment) {
      reset({
        name: selectedDepartment.name,
        description: selectedDepartment.description,
      });
    } else {
      reset({
        name: "",
        description: "",
      });
    }
  }, [selectedDepartment, reset]);

  const submitHandler = async (data: {
    name: string;
    description: string;
  }) => {
    if (selectedDepartment) {
      await handleUpdate({
        id: selectedDepartment._id,
        name: data.name,
        description: data.description,
      });

      clearSelectedDepartment();

      reset({
        name: "",
        description: "",
      });
    } else {
      await onSubmit(data);
    }
  };

  return (
    <div style={styles.pageWrapper}>
      {/* Header */}
      <div style={styles.header}>
        <span style={styles.headerIcon}>🏥</span>

        <div>
          <h1 style={styles.headerTitle}>
            {selectedDepartment ? "Edit Department" : "New Department"}
          </h1>

          <p style={styles.headerSubtitle}>
            {selectedDepartment
              ? "Update department information"
              : "Add a new department to the system"}
          </p>
        </div>
      </div>

      <div style={styles.body}>
        <div style={styles.card}>
          <div style={styles.cardTitleBar}>
            <div style={styles.cardTitleDot} />
            <span style={styles.cardTitleText}>
              Department Details
            </span>
          </div>

          <form
            onSubmit={handleSubmit(submitHandler)}
            style={styles.form}
            noValidate
          >
            {/* Department Name */}

            <div style={styles.fieldGroup}>
              <label style={styles.label}>
                Department Name
              </label>

              <input
                type="text"
                placeholder="Department Name"
                {...register("name")}
                style={{
                  ...styles.input,
                  ...(errors.name ? styles.inputError : {}),
                }}
              />

              {errors.name && (
                <p style={styles.errorMsg}>
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Description */}

            <div style={styles.fieldGroup}>
              <label style={styles.label}>
                Description
              </label>

              <textarea
                rows={5}
                placeholder="Description..."
                {...register("description")}
                style={{
                  ...styles.textarea,
                  ...(errors.description
                    ? styles.inputError
                    : {}),
                }}
              />

              {errors.description && (
                <p style={styles.errorMsg}>
                  {errors.description.message}
                </p>
              )}
            </div>

            <div style={styles.actions}>
              {selectedDepartment && (
                <button
                  type="button"
                  style={styles.cancelBtn}
                  onClick={() => {
                    clearSelectedDepartment();

                    reset({
                      name: "",
                      description: "",
                    });
                  }}
                >
                  Cancel Edit
                </button>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                style={styles.submitBtn}
              >
                {isSubmitting
                  ? "Saving..."
                  : selectedDepartment
                  ? "Update Department"
                  : "Create Department"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};





const styles: Record<string, React.CSSProperties> = {
  pageWrapper: {
    minHeight: "100vh",
    backgroundColor: "#F8FAFC",
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },

  header: {
    background: "linear-gradient(135deg, #0F172A 0%, #1E3A5F 100%)",
    padding: "28px 36px",
    display: "flex",
    alignItems: "center",
    gap: "16px",
    borderBottom: "3px solid #0D9488",
  },
  headerIcon: {
    fontSize: "32px",
    lineHeight: 1,
  },
  headerTitle: {
    margin: 0,
    fontSize: "22px",
    fontWeight: 700,
    color: "#FFFFFF",
    letterSpacing: "-0.3px",
  },
  headerSubtitle: {
    margin: "2px 0 0",
    fontSize: "13px",
    color: "#94A3B8",
    fontWeight: 400,
  },

  body: {
    padding: "36px",
    maxWidth: "600px",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: "12px",
    border: "1px solid #E2E8F0",
    boxShadow: "0 4px 16px rgba(0,0,0,0.07)",
    overflow: "hidden",
  },

  cardTitleBar: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "16px 24px",
    backgroundColor: "#F8FAFC",
    borderBottom: "1px solid #E2E8F0",
  },
  cardTitleDot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    backgroundColor: "#0D9488",
    flexShrink: 0,
  },
  cardTitleText: {
    fontSize: "13px",
    fontWeight: 600,
    color: "#475569",
    textTransform: "uppercase" as const,
    letterSpacing: "0.6px",
  },

  form: {
    padding: "28px 24px 24px",
    display: "flex",
    flexDirection: "column" as const,
    gap: "24px",
  },

  fieldGroup: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "6px",
  },

  label: {
    fontSize: "13.5px",
    fontWeight: 600,
    color: "#0F172A",
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  required: {
    color: "#EF4444",
    fontSize: "14px",
    lineHeight: 1,
  },

  input: {
    padding: "11px 14px",
    fontSize: "14px",
    color: "#0F172A",
    backgroundColor: "#FFFFFF",
    border: "1.5px solid #CBD5E1",
    borderRadius: "8px",
    outline: "none",
    transition: "border-color 0.15s ease, box-shadow 0.15s ease",
    width: "100%",
    boxSizing: "border-box" as const,
  },
  textarea: {
    padding: "11px 14px",
    fontSize: "14px",
    color: "#0F172A",
    backgroundColor: "#FFFFFF",
    border: "1.5px solid #CBD5E1",
    borderRadius: "8px",
    outline: "none",
    resize: "vertical" as const,
    transition: "border-color 0.15s ease, box-shadow 0.15s ease",
    width: "100%",
    boxSizing: "border-box" as const,
    lineHeight: 1.6,
    fontFamily: "inherit",
  },
  inputError: {
    borderColor: "#EF4444",
    backgroundColor: "#FFF5F5",
    boxShadow: "0 0 0 3px rgba(239, 68, 68, 0.1)",
  },

  errorMsg: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    margin: 0,
    fontSize: "12.5px",
    color: "#DC2626",
    fontWeight: 500,
  },
  errorIcon: {
    fontSize: "13px",
    flexShrink: 0,
  },

  actions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    paddingTop: "8px",
    borderTop: "1px solid #F1F5F9",
    marginTop: "4px",
  },

  cancelBtn: {
    padding: "10px 22px",
    fontSize: "14px",
    fontWeight: 600,
    color: "#475569",
    backgroundColor: "transparent",
    border: "1.5px solid #CBD5E1",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.15s ease",
  },

  submitBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 24px",
    fontSize: "14px",
    fontWeight: 600,
    color: "#FFFFFF",
    backgroundColor: "#0D9488",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.15s ease",
    letterSpacing: "0.1px",
  },
  submitBtnDisabled: {
    backgroundColor: "#94A3B8",
    cursor: "not-allowed",
  },
  spinnerSmall: {
    display: "inline-block",
    width: "14px",
    height: "14px",
    border: "2px solid rgba(255,255,255,0.4)",
    borderTop: "2px solid #FFFFFF",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },

  helperNote: {
    marginTop: "16px",
    fontSize: "12.5px",
    color: "#94A3B8",
    lineHeight: 1.5,
  },
};

export default DepartmentForm;