import React from "react";
import "./sidebar.scss";
import { NavLink, useNavigate } from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import PersonIcon from '@mui/icons-material/Person';
import AppsIcon from '@mui/icons-material/Apps';
const Sidebar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const Styles = ({isActive}) => {
    return {
      color: isActive ? "#cb42f5" : "",
      fontWeight: isActive ? "bolder" : "500",
      fontSize: isActive ? "16px" : "14px",
      display:"flex",
      justifyContent:"flex-start",
      alignItems:"center",
      gap:"15px"
    };
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
            style={Styles}
            to="/admin/dashboard"
          >
            <DashboardIcon/>
            <h3>Dashboard</h3>
          </NavLink>

          <NavLink
            style={Styles}
            to="/admin/categories"
          >
            <CategoryIcon />
            <h3>Categories</h3>
          </NavLink>
          <NavLink
            style={Styles}
            to="/admin/products"
          >
          <AppsIcon/>         
            <h3>Products</h3>
          </NavLink>
          <NavLink
            style={Styles}
            to="/admin/users"
          >
          <PersonIcon/>
            <h3>Users</h3>
          </NavLink>
        </div>
        {/* <div className="last">
          <button style={{cursor:"pointer"}} onClick={logout}>Logout</button>
          </div> */}
      </div>
    </>
  );
};

export default Sidebar;
