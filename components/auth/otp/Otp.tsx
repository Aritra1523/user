"use client";
import { useRef, useState, useEffect, KeyboardEvent, ClipboardEvent } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import useOtp from "@/customHooks/authHook/useOtp";
import styles from "./Otp.module.css";
import { RootState } from "@/redux/store/store";

const DIGITS = 6;
const EXPIRY_SECONDS = 120;

const VerifyOtp = () => {
  const { register, handleSubmit, errors, isSubmitting, userId,  } = useOtp();
  const { error: serverError } = useSelector((state: RootState) => state.auth);

  // Correct email selector
  const userEmail = useSelector((state: RootState) => state.auth.user?.email) ?? "you@example.com";

  const [digits, setDigits] = useState<string[]>(Array(DIGITS).fill(""));
  const [otpError, setOtpError] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  // Sync digits with RHF hidden input
  const { ref: rhfRef, onChange: rhfOnChange, ...rhfRest } = register("otp");

  useEffect(() => {
    rhfOnChange({ target: { name: "otp", value: digits.join("") } } as React.ChangeEvent<HTMLInputElement>);
  }, [digits, rhfOnChange]);

  // Expiry countdown
  const [expiry, setExpiry] = useState(EXPIRY_SECONDS);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    if (expiry <= 0) { setExpired(true); return; }
    const t = setTimeout(() => setExpiry((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [expiry]);

  const expiryMin = String(Math.floor(expiry / 60)).padStart(2, "0");
  const expirySec = String(expiry % 60).padStart(2, "0");

 

  // Digit input handlers
  const focusNext = (i: number) => { if (i < DIGITS - 1) inputRefs.current[i + 1]?.focus(); };
  const focusPrev = (i: number) => { if (i > 0) inputRefs.current[i - 1]?.focus(); };

  const handleChange = (i: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[i] = digit;
    setDigits(next);
    setOtpError("");
    if (digit) focusNext(i);
  };

  const handleKeyDown = (i: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (digits[i]) { const n = [...digits]; n[i] = ""; setDigits(n); }
      else focusPrev(i);
    } else if (e.key === "ArrowLeft") focusPrev(i);
    else if (e.key === "ArrowRight") focusNext(i);
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, DIGITS);
    if (!pasted) return;
    const next = [...digits];
    pasted.split("").forEach((ch, i) => { next[i] = ch; });
    setDigits(next);
    inputRefs.current[Math.min(pasted.length, DIGITS - 1)]?.focus();
  };

  const onSubmit = () => {
    const otp = digits.join("");
    if (otp.length < DIGITS) { setOtpError("Please enter all 6 digits."); return; }
    if (expired) { setOtpError("Your OTP has expired. Please resend."); return; }
    formRef.current?.requestSubmit();
  };

  const isComplete = digits.every(Boolean);

  return (
    <div className={styles.page}>
      <Link href="/auth/login" className={styles.backBtn} aria-label="Back to login">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Link>

      <h1 className={styles.pageTitle}>Verify OTP</h1>

      {/* Hero illustration (unchanged) */}
      <div className={styles.heroWrap} aria-hidden="true">
        <svg className={styles.heroSvg} viewBox="0 0 340 230" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="170" cy="128" rx="155" ry="96" fill="#e6f5f3"/>
          <ellipse cx="28" cy="178" rx="14" ry="28" fill="#b2ddd6" transform="rotate(-25 28 178)"/>
          <ellipse cx="18" cy="168" rx="10" ry="22" fill="#c8e9e4" transform="rotate(-40 18 168)"/>
          <ellipse cx="314" cy="176" rx="14" ry="28" fill="#b2ddd6" transform="rotate(25 314 176)"/>
          <ellipse cx="324" cy="166" rx="10" ry="22" fill="#c8e9e4" transform="rotate(40 324 166)"/>
          <rect x="278" y="50" width="10" height="30" rx="3" fill="#9ed5cc"/>
          <rect x="268" y="60" width="30" height="10" rx="3" fill="#9ed5cc"/>
          <path d="M60 93 L60 133 Q60 156 82 166 Q104 156 104 133 L104 93 L82 86 Z" fill="#146c6c"/>
          <path d="M72 126 L80 136 L96 116" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="118" y="46" width="84" height="148" rx="14" fill="#0d4d4d"/>
          <rect x="122" y="52" width="76" height="136" rx="11" fill="#f0f9f7"/>
          <rect x="146" y="48" width="28" height="6" rx="3" fill="#1a6060"/>
          <rect x="128" y="86" width="64" height="52" rx="8" fill="#ffffff"/>
          <rect x="128" y="86" width="64" height="16" rx="8" fill="#e6f5f3"/>
          <rect x="128" y="94" width="64" height="8" fill="#e6f5f3"/>
          <text x="160" y="100" textAnchor="middle" fontFamily="ui-sans-serif,system-ui,sans-serif" fontSize="7" fontWeight="700" fill="#146c6c">OTP</text>
          <text x="160" y="125" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="13" fontWeight="800" fill="#0d4d4d">123456</text>
          <rect x="148" y="174" width="24" height="4" rx="2" fill="#9ed5cc"/>
          <rect x="196" y="110" width="72" height="84" rx="12" fill="#ffffff"/>
          <rect x="200" y="128" width="64" height="66" rx="10" fill="#efefef"/>
          <rect x="208" y="132" width="48" height="52" rx="6" fill="#5ab4c4"/>
          <path d="M200 133 L218 143 L218 194 L200 194 Z" fill="#ffffff"/>
          <path d="M264 133 L246 143 L246 194 L264 194 Z" fill="#ffffff"/>
          <path d="M214 156 Q210 170 220 176 Q230 180 234 170" fill="none" stroke="#888" strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx="234" cy="170" r="4" fill="#555"/>
          <ellipse cx="232" cy="96" rx="26" ry="28" fill="#f5c5a0"/>
          <ellipse cx="232" cy="74" rx="22" ry="12" fill="#2c1a0e"/>
          <ellipse cx="214" cy="80" rx="8" ry="14" fill="#2c1a0e"/>
          <ellipse cx="250" cy="80" rx="8" ry="14" fill="#2c1a0e"/>
          <ellipse cx="224" cy="96" rx="3" ry="3.5" fill="#2c1a0e"/>
          <ellipse cx="240" cy="96" rx="3" ry="3.5" fill="#2c1a0e"/>
          <path d="M222 106 Q232 114 242 106" fill="none" stroke="#c07050" strokeWidth="2" strokeLinecap="round"/>
          <ellipse cx="206" cy="98" rx="5" ry="7" fill="#e8b090"/>
          <rect x="240" y="146" width="28" height="46" rx="5" fill="#1a1a2e"/>
          <rect x="242" y="148" width="24" height="42" rx="4" fill="#3a3a5c"/>
          <ellipse cx="244" cy="186" rx="8" ry="6" fill="#f5c5a0"/>
          <ellipse cx="252" cy="190" rx="8" ry="5" fill="#f5c5a0"/>
          <ellipse cx="260" cy="188" rx="7" ry="5" fill="#f5c5a0"/>
          <ellipse cx="266" cy="183" rx="6" ry="5" fill="#f5c5a0"/>
        </svg>
      </div>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        style={{ display: "contents" }}
        noValidate
      >
        <input type="hidden" {...rhfRest} ref={(el) => { rhfRef(el); }} />

        <div className={styles.card}>
          <h2 className={styles.heading}>Enter the OTP</h2>
          <p className={styles.subText}>
            We have sent a 6-digit OTP to<br />
            <strong className={styles.emailHighlight}>{userEmail}</strong>
          </p>

          <div className={styles.digitRow} role="group" aria-label="OTP input">
            {digits.map((d, i) => (
              <input
                key={i}
                ref={(el) => { inputRefs.current[i] = el; }}
                className={`${styles.digitBox} ${(otpError || serverError || errors.otp) ? styles.digitBoxError : ""} ${d ? styles.digitBoxFilled : ""}`}
                type="text"
                inputMode="numeric"
                autoComplete={i === 0 ? "one-time-code" : "off"}
                maxLength={1}
                value={d}
                autoFocus={i === 0}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                onPaste={handlePaste}
                aria-label={`Digit ${i + 1}`}
              />
            ))}
          </div>

          {!expired ? (
            <p className={styles.expiryText}>
              OTP will expire in{" "}
              <span className={styles.expiryTimer}>{expiryMin}:{expirySec}</span>
            </p>
          ) : (
            <p className={styles.expiryExpired}>Your OTP has expired.</p>
          )}

         

          {(otpError || serverError || errors.otp) && (
            <p className={styles.error}>
              {otpError || serverError || errors.otp?.message}
            </p>
          )}

          <button
            type="button"
            onClick={onSubmit}
            disabled={isSubmitting || !isComplete}
            className={styles.button}
          >
            {isSubmitting && <span className={styles.spinner} aria-hidden="true" />}
            {isSubmitting ? "Verifying…" : "Verify OTP"}
          </button>

           <div className={styles.securityBadge}>
            <svg width="38" height="38" viewBox="0 0 38 38" fill="none" aria-hidden="true">
              <path d="M19 3L5 9V19C5 26.4 11.4 33.3 19 35C26.6 33.3 33 26.4 33 19V9L19 3Z" fill="#e6f5f3" stroke="#146c6c" strokeWidth="1.5"/>
              <rect x="14" y="16" width="10" height="12" rx="2.5" fill="none" stroke="#146c6c" strokeWidth="1.5"/>
              <path d="M15 16V14a4 4 0 0 1 8 0v2" stroke="#146c6c" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="19" cy="22" r="2" fill="#146c6c"/>
              <line x1="19" y1="24" x2="19" y2="26" stroke="#146c6c" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <div>
              <p className={styles.badgeTitle}>Your information is secure</p>
              <p className={styles.badgeText}>We use industry-standard security to protect your data.</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default VerifyOtp;