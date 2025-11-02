// src/pages/VerifyOtp.jsx
import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function VerifyOtp() {
  const { state } = useLocation();
  const email = state?.email || "";
  const navigate = useNavigate();
  const { API, setUser } = useContext(AuthContext);

  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(120);
  const [canResend, setCanResend] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let timer;
    setCountdown(120);
    setCanResend(false);

    timer = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(timer);
          setCanResend(true);
          return 0;
        }
        return c - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const verify = async () => {
    if (!otp) return alert("Enter OTP");
    setLoading(true);

    try {
      const res = await API.post("/verify-otp", { email, otp });
      const token = res.data.token;
      localStorage.setItem("token", token);

      setUser?.({ token });
      alert("Verified ✅");

      navigate("/dashboard");
    } catch (err) {
      alert(err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const resend = async () => {
    if (!canResend) return;

    try {
      await API.post("/send-otp", { email });
      alert("OTP resent ✅");

      setCountdown(120);
      setCanResend(false);

      let timer = setInterval(() => {
        setCountdown((c) => {
          if (c <= 1) {
            clearInterval(timer);
            setCanResend(true);
            return 0;
          }
          return c - 1;
        });
      }, 1000);
    } catch (err) {
      alert(err?.response?.data?.message || err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-xl w-full max-w-md text-white border border-white/20">

        <h2 className="text-3xl font-bold mb-4 text-center">Verify OTP</h2>

        <p className="text-center text-sm mb-6 opacity-80">
          OTP sent to <span className="font-semibold">{email}</span>
        </p>

        <input
          className="w-full p-3 rounded-lg bg-white/20 placeholder-gray-300 
                     outline-none focus:ring-2 focus:ring-blue-400 mb-4"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <button
          className={`w-full py-3 rounded-lg font-semibold 
                      bg-green-600 hover:bg-green-500 transition 
                      ${loading && "opacity-50 cursor-not-allowed"}`}
          onClick={verify}
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        {/* Timer Section */}
        <div className="mt-6 text-center">
          <p className="mb-2 text-sm opacity-85">
            Expires in: <b>{formatTime(countdown)}</b>
          </p>

          <button
            className={`px-4 py-2 rounded-lg transition font-semibold 
                       ${canResend 
                          ? "bg-blue-600 hover:bg-blue-500" 
                          : "bg-gray-600 cursor-not-allowed opacity-50"
                        }`}
            onClick={resend}
            disabled={!canResend}
          >
            {canResend ? "Resend OTP" : "Wait..."}
          </button>
        </div>

      </div>
    </div>
  );
}
