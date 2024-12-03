import React, { useState, useEffect, createContext, useContext } from "react";
import { v4 } from "uuid";
import { useProductsContext } from "../context/ProductsContext";
import Button from "@mui/material/Button";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Input from "../common-components/Input/Input";
import dragdots from "../assets/media/dragdots.svg";
import Product from "./Product/Product";
import ProductPicker from "./ProductPicker/ProductPicker";
import "./style.css";

const ProductList = () => {
  const [open, setOpen] = React.useState(false);
  const { productsData, updateProducts, addProductContainer } =
    useProductsContext();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [showVariant, setShowVariant] = useState(false);
  const [discountState, setDiscountState] = useState({});

  const handleToggleDiscountButton = (index) => {
    setDiscountState((prevState) => ({
      ...prevState,
      [index]: !prevState[index], // Toggle the state for this product
    }));
  };
  return (
    <div id="productList">
      <h3>Add Products</h3>
      <h4>Product</h4>
      {productsData.map((item, index) => {
        return (
          <div key={v4()} style={{ width: "fit-content" }}>
            <Product
              index={index}
              title={item.title}
              value={item.title}
              variants={item.variants}
              handleOpen={handleOpen}
              handleToggleDiscountButton={handleToggleDiscountButton}
              toggleDiscountButton={discountState[index] || false}
            />
            <ProductPicker
              open={open}
              setOpen={setOpen}
              handleClose={handleClose}
              index={index}
            />
          </div>
        );
      })}
      <div id="button-container">
        <Button variant="outlined" onClick={() => addProductContainer()}>
          Add Product
        </Button>
      </div>
    </div>
  );
};

export default ProductList;
