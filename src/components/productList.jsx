import React, { useState } from "react";
import { v4 } from "uuid";
import Button from "@mui/material/Button";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Input from "../common-components/Input/Input";
import dragdots from "../assets/media/dragdots.svg";
import Product from "./Product/Product";
import "./style.css";

const ProductList = () => {
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
        <Product index={index + 1} title={item.title} key={item.id} />
      ))}
      <Button variant="outlined" onClick={handleAddProduct}>
        Add Product
      </Button>
    </div>
  );
};

export default ProductList;
