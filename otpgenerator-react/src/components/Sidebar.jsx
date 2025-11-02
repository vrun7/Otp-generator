// src/components/Sidebar.jsx
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Sidebar() {
  const { logout } = useContext(AuthContext);

  return (
    <div className="w-64 bg-white shadow-xl h-screen p-6 hidden md:block">
      <h2 className="text-2xl font-bold mb-8">MERN OTP</h2>

      <ul className="space-y-4">
        <li className="text-lg font-medium cursor-pointer hover:text-blue-500 transition">
          Dashboard
        </li>
        <li className="text-lg font-medium cursor-pointer hover:text-blue-500 transition">
          Profile
        </li>
        <li className="text-lg font-medium cursor-pointer hover:text-blue-500 transition">
          Settings
        </li>
      </ul>

      <button
        onClick={logout}
        className="mt-10 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
      >
        Logout
      </button>
    </div>
  );
}
