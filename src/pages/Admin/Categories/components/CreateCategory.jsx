import React, { useState, useEffect } from "react";
import axios from "axios";
import "./createcategory.scss";
import { Modal } from "@mui/material";
import CategoryEdit from "../../../../components/categoryPopup/CategoryEdit";
import CategoryAdd from "../../../../components/categoryPopup/CategoryAdd";

const CategoriesList = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [categoryLength, setCategoryLength] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
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
      setCategoryLength(fullData.length);
    } catch (error) {
      console.log(error);
    }
  };

 const handleModel2 = () => {
    setOpenModal2(true)
  }

  const handleEdit = (_id) => {
    setEditCategoryId(_id);
    console.log(editCategoryId);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

const handleCloseModal2 = () => {
  setOpenModal2(false);

}

  const handleDelete = async (id) => {
    await axios.delete(
      `${process.env.REACT_APP_API_URL}/category/delete-category/${id}`,
      config
    );
    getCategories();
  };

  const toggleStatus = async (id) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/category/single-category/toggleStatus/${id}`,
        null,
        config
      );
      const updatedCategory = response.data.response[0];
      setCategoryData((prevState) => {
        const updatedData = prevState.map((category) => {
          if (category.id === updatedCategory.id) {
            return updatedCategory;
          }
          return category;
        });
        return updatedData;
      });
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("Unable to toggle status. Please try again later.");
      }
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
    <button className="Add-button" onClick={handleModel2}>Add
    </button>
    <h3 style={{padding:"15px 0 0 15px"}}>Total Categories: {categoryLength}</h3>
      <table className="category-table">
        <thead>
          <tr className="category-tableRow">
            <th className="category-tableHead">Image</th>
            <th className="category-tableHead">Name</th>
            <th className="category-tableHead">Status</th>
            <th className="category-tableHead">Edit</th>
            <th className="category-tableHead">Delete</th>
          </tr>
        </thead>
        <tbody>
          {categoryData.map((category, index) => (
            <tr key={index} className="category-tableRow">
              <td className="category-tableData">
                <img
                  src={category.categoryImage}
                  alt={category.categoryName}
                  width="80"
                  height="80"
                />
              </td>
              <td className="category-tableData">{category.categoryName}</td>
              <td className="category-tableData">
                <button
                  onClick={() => toggleStatus(category.id)}
                  className={
                    category.status === "active"
                      ? "active-button"
                      : "inactive-button"
                  }
                >
                  {category.status === "active" ? "Active" : "InActive"}
                </button>
              </td>
              <td className="category-tableData">
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(category.id)}
                >
                  Edit
                </button>
              </td>
              <td className="category-tableData">
                <button
                  className="del-btn"
                  onClick={() => handleDelete(category.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal open={openModal} onClose={handleCloseModal}>
        <div>
          <CategoryEdit
            openModal={openModal}
            handleCloseModal={handleCloseModal}
            getCategories={getCategories}
            categoryId={editCategoryId}
          />
        </div>
      </Modal>
      <Modal open={openModal2} onClose={handleCloseModal2}>
        <div>
          <CategoryAdd
            openModal2={openModal2}
            handleCloseModal2={handleCloseModal2}
            getCategories={getCategories}
          />
        </div>
      </Modal>
    </div>
  );
};

export default CategoriesList;
