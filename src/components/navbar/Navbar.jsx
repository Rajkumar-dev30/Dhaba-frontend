import React from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.scss"

const Navbar = ({ type }) => {

  const navigate = useNavigate();
  
    let head;
  switch (type) {
    case "dashboard":
      head = {
        name: "Dashboard",
      };
      break;
    case "categories":
      head = {
        name: "Categories",
      };
      break;
    case "products":
      head = {
        name: "Products",
      };
      break;
    case "users":
      head = {
        name: "Users",
      };
      break;
        default:
      break;
  }

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
    <div className="navbar">
        <div className="left-nav">
            <h2>{head.name}</h2>
        </div>
        <div className="right-nav">
          <button onClick={logout}>
          <img src={require("../../assets/shutdown.png")} alt="" />
          </button>
        </div>
    </div>
    </>
    );
};

export default Navbar;
