// src/pages/Login.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { API } = useContext(AuthContext);
  const navigate = useNavigate();

  const sendOtp = async () => {
    if (!email) return alert("Enter email");
    setLoading(true);
    try {
      await API.post("/send-otp", { email });
      alert("OTP sent to your email");
      navigate("/verify", { state: { email } });
    } catch (err) {
      const msg = err?.response?.data?.message || err.message;
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      
      {/* Card */}
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md text-white border border-white/20">

        <h2 className="text-3xl font-bold mb-6 text-center">
          Login / Register
        </h2>

        <p className="text-sm opacity-80 mb-6 text-center">
          Enter your email to receive OTP
        </p>

        {/* Input */}
        <input
          className="w-full p-3 rounded-lg bg-white/20 placeholder-gray-300
                     outline-none focus:ring-2 focus:ring-blue-400 mb-4"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Button */}
        <button
          className={`w-full py-3 rounded-lg font-semibold 
                     bg-blue-600 hover:bg-blue-500 transition-all 
                     ${loading && "opacity-50 cursor-not-allowed"}`}
          onClick={sendOtp}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send OTP"}
        </button>

      </div>
    </div>
  );
}
