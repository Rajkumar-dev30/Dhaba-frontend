import React from "react";
import { Link } from "react-router-dom";
import "./navbar.scss"

const Navbar = ({ type }) => {
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

  return (
    <>
    <div className="navbar">
        <div className="left-nav">
            <h2>{head.name}</h2>
        </div>
        <div className="right-nav">
          <Link to="/">
          <img src={require("../../assets/shutdown.png")} alt="" />
          </Link>
        </div>
    </div>
    </>
    );
};

export default Navbar;
