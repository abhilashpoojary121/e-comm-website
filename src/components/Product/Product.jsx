import React, { useContext } from "react";
import { useProductsContext } from "../../context/ProductsContext";
import Button from "@mui/material/Button";
import Input from "../../common-components/Input/Input";
import dragdots from "../../assets/media/dragdots.svg";
const Product = (props) => {
  const { index, title, handleOpen, value } = props;
  const handleClick = () => {
    console.log("products");
  };
  return (
    <React.Fragment>
      <div id="products">
        <img src={dragdots} width="7px" height="14px"></img>
        <span>{`${index + 1}.`}</span>
        <Input handleOpen={handleOpen} value={value} />
        <Button
          variant="contained"
          onClick={() => {
            handleClick();
          }}
        >
          Add Discount
        </Button>
      </div>
    </React.Fragment>
  );
};

export default Product;
