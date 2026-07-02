"use client";

import { useMemo, useState } from "react";
import useDepartmentList from "@/customHooks/Department/useDepartmentList";
import { Department } from "@/typescript/admin/crud";
import { useRouter } from "next/navigation";
import useDepartmentDelete from "@/customHooks/Department/useDepartmentDelete";
interface DepartmentListProps {
  onEdit: (department: Department) => void;
}

const DepartmentList = ({onEdit}:DepartmentListProps) => {
  const { departments, loading, error } = useDepartmentList();

  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const { handleDelete } = useDepartmentDelete();
  // Filter departments based on search term
  const filteredDepartments = useMemo(() => {
    return departments.filter((dept) =>
      dept.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [departments, searchTerm]);

  return (
    <div style={styles.pageWrapper}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <span style={styles.headerIcon}>🏥</span>
          <div>
            <h1 style={styles.headerTitle}>Departments</h1>
            <p style={styles.headerSubtitle}>Manage hospital departments</p>
          </div>
        </div>
        <div style={styles.headerRight}>
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search departments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
          {!loading && !error && (
            <div style={styles.badge}>
              {filteredDepartments.length} Department
              {filteredDepartments.length !== 1 ? "s" : ""}
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div style={styles.body}>
        {loading && (
          <div style={styles.stateContainer}>
            <div style={styles.spinner} />
            <p style={styles.stateText}>Loading departments...</p>
          </div>
        )}

        {error && !loading && (
          <div style={styles.errorBox}>
            <span style={styles.errorIcon}>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {!loading && !error && filteredDepartments.length === 0 && (
          <div style={styles.stateContainer}>
            <div style={styles.emptyIcon}>🗂️</div>
            <p style={styles.stateTitle}>
              {departments.length === 0
                ? "No Departments Yet"
                : "No Matching Departments"}
            </p>
            <p style={styles.stateText}>
              {departments.length === 0
                ? "Add your first department to get started."
                : "Try adjusting your search term."}
            </p>
          </div>
        )}

        {!loading && !error && filteredDepartments.length > 0 && (
          <div style={styles.grid}>
            {filteredDepartments.map(
              (department: Department, index: number) => (
                <div
                  key={department._id}
                  style={styles.card}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow =
                      "0 8px 24px rgba(13, 148, 136, 0.15)";
                    (e.currentTarget as HTMLDivElement).style.borderLeftColor =
                      "#0D9488";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow =
                      "0 2px 8px rgba(0,0,0,0.06)";
                    (e.currentTarget as HTMLDivElement).style.borderLeftColor =
                      "#CBD5E1";
                  }}
                >
                  <div style={styles.cardHeader}>
                    <div style={styles.cardIndex}>
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div style={styles.cardStatus}>Active</div>
                  </div>

                  <h3 style={styles.cardTitle}>{department.name}</h3>
                  <p style={styles.cardDescription}>
                    {department.description || "No description provided."}
                  </p>

                  <div style={styles.cardFooter}>
                    <button
                      style={styles.actionBtn}
                       onClick={() => onEdit(department)}
                    >
                      Edit
                    </button>
                    <button
                      style={styles.actionBtnDanger}
                      onClick={() => handleDelete(department._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ),
            )}
          </div>
        )}
      </div>
    </div>
  );
};

//STYLE
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
    justifyContent: "space-between",
    borderBottom: "3px solid #0D9488",
    flexWrap: "wrap",
    gap: "16px",
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    flexWrap: "wrap",
  },
  searchInput: {
    padding: "8px 16px",
    borderRadius: "8px",
    border: "1px solid #334155",
    backgroundColor: "#1E293B",
    color: "#F8FAFC",
    fontSize: "14px",
    width: "220px",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
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
  badge: {
    backgroundColor: "#0D9488",
    color: "#FFFFFF",
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: 600,
    whiteSpace: "nowrap",
  },

  body: {
    padding: "32px 36px",
  },

  stateContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "80px 20px",
    gap: "12px",
  },
  emptyIcon: {
    fontSize: "48px",
    marginBottom: "8px",
  },
  stateTitle: {
    margin: 0,
    fontSize: "18px",
    fontWeight: 600,
    color: "#0F172A",
  },
  stateText: {
    margin: 0,
    fontSize: "14px",
    color: "#64748B",
  },
  spinner: {
    width: "36px",
    height: "36px",
    border: "3px solid #E2E8F0",
    borderTop: "3px solid #0D9488",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
    marginBottom: "12px",
  },
  errorBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    backgroundColor: "#FEF2F2",
    border: "1px solid #FECACA",
    borderLeft: "4px solid #EF4444",
    borderRadius: "8px",
    padding: "16px 20px",
    color: "#991B1B",
    fontSize: "14px",
    fontWeight: 500,
  },
  errorIcon: {
    fontSize: "18px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: "10px",
    padding: "24px",
    border: "1px solid #E2E8F0",
    borderLeft: "4px solid #CBD5E1",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    transition: "box-shadow 0.2s ease, border-left-color 0.2s ease",
    cursor: "default",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  },
  cardIndex: {
    fontSize: "11px",
    fontWeight: 700,
    color: "#0D9488",
    letterSpacing: "1px",
    fontVariantNumeric: "tabular-nums",
  },
  cardStatus: {
    fontSize: "11px",
    fontWeight: 600,
    color: "#059669",
    backgroundColor: "#ECFDF5",
    padding: "3px 10px",
    borderRadius: "20px",
    border: "1px solid #A7F3D0",
  },
  cardTitle: {
    margin: "0 0 8px",
    fontSize: "17px",
    fontWeight: 700,
    color: "#0F172A",
    letterSpacing: "-0.2px",
  },
  cardDescription: {
    margin: "0 0 20px",
    fontSize: "13.5px",
    color: "#64748B",
    lineHeight: 1.6,
  },
  cardFooter: {
    display: "flex",
    gap: "10px",
    paddingTop: "16px",
    borderTop: "1px solid #F1F5F9",
  },
  actionBtn: {
    padding: "7px 18px",
    fontSize: "13px",
    fontWeight: 600,
    color: "#0D9488",
    backgroundColor: "#F0FDFA",
    border: "1px solid #99F6E4",
    borderRadius: "6px",
    cursor: "pointer",
  },
  actionBtnDanger: {
    padding: "7px 18px",
    fontSize: "13px",
    fontWeight: 600,
    color: "#EF4444",
    backgroundColor: "#FFF5F5",
    border: "1px solid #FECACA",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default DepartmentList;
