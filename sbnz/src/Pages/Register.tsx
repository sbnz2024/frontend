import React, { useState } from "react";
import { TextField, Button, Container, Grid } from "@mui/material";
import { api } from "../api";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleRegister = async () => {
    const response = await api.post("/user/register", {
      username,
      email,
      password,
      firstname: firstName,
      lastname: lastName,
    });
    console.log(response.data);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Grid
        sx={{
          backgroundColor: "#f0f0f0",
          padding: "20px",
          borderRadius: "5px",
        }}
      >
        <form>
          <TextField
            id="username"
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ width: "100%", marginBottom: "10px" }}
          />
          <TextField
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ width: "100%", marginBottom: "10px" }}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ width: "100%", marginBottom: "10px" }}
          />
          <TextField
            id="firstName"
            label="First Name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            sx={{ width: "100%", marginBottom: "10px" }}
          />
          <TextField
            id="lastName"
            label="Last Name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            sx={{ width: "100%", marginBottom: "10px" }}
          />
          <Button variant="contained" onClick={handleRegister}>
            Register
          </Button>
        </form>
      </Grid>
    </Container>
  );
};
export default Register;
