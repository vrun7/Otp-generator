// src/pages/Dashboard.jsx
import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const { API } = useContext(AuthContext);

  const [secret, setSecret] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await API.get("/protected");
        setSecret(res.data.message);
      } catch (err) {
        setSecret("⚠️ Failed to load protected data",err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [API]);

  return (
    <div className="flex bg-gray-100 min-h-screen">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1">
        <Navbar />

        <div className="p-6">

          <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-gray-500">Protected Message</h3>
              <p className="text-xl font-semibold mt-2">
                {loading ? "Loading..." : secret}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-gray-500">Your Role</h3>
              <p className="text-xl font-semibold mt-2">User</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-gray-500">Account Status</h3>
              <p className="text-xl font-semibold mt-2 text-green-600">Verified</p>
            </div>

          </div>

          {/* Section */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-3">Your Secure Data</h2>
            <p className="text-gray-700">
              This is a protected route fetched using your JWT token.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
