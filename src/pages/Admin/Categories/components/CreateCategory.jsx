import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateCategory = () => {
  const [categoryData, setCategoryData] = useState();
  const [categoryLength, setCategoryLength] = useState();
  const userToken = JSON.parse(localStorage.getItem("user"));
  const { token } = userToken;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };

  const getCategories = async () => {
    try {
      const response = await axios.get(
        "https://kingsdhabaserver.onrender.com/category/get-category"
      );
      const offData = response.data;
      const fullData = offData.response;
      setCategoryData(fullData);
      if (fullData.length > 0) {
        const length = fullData.length;
        setCategoryLength(length);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
      <h3>Total Categories: {categoryLength}</h3>
      {categoryData &&
        categoryData.map((cate) => (
          <div key={cate._id}>
            <img
              src={`${cate.categoryImage}`}
              alt="category"
              width="50"
              height="50"
            />
            <p>Name: {cate.categoryName}</p>
            <p>Status: {cate.status}</p>
          </div>
        ))}
    </div>
  );
};

export default CreateCategory;
