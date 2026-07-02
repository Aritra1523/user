"use client";
import Link from "next/link";
import { useSelector } from "react-redux";
import useLogin from "@/customHooks/authHook/useLogin";
import styles from "./Login.module.css";
import { RootState } from "@/redux/store/store";

const Login = () => {
  const { register, handleSubmit, errors, isSubmitting } = useLogin();
  const { error: serverError } = useSelector((state: RootState) => state.auth);

  return (
    <div className={styles.page}>
      {/* ============ Brand panel ============ */}
      <aside className={styles.aside}>
        <Link href="/" className={styles.logo}>
          <svg
            className={styles.logoMark}
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <rect width="40" height="40" rx="11" fill="white" fillOpacity="0.16" />
            <rect x="9" y="11" width="22" height="19" rx="4" fill="white" />
            <rect x="9" y="11" width="22" height="6" rx="4" fill="#0d4d4d" />
            <circle cx="14.5" cy="9" r="1.6" fill="white" />
            <circle cx="25.5" cy="9" r="1.6" fill="white" />
            <path
              d="M14 24.5L18 28L26.5 19.5"
              stroke="#146C6C"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className={styles.logoText}>
            Medi<strong>SlotBook</strong>
          </span>
        </Link>

        {/* decorative illustration, hidden on small screens */}
        <div className={styles.illustrationWrap} aria-hidden="true">
          <svg className={styles.illustration} viewBox="0 0 360 280" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dotgridLogin" width="18" height="18" patternUnits="userSpaceOnUse">
                <circle cx="1.5" cy="1.5" r="1.5" fill="rgba(255,255,255,0.14)" />
              </pattern>
              <clipPath id="cardClipLogin">
                <rect x="58" y="46" width="244" height="168" rx="18" />
              </clipPath>
            </defs>

            <rect x="0" y="0" width="360" height="280" fill="url(#dotgridLogin)" />
            <circle cx="312" cy="46" r="70" fill="rgba(255,255,255,0.06)" />
            <circle cx="34" cy="246" r="54" fill="rgba(255,255,255,0.05)" />

            {/* card shadow */}
            <ellipse cx="180" cy="226" rx="120" ry="10" fill="rgba(10,40,38,0.18)" />

            {/* appointment card */}
            <rect x="58" y="46" width="244" height="168" rx="18" fill="#FBFEFD" />
            <g clipPath="url(#cardClipLogin)">
              <rect x="58" y="46" width="244" height="46" fill="#0F5454" />
            </g>
            <text x="74" y="74" fontFamily="ui-sans-serif, system-ui, sans-serif" fontSize="13" fontWeight="700" fill="#ffffff">
              Your Appointments
            </text>

            {/* day strip */}
            {[
              { x: 72, label: "S" },
              { x: 102, label: "M" },
              { x: 132, label: "T", active: true },
              { x: 162, label: "W" },
              { x: 192, label: "T" },
              { x: 222, label: "F" },
              { x: 252, label: "S" },
            ].map((day) => (
              <g key={day.label + day.x}>
                <rect
                  x={day.x}
                  y="104"
                  width="24"
                  height="28"
                  rx="7"
                  fill={day.active ? "#F2A65A" : "#EEF5F3"}
                />
                <text
                  x={day.x + 12}
                  y="122"
                  textAnchor="middle"
                  fontFamily="ui-sans-serif, system-ui, sans-serif"
                  fontSize="11"
                  fontWeight="600"
                  fill={day.active ? "#ffffff" : "#5A716E"}
                >
                  {day.label}
                </text>
              </g>
            ))}

            {/* time slots */}
            <rect x="72" y="144" width="204" height="24" rx="8" fill="#146C6C" />
            <text x="84" y="160" fontFamily="ui-sans-serif, system-ui, sans-serif" fontSize="11" fontWeight="600" fill="#ffffff">
              10:00 AM &middot; Dr. Imran Patel
            </text>
            <path d="M256 156l4 4 7-8" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

            <rect x="72" y="176" width="204" height="24" rx="8" fill="none" stroke="#DCE6E4" strokeWidth="1.5" />
            <text x="84" y="192" fontFamily="ui-sans-serif, system-ui, sans-serif" fontSize="11" fill="#5A716E">
              3:30 PM &middot; Available
            </text>

            {/* confirmation badge */}
            <circle cx="294" cy="58" r="15" fill="#F2A65A" />
            <path d="M287 58l5 5 9-10" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />

            {/* pulse line */}
            <path
              className={styles.pulseLine}
              d="M30 246 L110 246 L124 222 L140 264 L154 232 L168 246 L330 246"
              fill="none"
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className={styles.asideCopy}>
          <h1 className={styles.tagline}>
            Welcome <span>Back.</span>
            <br />
            Your <span>Doctors</span>
            <br />
            Are <span>Waiting.</span>
          </h1>
          <p className={styles.taglineSub}>Log in to view and manage your appointments.</p>
        </div>
      </aside>

      {/* ============ Form panel ============ */}
      <div className={styles.formPanel}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formHeading}>
            <h2>Welcome back</h2>
            <p>Log in to your account.</p>
          </div>

          <input
            className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
            type="email"
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && <p className={styles.fieldError}>{errors.email.message}</p>}

          <input
            className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && <p className={styles.fieldError}>{errors.password.message}</p>}

          {serverError && <p className={styles.error}>{serverError}</p>}

          <button type="submit" disabled={isSubmitting} className={styles.button}>
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

          <div className={styles.signupPrompt}>
            <span>Don&apos;t have an account?</span>
            <Link href="/auth/register" className={styles.signupLink}>
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
