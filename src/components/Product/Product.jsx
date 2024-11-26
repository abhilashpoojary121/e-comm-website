import React from "react";
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
        <button type="button" className="btn btn-primary">
          Add Discount
        </button>
      </div>
    </React.Fragment>
  );
};

export default Product;
