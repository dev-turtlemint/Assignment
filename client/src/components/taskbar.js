import React from "react";
import { NavLink } from "react-router-dom";
import "../App.css";

function Taskbar() {
  return (
    <div className="header">
      <NavLink className="link" to="/">
        Home
      </NavLink>
      {/* <NavLink className="link" to="/booking">
        Book
      </NavLink> */}
      <NavLink className="link" to="/register">
        Register
      </NavLink>
      <NavLink className="link" to="/login">
        Login
      </NavLink>
      <NavLink className="link" to="/profile">
        Profile
      </NavLink>
    </div>
  );
}

export default Taskbar;
