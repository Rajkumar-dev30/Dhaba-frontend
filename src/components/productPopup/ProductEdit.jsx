import React, {useState, useEffect} from 'react'
import axios from "axios"

const ProductEdit = ({openModal, handleCloseModal, getProducts, productId}) => {

  const [productData, setProductData] = useState([]);
  // const [productLength, setProductLength] = useState(0);
  const [productName, setProductName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [foodType, setFoodType] = useState("");
  const [loading, setLoading] = useState(false);
  const [productEditId, setProductEditId] = useState(null)
  // const [openModal, setOpenModal] = useState(false)

  const userToken = JSON.parse(localStorage.getItem("user"));
  const { token } = userToken;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };

  const getProduct = async (_id) => {
    setProductEditId(_id)
    try{
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/product/single-product/${_id}`,
        config
      )
      const productData = response.data.products;
      setProductData(productData)
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    if(productId) {
      getProduct(productId)
    }
  },[productId])

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

    const formDataToUpdate = {};

    if(productName !== ""){
      formDataToUpdate.productName = productName;
    }
    if(avatar !== null){
      formDataToUpdate.avatar = avatar;
    }
    if(description !== ""){
      formDataToUpdate.description = description;
    }
    if(price !== ""){
      formDataToUpdate.price = price;
    }
    if(foodType !== ""){
      formDataToUpdate.foodType = foodType;
    }
    if(categoryId !== ""){
      formDataToUpdate.categoryId = categoryId;
    }
    

    try {
      await axios.patch(
        `${process.env.REACT_APP_API_URL}/product/update-product/${productEditId}`,
        formDataToUpdate,
        config
      );
      handleCloseModal();
      getProducts();
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
      {loading ? "Loading..." : "Update Product"}
    </button>
  </form>
    </div>
  )
}

export default ProductEdit