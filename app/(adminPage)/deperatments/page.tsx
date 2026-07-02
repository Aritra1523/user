// import React from "react";
// import DepartmentForm from "@/components/admin/department/DepartmentForm";
// import DepartmentList from "@/components/admin/department/DepartmentList";

// const Page = () => {

//   return (
//     <div style={styles.pageWrapper}>
//       {/* Page Header */}
//       <div style={styles.pageHeader}>
//         <div>
//           <h1 style={styles.pageTitle}>🏥 Department Management</h1>
//           <p style={styles.pageSubtitle}>
//             Create and manage hospital departments
//           </p>
//         </div>
//       </div>

//       {/* Two-column layout */}
//       <div style={styles.columns}>
//         {/* LEFT — sticky form */}
//         <div style={styles.stickyCol}>
//           <DepartmentForm />
//         </div>

//         {/* RIGHT — scrollable list */}
//         <div style={styles.scrollCol}>
//           <DepartmentList />
//         </div>
//       </div>
//     </div>
//   );
// };

// const styles: Record<string, React.CSSProperties> = {
//   pageWrapper: {
//     minHeight: "100vh",
//     backgroundColor: "#F8FAFC",
//     fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
//   },
//   pageHeader: {
//     background: "linear-gradient(135deg, #0F172A 0%, #1E3A5F 100%)",
//     borderBottom: "3px solid #0D9488",
//     padding: "28px 36px",
//     position: "sticky" as const,
//     top: 0,
//     zIndex: 10,
//   },
//   pageTitle: {
//     margin: 0,
//     fontSize: "22px",
//     fontWeight: 700,
//     color: "#FFFFFF",
//     letterSpacing: "-0.3px",
//   },
//   pageSubtitle: {
//     margin: "4px 0 0",
//     fontSize: "13px",
//     color: "#94A3B8",
//   },
//   columns: {
//     display: "grid",
//     gridTemplateColumns: "1fr 1fr",
//     gap: "24px",
//     padding: "24px 36px",
//     alignItems: "start", // crucial — don't stretch columns to equal height
//   },
//   stickyCol: {
//     position: "sticky" as const,
//     top: "calc(84px + 24px)", // pageHeader height + padding
//   },
//   scrollCol: {
//     // just flows naturally, no sticky
//   },
// };

// export default Page;

"use client";

import React, { useState } from "react";
import DepartmentForm from "@/components/admin/department/DepartmentForm";
import DepartmentList from "@/components/admin/department/DepartmentList";
import { Department } from "@/typescript/admin/crud";

const Page = () => {
  const [selectedDepartment, setSelectedDepartment] =
    useState<Department | null>(null);

  return (
    <div style={styles.pageWrapper}>
      {/* Header */}
      <div style={styles.pageHeader}>
        <div>
          <h1 style={styles.pageTitle}>🏥 Department Management</h1>
          <p style={styles.pageSubtitle}>
            Create and manage hospital departments
          </p>
        </div>
      </div>

      {/* Layout */}
      <div style={styles.columns}>
        {/* Left */}
        <div style={styles.stickyCol}>
          <DepartmentForm
            selectedDepartment={selectedDepartment}
            clearSelectedDepartment={() => setSelectedDepartment(null)}
          />
        </div>

        {/* Right */}
        <div style={styles.scrollCol}>
          <DepartmentList onEdit={setSelectedDepartment} />
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  pageWrapper: {
    minHeight: "100vh",
    backgroundColor: "#F8FAFC",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },
  pageHeader: {
    background: "linear-gradient(135deg, #0F172A 0%, #1E3A5F 100%)",
    borderBottom: "3px solid #0D9488",
    padding: "28px 36px",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
  pageTitle: {
    margin: 0,
    fontSize: "22px",
    fontWeight: 700,
    color: "#fff",
  },
  pageSubtitle: {
    margin: "4px 0 0",
    fontSize: "13px",
    color: "#94A3B8",
  },
  columns: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "24px",
    padding: "24px 36px",
    alignItems: "start",
  },
  stickyCol: {
    position: "sticky",
    top: "calc(84px + 24px)",
  },
  scrollCol: {},
};

export default Page;
