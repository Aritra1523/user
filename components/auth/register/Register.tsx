// "use client";
// import Link from "next/link";
// import { useSelector } from "react-redux";
// import useRegister from "@/customHooks/authHook/useRegister";
// import styles from "./Register.module.css";
// import { RootState } from "@/redux/store/store";

// const Register = () => {
//   const { register, handleSubmit, errors, isSubmitting } = useRegister();
//   const { error: serverError } = useSelector((state: RootState) => state.auth);

//   return (
//     <form onSubmit={handleSubmit} className={styles.form}>
//       <input
//         className={`${styles.input} ${errors.first_name ? styles.inputError : ""}`}
//         type="text"
//         placeholder="First name"
//         {...register("first_name")}
//       />
//       {errors.first_name && <p className={styles.fieldError}>{errors.first_name.message}</p>}

//       <input
//         className={`${styles.input} ${errors.last_name ? styles.inputError : ""}`}
//         type="text"
//         placeholder="Last name"
//         {...register("last_name")}
//       />
//       {errors.last_name && <p className={styles.fieldError}>{errors.last_name.message}</p>}

//       <input
//         className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
//         type="email"
//         placeholder="Email"
//         {...register("email")}
//       />
//       {errors.email && <p className={styles.fieldError}>{errors.email.message}</p>}

//       <input
//         className={`${styles.input} ${errors.address ? styles.inputError : ""}`}
//         type="text"
//         placeholder="Address"
//         {...register("address")}
//       />
//       {errors.address && <p className={styles.fieldError}>{errors.address.message}</p>}

//       <input
//         className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
//         type="password"
//         placeholder="Password"
//         {...register("password")}
//       />
//       {errors.password && <p className={styles.fieldError}>{errors.password.message}</p>}

//       <input
//         className={`${styles.input} ${errors.confirm_password ? styles.inputError : ""}`}
//         type="password"
//         placeholder="Confirm password"
//         {...register("confirm_password")}
//       />
//       {errors.confirm_password && <p className={styles.fieldError}>{errors.confirm_password.message}</p>}

//       {serverError && <p className={styles.error}>{serverError}</p>}

//       <button type="submit" disabled={isSubmitting} className={styles.button}>
//         {isSubmitting ? "Registering..." : "Register"}
//       </button>

//       <div className={styles.signinPrompt}>
//         <span>Already have an account?</span>
//         <Link href="/auth/login" className={styles.signinLink}>
//           Sign in
//         </Link>
//       </div>
//     </form>
//   );
// };

// export default Register;




"use client";
import Link from "next/link";
import { useSelector } from "react-redux";
import useRegister from "@/customHooks/authHook/useRegister";
import styles from "./Register.module.css";
import { RootState } from "@/redux/store/store";

const Register = () => {
  const { register, handleSubmit, errors, isSubmitting } = useRegister();
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
              <pattern id="dotgrid" width="18" height="18" patternUnits="userSpaceOnUse">
                <circle cx="1.5" cy="1.5" r="1.5" fill="rgba(255,255,255,0.14)" />
              </pattern>
              <clipPath id="cardClip">
                <rect x="58" y="46" width="244" height="168" rx="18" />
              </clipPath>
            </defs>

            <rect x="0" y="0" width="360" height="280" fill="url(#dotgrid)" />
            <circle cx="312" cy="46" r="70" fill="rgba(255,255,255,0.06)" />
            <circle cx="34" cy="246" r="54" fill="rgba(255,255,255,0.05)" />

            {/* card shadow */}
            <ellipse cx="180" cy="226" rx="120" ry="10" fill="rgba(10,40,38,0.18)" />

            {/* appointment card */}
            <rect x="58" y="46" width="244" height="168" rx="18" fill="#FBFEFD" />
            <g clipPath="url(#cardClip)">
              <rect x="58" y="46" width="244" height="46" fill="#0F5454" />
            </g>
            <text x="74" y="74" fontFamily="ui-sans-serif, system-ui, sans-serif" fontSize="13" fontWeight="700" fill="#ffffff">
              Today&apos;s Schedule
            </text>

            {/* day strip */}
            {[
              { x: 72, label: "S" },
              { x: 102, label: "M" },
              { x: 132, label: "T" },
              { x: 162, label: "W", active: true },
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
            <rect x="72" y="144" width="204" height="24" rx="8" fill="none" stroke="#DCE6E4" strokeWidth="1.5" />
            <text x="84" y="160" fontFamily="ui-sans-serif, system-ui, sans-serif" fontSize="11" fill="#5A716E">
              9:00 AM &middot; Available
            </text>

            <rect x="72" y="176" width="204" height="24" rx="8" fill="#146C6C" />
            <text x="84" y="192" fontFamily="ui-sans-serif, system-ui, sans-serif" fontSize="11" fontWeight="600" fill="#ffffff">
              11:30 AM &middot; Dr. Aritra Das
            </text>
            <path d="M256 188l4 4 7-8" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

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
            Find <span>Doctors.</span>
            <br />
            Save <span>Time.</span>
            <br />
            Stay <span>Healthy.</span>
          </h1>
          <p className={styles.taglineSub}>Create your account to book your first appointment.</p>
        </div>
      </aside>

      {/* ============ Form panel ============ */}
      <div className={styles.formPanel}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formHeading}>
            <h2>Create your account</h2>
            <p>It only takes a minute.</p>
          </div>

          <input
            className={`${styles.input} ${errors.first_name ? styles.inputError : ""}`}
            type="text"
            placeholder="First name"
            {...register("first_name")}
          />
          {errors.first_name && <p className={styles.fieldError}>{errors.first_name.message}</p>}

          <input
            className={`${styles.input} ${errors.last_name ? styles.inputError : ""}`}
            type="text"
            placeholder="Last name"
            {...register("last_name")}
          />
          {errors.last_name && <p className={styles.fieldError}>{errors.last_name.message}</p>}

          <input
            className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
            type="email"
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && <p className={styles.fieldError}>{errors.email.message}</p>}

          <input
            className={`${styles.input} ${errors.address ? styles.inputError : ""}`}
            type="text"
            placeholder="Address"
            {...register("address")}
          />
          {errors.address && <p className={styles.fieldError}>{errors.address.message}</p>}

          <input
            className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && <p className={styles.fieldError}>{errors.password.message}</p>}

          <input
            className={`${styles.input} ${errors.confirm_password ? styles.inputError : ""}`}
            type="password"
            placeholder="Confirm password"
            {...register("confirm_password")}
          />
          {errors.confirm_password && <p className={styles.fieldError}>{errors.confirm_password.message}</p>}

          {serverError && <p className={styles.error}>{serverError}</p>}

          <button type="submit" disabled={isSubmitting} className={styles.button}>
            {isSubmitting ? "Registering..." : "Register"}
          </button>

          <div className={styles.signinPrompt}>
            <span>Already have an account?</span>
            <Link href="/auth/login" className={styles.signinLink}>
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
