import React from "react";
import "./sidebar.scss";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <>
      <div className="sidebar">
        <div className="top">
          <img src={require("../../assets/kingDhaba-sample.png")} alt="" />
          <h2>Admin</h2>
        </div>
        <div className="middle">
          <NavLink
            style={({ isActive }) => {
              return {
                color: isActive ? "blue" : "",
                fontWeight: isActive ? "bolder" : "500",
                font: isActive ? "18px" : "16px",
              };
            }}
            to="/admin/dashboard"
          >
            Dashboard
          </NavLink>

          <NavLink
            style={({ isActive }) => {
              return {
                color: isActive ? "blue" : "",
                fontWeight: isActive ? "bolder" : "500",
                font: isActive ? "18px" : "16px",
              };
            }}
            to="/admin/categories"
          >
            Categories
          </NavLink>
          <NavLink
            style={({ isActive }) => {
              return {
                color: isActive ? "blue" : "",
                fontWeight: isActive ? "bolder" : "500",
                font: isActive ? "18px" : "16px",
              };
            }}
            to="/admin/products"
          >
            Products
          </NavLink>
          <NavLink
            style={({ isActive }) => {
              return {
                color: isActive ? "blue" : "",
                fontWeight: isActive ? "bolder" : "500",
                font: isActive ? "18px" : "16px",
              };
            }}
            to="/admin/users"
          >
            Users
          </NavLink>
        </div>
        <div className="last">
          <button onClick={logout}>Logout</button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
