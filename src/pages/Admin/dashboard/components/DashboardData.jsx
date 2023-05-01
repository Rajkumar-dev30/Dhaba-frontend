import axios from "axios";
import { React, useState, useEffect } from "react";
import { FaRegUser } from "react-icons/fa";
import { BiCategoryAlt } from "react-icons/bi";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { IoAppsOutline, IoFastFoodOutline } from "react-icons/io5";
import "../dashboard.scss";
// import OrderApi from '../../Orders/Components/OrderApi'
import { NavLink } from "react-router-dom";
const DashboardData = () => {
  const [userData, setUserData] = useState("");
  const [categoryData, setCategoryData] = useState("");
  const [productData, setProductData] = useState("");
  const [userLength, setUserLength] = useState("");
  const [categoryLength, setCategoryLength] = useState("");
  const [productLength, setProductLength] = useState("");
  // const [orderlength,setOrderlength]=useState(OrderApi.length)
  const userToken = JSON.parse(localStorage.getItem("user"));
  const { token } = userToken;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const getUsers = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/admin/allusers`,
        config
      );
      const offData = response.data;
      const fullData = offData.response;
      setUserData(fullData);
      if (fullData.length > 0) {
        const length = fullData.length;
        setUserLength(length);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getCategories = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/category/get-category`
      );
      const offData = response.data;
      const fullData = offData.response;
      setCategoryData(fullData);
      setCategoryLength(fullData.length);
    } catch (error) {
      console.log(error);
    }
  };

  const getProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/product/all-products`
      );
      const offData = response.data;
      const fullData = offData.products;
      setProductData(fullData);
      if (fullData.length > 0) {
        const length = fullData.length;
        setProductLength(length);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
    getCategories();
    getProducts();
  }, []);

  const data = [
    {
      head: "Total Users",
      length: userLength,
      logo: <FaRegUser size={70} opacity=".3" />,
      color: "#17A2B8",
      path: "/admin/users",
    },
    {
      head: "Total Categories",
      length: categoryLength,
      logo: <BiCategoryAlt size={70} opacity=".2" />,
      color: "#28A745	",
      path: "/admin/categories",
    },
    {
      head: "Total Products",
      length: productLength,
      logo: <IoAppsOutline size={70} opacity=".3" />,
      color: "#F1AE16",
      path: "/admin/products",
    },
    {
      head: "Total Orders",
      // length: orderlength,
      logo: <IoFastFoodOutline size={70} opacity=".3" />,
      color: "#DC3545",
      path:"/admin/orders"
    },

  ];
  const [shake, setshake] = useState(true);
  return (
    <div className="Dashboard">
      {data.map((item) => {
        const { head, length, logo, color, path } = item;
        return (
          <div>
            <div
              className="boxes"
              style={{
                backgroundColor: color,
                width: "250px",
                height: "152px",
                borderRadius: "5px",
              }}
            >
              <div className="Boxes">
                <div className="box-top">
                  <div className="box-bottom-left">{length}</div>
                  <p className="head">{head}</p>
                </div>
                <div className="box-logo">
                  <span>{logo}</span>
                </div>
              </div>
              <div className="more-info">
                <div className="MOREINFO">
                  <NavLink to={path} className="moreinfo">
                    More Info
                    <span style={{ color: "white" }}>
                      <BsArrowRightCircleFill />
                    </span>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardData;
