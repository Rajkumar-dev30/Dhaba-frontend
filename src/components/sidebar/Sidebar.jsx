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
            <h3>Dashboard</h3>
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
            <h3>Categories</h3>
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
            <h3>Products</h3>
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
            <h3>Users</h3>
          </NavLink>
        </div>
        <div className="last">
          <button style={{cursor:"pointer"}} onClick={logout}>Logout</button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
