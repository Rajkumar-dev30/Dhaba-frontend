import React, { useState, useEffect } from "react";
import axios from "axios";
import "./productdata.scss";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
const ProductList = () => {
  const [productData, setProductData] = useState([]);
  const [productLength, setProductLength] = useState(0);
  const [productName, setProductName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [foodType, setFoodType] = useState("");
  const [loading, setLoading] = useState(false);

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
      //   console.log(fullData)
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

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handleAvatarChange = (event) => {
    setAvatar(event.target.files[0]);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handlecategoryIdChange = (event) => {
    setCategoryId(event.target.value);
  };

  const handleFoodTypeChange = (event) => {
    setFoodType(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("avatar", avatar);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("categoryId", categoryId);
    formData.append("foodType", foodType);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/product/create-product`,
        formData,
        config
      );
      console.log(response.data);
      setProductName("");
      setAvatar(null);
      setDescription("");
      setPrice("");
      setCategoryId("");
      setFoodType("");
      document.getElementById("product-image").value = "";
      getProducts();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = ()=>{
    
  }


  return (
    <div>
  <form onSubmit={handleSubmit}>
    <div>
      <label htmlFor="product-name">Product Name:</label>
      <input
        type="text"
        id="product-name"
        value={productName}
        onChange={handleProductNameChange}
      />
    </div>
    <div>
      <label htmlFor="product-image">Product Image:</label>
      <input type="file" id="product-image" onChange={handleAvatarChange} />
    </div>
    <div>
      <label htmlFor="product-description">Description:</label>
      <input
        type="text"
        id="product-description"
        value={description}
        onChange={handleDescriptionChange}
      />
    </div>
    <div>
      <label htmlFor="product-price">Price:</label>
      <input
        type="number"
        id="product-price"
        value={price}
        onChange={handlePriceChange}
      />
    </div>
    <div>
      <label htmlFor="product-categoryId">categoryId:</label>
      <input
        type="text"
        id="product-categoryId"
        value={categoryId}
        onChange={handlecategoryIdChange}
      />
    </div>
    <div>
      <label htmlFor="product-food-type">Food Type:</label>
      <input
        type="text"
        id="product-food-type"
        value={foodType}
        onChange={handleFoodTypeChange}
      />
    </div>
    <button type="submit" disabled={loading}>
      {loading ? "Loading..." : "Create Product"}
    </button>
  </form>
  <h3>Total Products: {productLength}</h3>
  <table>
    <thead>
      <tr>
        <th>Image</th>
        <th>Name</th>
        <th>Description</th>
        <th>Price</th>
        <th>CategoryID</th>
        <th>Food Type</th>
        <th>Status</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {productData.map((product) => (
        <tr key={product._id}>
          <td>
            <img
              src={`${product.productImage}`}
              alt="product"
              width="50"
              height="50"
            />
          </td>
          <td>{product.productName}</td>
          <td>{product.description}</td>
          <td>{product.price}</td>
          <td>{product.categoryId}</td>
          <td>{product.foodType}</td>
          <td>{product.status}</td>
          <td>
            <BorderColorIcon sx={{width:15,height:15,color:"blue",cursor:"pointer"}}/>
          </td>
          <td>
            <DeleteIcon sx={{width:20,height:20,color:"red",cursor:"pointer"}}
              onClick={handleDelete}
            />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  );
};

export default ProductList;
