import React from "react";
import "./sidebar.scss";
import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
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
            to="/dashboard"
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
            to="/categories"
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
            to="/products"
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
            to="/users"
          >
            Users
          </NavLink>
        </div>
        <div className="last">
          <Link to="/">Logout</Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
