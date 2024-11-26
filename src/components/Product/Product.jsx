import React from "react";
import Button from "@mui/material/Button";
import Input from "../../common-components/Input/Input";
import dragdots from "../../assets/media/dragdots.svg";
const Product = (props) => {
  const { index, title } = props;
  return (
    <React.Fragment>
      <div id="products">
        <img src={dragdots} width="7px" height="14px"></img>
        <span>{`${index}.`}</span>
        <Input />
        <Button variant="contained">Add Discount</Button>
      </div>
    </React.Fragment>
  );
};

export default Product;
