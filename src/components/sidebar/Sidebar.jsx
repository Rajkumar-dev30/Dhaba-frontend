import React, { useContext } from "react";
import "./sidebar.scss";
import { NavLink } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import PersonIcon from "@mui/icons-material/Person";
import AppsIcon from "@mui/icons-material/Apps";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import InfoIcon from '@mui/icons-material/Info';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import { SideBarContext } from "../../Contex/SidebarContext";
const Sidebar = () => {
  const Styles = ({ isActive }) => {
    return {
      color: isActive ? "yellow" : "white",
      fontSize: isActive ? "14px" : "12px",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      gap: "15px",

      height: "40px",
      borderRadius: "5px",
    };
  };
  const { Close, handleSidebarView } = useContext(SideBarContext);
  return (
    <>
      <div
        className="sidebar"
        style={{ width: Close ? "15vw" : "5vw", transition: "all .6s " }}
      >
        <div className="top">
          <img src={require("../../assets/king dhaba admin logo.png")} alt="" /> 
          <h2 style={{ display: Close ? "block" : "none" }}>Admin</h2>
        </div>
        <div className="middle">
          <NavLink style={Styles} to="/admin/dashboard">
            <DashboardIcon className="icon" />
            <h3 style={{ display: Close ? "block" : "none" }}>Dashboard</h3>
          </NavLink>
          <NavLink style={Styles} to="/admin/categories">
            <CategoryIcon />
            <h3 style={{ display: Close ? "block" : "none" }}>Categories</h3>
          </NavLink>
          <NavLink style={Styles} to="/admin/products">
            <AppsIcon />
            <h3 style={{ display: Close ? "block" : "none" }}>Products</h3>
          </NavLink>
          <NavLink style={Styles} to="/admin/users">
            <PersonIcon />
            <h3 style={{ display: Close ? "block" : "none" }}>Users</h3>
          </NavLink>
          <NavLink style={Styles} to="/admin/deals">
            <LocalOfferIcon />
            <h3 style={{ display: Close ? "block" : "none" }}>Today Deals</h3>
          </NavLink>
          <NavLink style={Styles} to="/admin/deliveryboy">
            <DirectionsBikeIcon />
            <h3 style={{ display: Close ? "block" : "none" }}>Delivery Boy</h3>
          </NavLink>
          <NavLink style={Styles} to="/admin/orders">
            <FastfoodIcon />
            <h3 style={{ display: Close ? "block" : "none" }}>Orders</h3>
          </NavLink>
          <NavLink style={Styles} to="/admin/aboutus">
            <InfoIcon />
            <h3 style={{ display: Close ? "block" : "none" }}>About Us</h3>
          </NavLink>
          <NavLink style={Styles} to="/admin/privacypolicy">
            <PrivacyTipIcon />
            <h3 style={{ display: Close ? "block" : "none" }}>Privacy Policy</h3>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
