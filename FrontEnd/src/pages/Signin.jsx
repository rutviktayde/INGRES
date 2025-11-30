import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Signin = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [email, setEmail] = useState("");
  const [passcodeInput, setPasscodeInput] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState("email"); // "email" | "code"
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const toggleTheme = () => setDarkMode((prev) => !prev);

  const handleSendCode = async () => {
    setError("");
    setInfo("");
    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/auth/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to send code");
      }

      setInfo(`Code sent to ${email}. Please check your inbox.`);
      setStep("code");
    } catch (err) {
      setError(err.message || "Error sending code");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
  setError("");
  setInfo("");

  if (!code.trim()) {
    setError("Please enter the code you received.");
    return;
  }

  try {
    setLoading(true);
    const res = await fetch("http://localhost:5000/auth/verify-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        passcode: code   // ✅ FIXED — matches backend
      }),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || "Verification failed");
    }

    // Save token and redirect
    localStorage.setItem("ingres_token", data.token);
    setInfo("Verified! Redirecting...");
    navigate("/");
  } catch (err) {
    setError(err.message || "Error verifying code");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className={`gw-app ${darkMode ? "dark" : "light"}`}>
      {/* Floating logo & buttons, same vibe as chat */}
      <div className="gw-floating gw-floating-left">
        <img src="/INGRES_LOGO.png" alt="INGRES" className="gw-floating-logo" />
      </div>

      <div className="gw-floating gw-floating-right">
        <button className="gw-icon-toggle" onClick={toggleTheme}>
          {darkMode ? "◐" : "◑"}
        </button>
        <button
          className="gw-auth-btn gw-auth-secondary"
          onClick={() => navigate("/signin")}
        >
          Sign in
        </button>
        <button
          className="gw-auth-btn gw-auth-primary"
          onClick={() => alert("Sign up coming soon")}
        >
          Sign up
        </button>
      </div>

      {/* Centered card */}
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px",
        }}
      >
        <div
          style={{
            maxWidth: "480px",
            width: "100%",
            borderRadius: "24px",
            padding: "28px 24px 24px",
            background: "var(--gw-surface-soft)",
            border: "1px solid var(--gw-border)",
            boxShadow: "0 18px 40px rgba(0,0,0,0.35)",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "18px" }}>
            <img
              src="/INGRES_LOGO.png"
              alt="INGRES"
              style={{
                width: "64px",
                height: "64px",
                objectFit: "contain",
                marginBottom: "8px",
                filter: "drop-shadow(0 0 14px rgba(76,155,194,0.7))",
              }}
            />
            <h2
              style={{
                margin: "0 0 8px",
                fontSize: "22px",
                fontWeight: 600,
              }}
            >
              Welcome to Ingres Chatbot for<br />Ground Water Data Search
            </h2>
            <p
              style={{
                margin: 0,
                fontSize: "13px",
                color: "var(--gw-text-muted)",
              }}
            >
              Sign in with your email to continue.
            </p>
          </div>

          {/* Email input */}
          <div style={{ marginBottom: "14px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontSize: "13px",
              }}
            >
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: "12px",
                border: "1px solid var(--gw-border)",
                background: "var(--gw-surface)",
                color: "var(--gw-text)",
                outline: "none",
                fontSize: "14px",
              }}
            />
          </div>

          {/* If code sent, show code field */}
          {step === "code" && (
            <div style={{ marginBottom: "14px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "6px",
                  fontSize: "13px",
                }}
              >
                Verification code
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter the 6-digit code"
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: "12px",
                  border: "1px solid var(--gw-border)",
                  background: "var(--gw-surface)",
                  color: "var(--gw-text)",
                  outline: "none",
                  fontSize: "14px",
                }}
              />
            </div>
          )}

          {/* Error / Info */}
          {error && (
            <p style={{ color: "#f97373", fontSize: "13px", marginBottom: "8px" }}>
              {error}
            </p>
          )}
          {info && (
            <p style={{ color: "var(--gw-accent)", fontSize: "13px", marginBottom: "8px" }}>
              {info}
            </p>
          )}

          {/* Actions */}
          <div style={{ marginTop: "12px" }}>
            {step === "email" ? (
              <button
                onClick={handleSendCode}
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "10px 0",
                  borderRadius: "999px",
                  border: "none",
                  background: "#4c9bc2",
                  color: "#020617",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {loading ? "Sending..." : "Send code"}
              </button>
            ) : (
              <button
                onClick={handleVerifyCode}
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "10px 0",
                  borderRadius: "999px",
                  border: "none",
                  background: "#4c9bc2",
                  color: "#020617",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {loading ? "Verifying..." : "Verify & continue"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
