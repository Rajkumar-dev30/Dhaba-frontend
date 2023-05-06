import React, { useState, useEffect } from "react";
import axios from "axios";
import "./notificationForm.scss";

const NotificationForm = () => {
  const [userData, setUserData] = useState([]);
  const [userLength, setUserLength] = useState(0);
  const [deliveryData, setDeliveryData] = useState([]);
  const [deliveryLength, setDeliveryLength] = useState(0);

  const userToken = JSON.parse(localStorage.getItem("user"));
  const { token } = userToken;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };

  const getUsers = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/admin/allusers`,
        config
      );
      const offData = response.data;
      const fullData = offData.response.users;
      setUserData(fullData);

      if (fullData.length > 0) {
        setUserLength(fullData.length);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getDeliveryBoys = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/admin/allDeliveryBoys`,
        config
      );
      const offData = response.data;
      const fullData = offData.response;
      setDeliveryData(fullData);
      console.log(deliveryData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
    getDeliveryBoys();
  });

  const handleUserSelection = (event) => {
    const selectedValue = event.target.value;

    if (selectedValue === "all") {
      // Logic for selecting all users
      console.log("All Users selected", userData);
    } else {
      // Logic for selecting a specific user
      const selectedUser = userData.find((user) => user.id === selectedValue);
      console.log("Selected User:", selectedUser);
    }
  };

  const handleDeliverySelection = (event) => {
  const selectedValue = event.target.value;
  
  if (selectedValue === "all") {
    // Logic for selecting all users
    console.log("All Users selected");
    console.log("Selected Users:", deliveryData[0]);
  } else {
    // Logic for selecting a specific user
    const selectedUser = deliveryData[0].find((item) => item._id === selectedValue);
    console.log("Selected User:", selectedUser);
  }
};


  return (
    <div className="notifications-box">
      <div className="user-notification-box">
        <h3>User Notification's</h3>
        <div className="user-notification-form">
          <div className="left-msg">
            <p>Select user</p>
            <p>Title</p>
            <p>Message</p>
          </div>
          <div className="middle-msg">
            <p>:</p>
            <p>:</p>
            <p>:</p>
          </div>
          <div className="right-msg">
            <select onChange={(e) => handleUserSelection(e)}>
              <option value="all">All Users</option>
              {userData.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.fullname}
                </option>
              ))}
            </select>
            <input type="text" placeholder="Title" />
            <textarea placeholder="Message" />
          </div>
        </div>
        <button>Submit</button>
      </div>
      <div className="delivery-notification-box">
        <h3>Delivery Boy Notification's</h3>
        <div className="delivery-notification-form">
          <div className="left-msg">
            <p>Select user</p>
            <p>Title</p>
            <p>Message</p>
          </div>
          <div className="middle-msg">
            <p>:</p>
            <p>:</p>
            <p>:</p>
          </div>
          <div className="right-msg">
            <select onChange={(e) => handleDeliverySelection(e)}>
              <option value="all">All Users</option>
              {deliveryData && deliveryData[0] && deliveryData[0].map((item) => (
                <option key={item._id} value={item._id}>
                  {item.fullname}
                </option>
              ))}
            </select>

            <input type="text" placeholder="Title" />
            <textarea placeholder="Message" />
          </div>
        </div>
        <button>Submit</button>
      </div>
    </div>
  );
};

export default NotificationForm;
