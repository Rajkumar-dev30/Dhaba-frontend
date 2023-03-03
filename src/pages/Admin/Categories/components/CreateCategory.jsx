import React, { useState, useEffect } from "react";
import axios from "axios";
import "./createcategory.scss";

const CategoriesList = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [categoryLength, setCategoryLength] = useState(0);
  const [categoryName, setCategoryName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const handleCategoryNameChange = (event) => {
    setCategoryName(event.target.value);
  };

  const handleavatarChange = (event) => {
    setAvatar(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("categoryName", categoryName);
    formData.append("avatar", avatar);

    try {
      const response = await axios.post(
        "https://kingsdhabaserver.onrender.com/category/create-category",
        formData,
        config
      );
      console.log(response.data);
      setCategoryName("");
      setAvatar(null);
      document.getElementById("category-image").value = "";
      getCategories(); // call getCategories() after successful creation of new category
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
  <form onSubmit={handleSubmit}>
    <div>
      <label htmlFor="category-name">Category Name:</label>
      <input
        type="text"
        id="category-name"
        value={categoryName}
        onChange={handleCategoryNameChange}
      />
    </div>
    <div>
      <label htmlFor="category-image">Category Image:</label>
      <input
        type="file"
        id="category-image"
        onChange={handleavatarChange}
      />
    </div>
    <button type="submit" disabled={loading}>
      {loading ? "Loading..." : "Create Category"}
    </button>
  </form>
  <h3>Total Categories: {categoryLength}</h3>
  <table>
    <thead>
      <tr>
        <th>Image</th>
        <th>Name</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {categoryData.map((cate) => (
        <tr key={cate._id}>
          <td>
            <img
              src={`${cate.categoryImage}`}
              alt="category"
              width="50"
              height="50"
            />
          </td>
          <td>{cate.categoryName}</td>
          <td>{cate.status}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  );
};

export default CategoriesList;
