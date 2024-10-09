import React, { createContext, useState, useContext } from "react";
const backend_url = import.meta.env.VITE_backend_url;
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const login = async (username, password) => {
    const response = await fetch(`${backend_url}/api/auth/login`, {
      method: "POST",
      headers: new Headers({ "content-type": "application/json" }),
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    setToken({ token: data.token, username: data.username, photo: data.photo });
    localStorage.setItem("token", data.token);
    localStorage.setItem("username", data.username);
    localStorage.setItem("avatar", data.photo);
    if (data.username) return true;
    else return false;
  };
  const register = async (username, password, avatar) => {
    let avatarBase64 = "";
    if (avatar) {
      const reader = new FileReader();
      reader.readAsDataURL(avatar);
      await new Promise((resolve) => {
        reader.onload = () => {
          avatarBase64 = reader.result; // Set the base64 image string
          resolve();
        };
      });
    }
    const res = await fetch(`${backend_url}/api/auth/register`, {
      method: "POST",
      headers: new Headers({ "content-type": "application/json" }),
      body: JSON.stringify({
        username: username,
        password: password,
        avatar: avatarBase64,
      }),
    });
    console.log(res);
    if (res.status == 201) return true;
    else return false;
  };
  return (
    <AuthContext.Provider value={{ token, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
