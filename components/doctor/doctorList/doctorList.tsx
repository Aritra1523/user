"use client";

import { useState, useMemo, useCallback } from "react";
import styles from "@/components/doctor/doctorList/doctorList.module.css";
import useDoctorList from "@/customHooks/doctor/useDoctorList";
// ---------- Utility functions ----------
const getString = (val: any, fallback = "", objectKey = "name"): string => {
  if (!val) return fallback;
  if (typeof val === "string") return val;
  if (typeof val === "object" && val[objectKey]) return String(val[objectKey]);
  return fallback;
};

const seededRandom = (seed: string): number => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
};

const DOCTOR_IMAGES = {
  male: Array.from(
    { length: 10 },
    (_, i) => `https://randomuser.me/api/portraits/men/${10 + i}.jpg`,
  ),
  female: Array.from(
    { length: 10 },
    (_, i) => `https://randomuser.me/api/portraits/women/${10 + i}.jpg`,
  ),
};

const getRandomDoctorImage = (seed: string, gender?: string): string => {
  const pool =
    gender === "female"
      ? DOCTOR_IMAGES.female
      : gender === "male"
      ? DOCTOR_IMAGES.male
      : seededRandom(seed) % 2 === 0
      ? DOCTOR_IMAGES.male
      : DOCTOR_IMAGES.female;
  return pool[seededRandom(seed) % pool.length];
};

// ---------- Icons ----------
const ShareIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);
const PhoneIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.38 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.64a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const LocationDotIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
);
const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

// ---------- Doctor Card Component ----------
const DoctorCard = ({ doctor }: { doctor: any }) => {
  const name = getString(doctor.name, "Unknown Doctor");
  const department = getString(
    doctor.departmentId,
    getString(doctor.department, getString(doctor.specialization, "General Physician")),
  );
  const fees = getString(doctor.fees, "N/A");
  const hospital = getString(doctor.hospital, "Apollo Multispeciality Hospitals");
  const seed = getString(doctor._id || doctor.id, name);
  const image = getString(doctor.image, "") || getRandomDoctorImage(seed, doctor.gender);
  const scheduleStart = doctor.schedule?.startTime ?? "";
  const scheduleEnd = doctor.schedule?.endTime ?? "";
  const slotDuration = doctor.schedule?.slotDuration ?? "";
  const experience = doctor.experience || "5+ years";
  const rating = doctor.rating || 4.2;
  const availability = doctor.available !== false ? "Available Today" : "Next Available";

  return (
    <div className={styles.card}>
      <div className={styles.cardBody}>
        <div className={styles.photoWrapper}>
          <img
            className={styles.photo}
            src={image}
            alt={name}
            onError={(e) => {
              const initials = name.replace("Dr.", "").trim().slice(0, 2);
              (e.currentTarget as HTMLImageElement).src =
                `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=c9e6f0&color=1a6b8a&size=200&bold=true&font-size=0.4`;
            }}
          />
        </div>
        <div className={styles.info}>
          <div className={styles.nameRow}>
            <h3 className={styles.name}>{name}</h3>
            <button className={styles.shareButton} aria-label="Share doctor">
              <ShareIcon />
            </button>
          </div>
          <p className={styles.department}>{department}</p>
          <div className={styles.metaRow}>
            <span>⭐ {rating.toFixed(1)}</span>
            <span>🕒 {experience}</span>
            <span className={styles.fee}>₹{fees}</span>
          </div>
          {scheduleStart && (
            <p className={styles.schedule}>
              ⏰ {scheduleStart} – {scheduleEnd}
              {slotDuration ? ` · ${slotDuration} min slots` : ""}
            </p>
          )}
          <div className={styles.divider} />
          <div className={styles.location}>
            <span className={styles.locationIcon}>
              <LocationDotIcon />
            </span>
            <p className={styles.locationText}>{hospital}</p>
          </div>
          <span className={styles.availability}>{availability}</span>
        </div>
      </div>
      <div className={styles.actions}>
        <button className={styles.bookButton} >
          Book Appointment
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </button>
        <div className={styles.dividerLine} />
        <button className={styles.callButton}>
          <PhoneIcon />
          Call Now
        </button>
      </div>
    </div>
  );
};

// ---------- Reusable Empty State Component ----------
const EmptyState = ({
  title,
  subtext,
  hint,
  showReset = false,
  onReset,
  icon,
}: {
  title: string;
  subtext: string;
  hint?: string;
  showReset?: boolean;
  onReset?: () => void;
  icon?: React.ReactNode;
}) => (
  <div className={styles.emptyState}>
    {icon ? (
      icon
    ) : (
      <svg
        className={styles.emptyIcon}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
        <path d="M4 4l4 4" />
        <path d="M20 20l-4-4" />
        <circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" />
        <path d="M12 2a10 10 0 0 0-10 10" />
      </svg>
    )}
    <h2 className={styles.emptyTitle}>{title}</h2>
    <p className={styles.emptySubtext}>{subtext}</p>
    {hint && <p className={styles.emptyHint}>{hint}</p>}
    {showReset && onReset && (
      <button className={styles.resetButton} onClick={onReset}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M1 4v6h6" />
          <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
        </svg>
        Reset Filters
      </button>
    )}
  </div>
);

// ---------- Main DoctorList Component ----------
const DoctorList = () => {
  const { doctors, loading, error } = useDoctorList();

  // State for search, filters, sorting, pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [hospitalFilter, setHospitalFilter] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Compute unique departments & hospitals for filters
  const allDepartments = useMemo(() => {
    if (!doctors) return [];
    const deps = new Set<string>();
    doctors.forEach((d: any) => {
      const dep = getString(
        d.departmentId,
        getString(d.department, getString(d.specialization, "")),
      );
      if (dep) deps.add(dep);
    });
    return Array.from(deps).sort();
  }, [doctors]);

  const allHospitals = useMemo(() => {
    if (!doctors) return [];
    const hosp = new Set<string>();
    doctors.forEach((d: any) => {
      const h = getString(d.hospital, "");
      if (h) hosp.add(h);
    });
    return Array.from(hosp).sort();
  }, [doctors]);

  // Filtered & Sorted Doctors
  const filteredDoctors = useMemo(() => {
    if (!doctors) return [];
    return doctors.filter((doc: any) => {
      const search = searchTerm.toLowerCase().trim();
      if (search) {
        const name = getString(doc.name, "").toLowerCase();
        const dept = getString(
          doc.departmentId,
          getString(doc.department, getString(doc.specialization, "")),
        ).toLowerCase();
        const hosp = getString(doc.hospital, "").toLowerCase();
        if (!name.includes(search) && !dept.includes(search) && !hosp.includes(search))
          return false;
      }
      if (departmentFilter !== "all") {
        const dept = getString(
          doc.departmentId,
          getString(doc.department, getString(doc.specialization, "")),
        );
        if (dept !== departmentFilter) return false;
      }
      if (hospitalFilter !== "all") {
        const hosp = getString(doc.hospital, "");
        if (hosp !== hospitalFilter) return false;
      }
      return true;
    });
  }, [doctors, searchTerm, departmentFilter, hospitalFilter]);

  const sortedDoctors = useMemo(() => {
    const list = [...filteredDoctors];
    switch (sortBy) {
      case "fee-low":
        list.sort(
          (a, b) =>
            parseFloat(getString(a.fees, "0")) - parseFloat(getString(b.fees, "0")),
        );
        break;
      case "fee-high":
        list.sort(
          (a, b) =>
            parseFloat(getString(b.fees, "0")) - parseFloat(getString(a.fees, "0")),
        );
        break;
      case "rating":
        list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "experience":
        list.sort((a, b) => (b.experience || 0) - (a.experience || 0));
        break;
      default:
        break;
    }
    return list;
  }, [filteredDoctors, sortBy]);

  // Pagination
  const totalItems = sortedDoctors.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const paginatedDoctors = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedDoctors.slice(start, start + pageSize);
  }, [sortedDoctors, currentPage, pageSize]);

  const resetPagination = useCallback(() => setCurrentPage(1), []);

  // Handlers
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    resetPagination();
  };

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDepartmentFilter(e.target.value);
    resetPagination();
  };

  const handleHospitalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setHospitalFilter(e.target.value);
    resetPagination();
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
    resetPagination();
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1);
  };

  // Reset all filters (including search)
  const resetFilters = () => {
    setSearchTerm("");
    setDepartmentFilter("all");
    setHospitalFilter("all");
    setSortBy("relevance");
    setCurrentPage(1);
  };

  const hasActiveFilters =
    searchTerm.trim() !== "" ||
    departmentFilter !== "all" ||
    hospitalFilter !== "all" ||
    sortBy !== "relevance";

  // -------- Render states --------
  if (loading) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.loading}>
          <svg className={styles.spinner} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
          <div>Loading doctors…</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.error}>⚠️ {error}</div>
      </div>
    );
  }

  // ---------- Main render: always show hero & toolbar ----------
  return (
    <div className={styles.pageContainer}>
      {/* Hero Header */}
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>Find Your Specialist</h1>
        <p className={styles.heroSubtitle}>Book appointments with top doctors across India</p>
        <div className={styles.searchWrapper}>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search by name, department, or hospital…"
            value={searchTerm}
            onChange={handleSearch}
            aria-label="Search doctors"
          />
          <button className={styles.searchButton} aria-label="Search">
            <SearchIcon /> Search
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className={styles.toolbar}>
        <span className={styles.resultsCount}>
          {!doctors || doctors.length === 0
            ? "0 doctors"
            : hasActiveFilters
            ? `${filteredDoctors.length} matched`
            : `${doctors.length} doctor${doctors.length !== 1 ? "s" : ""}`}
        </span>
        <div className={styles.filterGroup}>
          <label>
            Department
            <select
              className={styles.filterSelect}
              value={departmentFilter}
              onChange={handleDepartmentChange}
            >
              <option value="all">All</option>
              {allDepartments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </label>
          <label>
            Hospital
            <select
              className={styles.filterSelect}
              value={hospitalFilter}
              onChange={handleHospitalChange}
            >
              <option value="all">All</option>
              {allHospitals.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>
          </label>
          <label>
            Sort by
            <select
              className={styles.sortSelect}
              value={sortBy}
              onChange={handleSortChange}
            >
              <option value="relevance">Relevance</option>
              <option value="fee-low">Fee: Low → High</option>
              <option value="fee-high">Fee: High → Low</option>
              <option value="rating">Highest Rated</option>
              <option value="experience">Most Experienced</option>
            </select>
          </label>
        </div>
      </div>

      {/* -------- Grid / Empty States -------- */}
      <div className={styles.grid}>
        {!doctors || doctors.length === 0 ? (
          // Case 1: No doctors from API
          <EmptyState
            title="No doctors found"
            subtext="There are no doctors available at the moment."
            hint="Please check back later or contact support for assistance."
          />
        ) : filteredDoctors.length === 0 ? (
          // Case 2: Doctors exist but none match the filters
          <EmptyState
            title="No results match your search"
            subtext="We couldn't find any doctors that match your current filters or search query."
            hint="Try adjusting your search terms or resetting the filters below."
            showReset={hasActiveFilters}
            onReset={resetFilters}
            icon={
              <img
                src="https://media.giphy.com/media/3o6Zt481isNVuQI1l6/giphy.gif"
                alt="No results found"
                className={styles.emptyIcon}
                style={{ width: "120px", height: "120px", objectFit: "contain" }}
              />
            }
          />
        ) : (
          // Normal: show paginated doctors
          paginatedDoctors.map((doctor: any) => (
            <DoctorCard key={doctor._id || doctor.id} doctor={doctor} />
          ))
        )}
      </div>

      {/* -------- Pagination (only if doctors exist and there are results) -------- */}
      {doctors && doctors.length > 0 && filteredDoctors.length > 0 && (
        <div className={styles.pagination}>
          <div className={styles.pageSize}>
            <label htmlFor="pageSize">Show</label>
            <select id="pageSize" value={pageSize} onChange={handlePageSizeChange}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
            <span>per page</span>
          </div>
          <div className={styles.pageNav}>
            <button
              className={styles.pageButton}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              ‹
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum = currentPage;
              if (totalPages > 5) {
                if (currentPage <= 3) pageNum = i + 1;
                else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                else pageNum = currentPage - 2 + i;
              } else {
                pageNum = i + 1;
              }
              return (
                <button
                  key={pageNum}
                  className={`${styles.pageButton} ${currentPage === pageNum ? styles.active : ""}`}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              className={styles.pageButton}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorList;