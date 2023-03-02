import React from "react";
import "./categories.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";

const Categories = () => {
  return (
    <div className="categories-alignments">
      <div className="left">
        <Sidebar />
      </div>
      <div className="right">
        <div className="top-cat">
          <Navbar type="categories" />
        </div>
        <div className="bottom-cat">
          <h1>Categories content</h1>
        </div>
      </div>
    </div>
  );
};

export default Categories;
