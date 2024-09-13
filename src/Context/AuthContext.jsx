import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const login = async (username, password) => {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: new Headers({ "content-type": "application/json" }),
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    setToken({ token: data.token, username: data.username });
    localStorage.setItem("token", data.token);
    localStorage.setItem("username", data.username);
    console.log(data.username);
  };
  const register = async (username, password) => {
    await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: new Headers({ "content-type": "application/json" }),
      body: JSON.stringify({ username: username, password: password }),
    });
  };
  return (
    <AuthContext.Provider value={{ token, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
