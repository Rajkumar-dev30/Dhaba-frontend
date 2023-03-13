import React, { useState, useEffect } from "react";
import axios from "axios";
import "./productdata.scss";
import { Modal } from "@mui/material";
import ProductEdit from "../../../../components/productPopup/ProductEdit";
import ProductAdd from "../../../../components/productPopup/ProductAdd";
const ProductList = () => {
  const [productData, setProductData] = useState([]);
  const [productLength, setProductLength] = useState(0);
  const [productId, setProductId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);

  const userToken = JSON.parse(localStorage.getItem("user"));
  const { token } = userToken;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
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
    getProducts();
  }, []);

  const handleEdit = (_id) => {
    setProductId(_id);
    console.log(productId);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleDelete = async (_id) => {
    await axios.delete(
      `${process.env.REACT_APP_API_URL}/product/delete-product/${_id}`,
      config
    );
    getProducts();
  };

  const handleModel2 = () => {
    setOpenModal2(true)
  }

  const handleCloseModal2 = () => {
    setOpenModal2(false);
  
  }

  const toggleStatus = async (_id) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/product/single-product/toggleStatus/${_id}`,
        null,
        config
      );
      const updatedProduct = response.data.response[0];
      setProductData((prevState) => {
        const updatedData = prevState.map((product) => {
          if (product.id === updatedProduct.id) {
            return updatedProduct;
          }
          return product;
        });
        return updatedData;
      });
      getProducts();

    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("Unable to toggle status. Please try again later.");
      }
    }
  };

   useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
  <button className="Add-button" onClick={handleModel2}>Add
  </button>
      <h3 style={{padding:"15px 0 0 15px"}}>Total Products: {productLength}</h3>
      <table className="product-table">
        <thead>
          <tr className="product-tableRow">
            <th className="product-tableHead">Image</th>
            <th className="product-tableHead">Name</th>
            <th className="product-tableHead">Description</th>
            <th className="product-tableHead">Price</th>
            <th className="product-tableHead">CategoryID</th>
            <th className="product-tableHead">Food Type</th>
            <th className="product-tableHead">Status</th>
            <th className="product-tableHead">Edit</th>
            <th className="product-tableHead">Delete</th>
          </tr>
        </thead>
        <tbody>
          {productData.map((product) => (
            <tr key={product._id} className="product-tableRow">
              <td className="product-tableData">
                <img
                  src={`${product.productImage}`}
                  alt="product"
                  width="50"
                  height="50"
                />
              </td>
              <td className="product-tableData">{product.productName}</td>
              <td className="product-tableData">{product.description}</td>
              <td className="product-tableData">{product.price}</td>
              <td className="product-tableData">{product.categoryId}</td>
              <td className="product-tableData">{product.foodType}</td>
              <td className="product-tableData">
              <button onClick={() => toggleStatus(product._id)} className={product.status === "active" ? "Pactive-button" : "Pinactive-button"}>
              {product.status === "active" ? "Active" : "InActive"}
              </button>
              </td>
              <td className="product-tableData">
                {/* <BorderColorIcon sx={{width:15,height:15,color:"blue",cursor:"pointer"}}
            onClick = {()=> handleEdit(product._id)}
      /> */}
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(product._id)}
                >
                  Edit
                </button>
              </td>
              <td className="product-tableData">
                {/* <DeleteIcon sx={{width:20,height:20,color:"red",cursor:"pointer"}}
              onClick={()=> handleDelete(product._id)}
    /> */}
                <button
                  className="del-btn"
                  onClick={() => handleDelete(product._id)}
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
          <ProductEdit
            openModal={openModal}
            handleCloseModal={handleCloseModal}
            getProducts={getProducts}
            productId={productId}
          />
        </div>
      </Modal>
      <Modal open={openModal2} onClose={handleCloseModal2}>
        <div>
          <ProductAdd
            openModal2={openModal2}
            handleCloseModal2={handleCloseModal2}
            getProducts={getProducts}
          />
        </div>
      </Modal>
    </div>
  );
};

export default ProductList;
