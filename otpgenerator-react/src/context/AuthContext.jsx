// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    return token ? { token } : null;
  });
  const navigate = useNavigate();

  useEffect(() => {
    // optional: verify token by calling protected endpoint on load
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, API }}>
      {children}
    </AuthContext.Provider>
  );
};
