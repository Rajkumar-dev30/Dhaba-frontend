import React, { useState, useEffect } from "react";
import axios from "axios";

const CategoryEdit = ({ openModal, handleCloseModal, getCategories, categoryId }) => {
  const [categoryName, setCategoryName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null)
  const userToken = JSON.parse(localStorage.getItem("user"));
  const { token } = userToken;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };

  const getCategory = async (id) => {
    setEditId(id)
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/category/single-category/${id}`,
        config
      );
      const categoryData = response.data.response;
      setCategoryName(categoryData.categoryName);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (categoryId) {
      getCategory(categoryId);
    }
  }, [categoryId]);

  const handleCategoryNameChange = (event) => {
    setCategoryName(event.target.value);
  };

  const handleAvatarChange = (event) => {
    setAvatar(event.target.files[0]);
  };

  const handleEditCategory = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formDataToUpdate = {};

    if (categoryName !== "") {
      formDataToUpdate.categoryName = categoryName;
    }

    if (avatar !== null) {
      formDataToUpdate.avatar = avatar;
    }

    try {
      await axios.patch(
        `${process.env.REACT_APP_API_URL}/category/update-category/${editId}`,
        formDataToUpdate,
        config
      );
      handleCloseModal();
      console.log(formDataToUpdate)
      getCategories();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleEditCategory}>
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
            onChange={handleAvatarChange}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default CategoryEdit;
