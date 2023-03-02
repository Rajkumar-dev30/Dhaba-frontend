import axios from "axios";
import { React, useState, useEffect } from "react";

const DashboardData = () => {
  const [userData, setUserData] = useState("");

  const[userLength, setUserLength] = useState("")

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
        "https://kingsdhabaserver.onrender.com/admin/allusers",
        config
      );
      const offData = response.data;
      const fullData = offData.response;
      setUserData(fullData);
      if (fullData.length > 0) {
        const nestedArray = fullData[0];
        const length = nestedArray.length;
      setUserLength(length)
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <h3>TotalUsers:{userLength}</h3>
      {userData &&
        userData.map((usersArray, index) => (
          <div key={index}>
            {/* <p>Length: {usersArray.length}</p> */}

            {usersArray.map((user) => (
              <div key={user._id}>
                <p>Name: {user.fullname}</p>
                <p>Mobile: {user.mobile}</p>
                <p>Status: {user.status}</p>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};

export default DashboardData;
