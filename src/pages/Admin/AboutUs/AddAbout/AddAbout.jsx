import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Aboutus.scss";
const AddAbout = () => {
  const [aboutUs, setaboutUsData] = useState();
  const [aboutdata, setaboutData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editid, setEditId] = useState(null);
  const userToken = JSON.parse(localStorage.getItem("user"));
  const { token } = userToken;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const url = "https://kingsdhaba.onrender.com/about-us/add";
    try {
      const response = await axios.post(url, { aboutUsData: aboutUs }, config);

      setaboutUsData("");
      getusers();
      console.log(response);
    } catch (err) {
      console.log(err, "Hi");
    } finally {
      setLoading(false);
    }
  };
  console.log(aboutUs);

  //get the data

  const getusers = async (_id) => {
    setEditId(_id);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/about-us/get-aboutUs`,
        config
      );
      const offData = response.data;
      const fullData = offData.response;

      setaboutData(fullData);
    } catch (error) {
      console.log(error);
    }
  };

  const Deleteuser = async (_id) => {
    await axios.delete(
      `${process.env.REACT_APP_API_URL}/about-us/delete/${_id}`,
      config
    );
    getusers();
  };

  useEffect(() => {
    getusers();
  }, []);
  return (
    <>
      <div className="about">
        <div className="form">
          <form action="" onSubmit={handleSubmit}>
            <div className="label"></div>
            <textarea
              type="text"
              name="aboutus"
              value={aboutUs}
              onChange={(e) => setaboutUsData(e.target.value)}
            />
            <br />
            <button className="add">{loading ? "Loading..." : "Add"}</button>
          </form>
        </div>

        <div class="vl"></div>

        <div className="about-us">
          {aboutdata.map((item, i) => (
            <div key={i}>
              <p>{item.aboutUsData}</p>
              <button className="delete" onClick={() => Deleteuser(item._id)}>
                Delete
              </button>
              
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AddAbout;
