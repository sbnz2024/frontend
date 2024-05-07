import React, { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";
import { api } from "../api";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await api.post("/user/login", {
      email,
      password,
    });
    console.log(response.data);
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("role", response.data.role);
    localStorage.setItem("userId", response.data.userId);
    api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${response.data.token}`;
    navigate("/");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "lightgray",
          padding: "20px",
          borderRadius: "10px",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          fullWidth
          margin="normal"
        />
        <Grid container justifyContent="space-between">
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/register")}
          >
            Register
          </Button>
        </Grid>
      </form>
    </div>
  );
};

export default Login;
