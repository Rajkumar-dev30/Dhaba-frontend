import axios from "axios";
import { React, useState, useEffect } from "react";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";

const DashboardData = () => {
  const [userData, setUserData] = useState("");
  const [categoryData, setCategoryData] = useState("");
  const [productData, setProductData] = useState("");
  const [userLength, setUserLength] = useState("");
  const [categoryLength, setCategoryLength] = useState("");
  const [productLength, setProductLength] = useState("");

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
        const nestedArray = fullData[0];
        const length = nestedArray.length;
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
      logo: <PermIdentityIcon />,
      color: "red",
    },
    {
      head: "Total Categories",
      length: categoryLength,
      logo: <CategoryOutlinedIcon />,
      color: "green",
    },
    {
      head: "Total Products",
      length: productLength,
      logo: <AppsOutlinedIcon />,
      color: "yellow",
    },
  ];

  const boxStyle = () => {
    return {
      display: "flex",
    };
  };

  return (
    <div>
      {/*
        {userData &&
        userData.map((usersArray, index) => (
          <div key={index}>
            {usersArray.map((user) => (
              <div key={user._id}>
              <div>
                <p>Name: {user.fullname}</p>
                <p>Mobile: {user.mobile}</p>
                <p>Status: {user.status}</p>
              </div>
              </div>
            ))}
          </div>
        ))}
            */}

      {data.map((item) => {
        const { head, length, logo, color } = item;
        return (
          <div
            className="boxes"
            style={{
              // display: "flex",
              // justifyContent:"flex-start",
              // alignItems:"center",
              // flexDirection: "column",
              backgroundColor: color,
              width: "200px",
              height: "80px",
              borderRadius: "10px",
            }}
          >
            <div className="box-top">
              <h2>{head}</h2>
            </div>
            <div className="box-bottom" style={{
              
              display: "flex",
              justifyContent:"space-evenly",
              alignItems:"center",
            }}>
              <div className="box-bottom-left">{length}</div>
              <div className="box-bottom-right">{logo}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardData;
