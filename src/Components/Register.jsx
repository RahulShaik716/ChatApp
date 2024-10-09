import React, { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "./Button";
import Header from "./Header";
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2vh;
  width: 20vw;
  z-index: 2;
  padding: 2vw;
  border-radius: 20px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  @media (max-width: 768px) {
    width: 90vw;
    padding: 40px 5px;
  }
`;
const Input = styled.input`
  border-radius: 20px;
  padding: 2vh;
  border: none;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;
const Error = styled.div`
  color: red;
  text-align: center;
  font-weight: bold;
`;
function Register() {
  const { register } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register(username, password, avatar);
      if (res) navigate("/login");
      else setError("Failed to register");
    } catch (err) {
      setError("Failed to register");
    }
  };
  function handleFileChange(e) {
    setAvatar(e.target.files[0]);
  }
  return (
    <>
      <Header />
      <div
        style={{
          display: "flex",
          height: "90vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Form onSubmit={handleSubmit}>
          {error && <Error>{error}</Error>}
          <label> Username : </label>
          <Input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label> Password : </label>
          <Input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label> Upload Avatar </label>
          <Input type="file" name="avatar" onChange={handleFileChange} />
          <Button type="submit">Register</Button>
          <p style={{ textAlign: "right" }}>
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              style={{
                background: "#2E8B57",
                cursor: "pointer",
                color: "white",
                borderRadius: "8px",
                padding: "5px",
              }}
            >
              Login
            </span>
          </p>
        </Form>
      </div>
    </>
  );
}
export default Register;
