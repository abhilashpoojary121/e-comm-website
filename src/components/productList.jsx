import React, { useState } from "react";
import { v4 } from "uuid";
import Button from "@mui/material/Button";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Input from "../common-components/Input/Input";
import dragdots from "../assets/media/dragdots.svg";
import Product from "./Product/Product";
import ProductPicker from "./ProductPicker/ProductPicker";
import "./style.css";

const ProductList = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const initialData = [
    {
      id: 1,
      title: "",
    },
  ];

  const [showVariant, setShowVariant] = useState(false);
  const [productList, setProductList] = useState(initialData);

  const handleAddProduct = () => {
    setProductList([
      ...productList,
      {
        id: v4(),
        title: "",
      },
    ]);
  };

  return (
    <div id="productList">
      <h3>Add Products</h3>
      <h4>Product</h4>

      {productList.map((item, index) => (
        <Product
          index={index + 1}
          title={item.title}
          key={item.id}
          handleOpen={handleOpen}
        />
      ))}
      <div id="button-container">
        <Button variant="outlined" onClick={handleAddProduct}>
          Add Product
        </Button>
      </div>
      <ProductPicker open={open} handleClose={handleClose} />
    </div>
  );
};

export default ProductList;
