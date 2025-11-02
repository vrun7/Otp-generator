// src/components/Navbar.jsx
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user } = useContext(AuthContext);

  return (
    <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h3 className="text-xl font-semibold">Welcome 👋</h3>

      <div className="flex items-center space-x-3">
        <div className="h-10 w-10 bg-blue-500 text-white flex justify-center items-center rounded-full">
          {user?.email?.charAt(0)?.toUpperCase()}
        </div>
        <p className="font-medium">{user?.email}</p>
      </div>
    </div>
  );
}
