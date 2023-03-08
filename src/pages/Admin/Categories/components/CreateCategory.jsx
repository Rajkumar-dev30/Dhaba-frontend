import React, { useState, useEffect } from "react";
import axios from "axios";
import "./createcategory.scss";
import { Modal } from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import CategoryEdit from "../../../../components/categoryPopup/CategoryEdit";
const CategoriesList = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [categoryLength, setCategoryLength] = useState(0);
  const [categoryName, setCategoryName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState(null);

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
        `${process.env.REACT_APP_API_URL}/category/get-category`
      );
      const offData = response.data;
      const fullData = offData.response;
      setCategoryData(fullData);
      console.log(fullData);
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
        "${process.env.REACT_APP_API_URL}/category/create-category",
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

  const handleEdit = (id) => {
    setEditCategoryId(id);
    setOpenModal(true);
  };
  
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleDelete = async (id) => {
    await axios.delete(
      `${process.env.REACT_APP_API_URL}/category/delete-category/${id}`,
      config
    );
    getCategories();
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
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {categoryData.map((cate) => {
            return (
              <>
                <tr key={cate.id}>
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
                  <td>
                    <BorderColorIcon
                      sx={{
                        width: 15,
                        height: 15,
                        color: "blue",
                        cursor: "pointer",
                      }}
                      onClick={() => handleEdit(cate.id)}
                    />
                  </td>
                  <td>
                    <DeleteIcon
                      sx={{
                        width: 20,
                        height: 20,
                        color: "red",
                        cursor: "pointer",
                      }}
                      onClick={() => handleDelete(cate.id)}
                    />
                  </td>
                  {openModal && editCategoryId === cate.id && (
                <Modal onClose={handleCloseModal}>
                  <CategoryEdit />
                </Modal>
              )}
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesList;
