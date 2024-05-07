import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [role, setRole] = useState("");
  const [token, setToken] = useState("");

  setInterval(() => {
    if (localStorage.getItem("role") !== role) {
      setRole(localStorage.getItem("role") || "");
    }
    if (localStorage.getItem("token") !== token) {
      setToken(localStorage.getItem("token") || "");
    }
  }, 1000);

  return (
    <AppBar position="static" sx={{ backgroundColor: "#aaaaaa" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6">
          <Link
            to="/"
            sx={{ color: "white", marginRight: "10px", textDecoration: "none" }}
          >
            Home
          </Link>
        </Typography>
        {!token && (
          <Typography variant="h6">
            <Link
              to="/login"
              sx={{ color: "white", margin: "0 10px", textDecoration: "none" }}
            >
              Login
            </Link>
          </Typography>
        )}
        {token && (
          <Typography variant="h6">
            <Link
              onClick={() => {
                localStorage.clear();
                setRole("");
                setToken("");
              }}
              sx={{ color: "white", margin: "0 10px", textDecoration: "none" }}
            >
              Logout
            </Link>
          </Typography>
        )}
        <Typography variant="h6">
          <Link
            to="/reccomended"
            sx={{ color: "white", margin: "0 10px", textDecoration: "none" }}
          >
            Recommended
          </Link>
        </Typography>
        {role === "ROLE_ADMIN" && (
          <Typography variant="h6">
            <Link
              to="/create"
              sx={{ color: "white", margin: "0 10px", textDecoration: "none" }}
            >
              Create
            </Link>
          </Typography>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
