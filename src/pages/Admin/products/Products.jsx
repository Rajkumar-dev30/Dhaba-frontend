import React from 'react'
import "./products.scss"
import Sidebar from '../../../components/sidebar/Sidebar'
import Navbar from '../../../components/navbar/Navbar'
import ProductList from './components/ProductData'

const Products = () => {
  return (
<div className="product-alignments"> 
    <div className="left">
      <Sidebar/>
    </div>
    <div className="right">
      <div className="top-product">
        <Navbar type="products"/>
      </div>
      <div className="bottom-product">
        <ProductList/>
      </div>
    </div>
    </div>  )
}

export default Products