import React from "react";
import { useProductsContext } from "../../context/ProductsContext";
import edit from "../../assets/media/edit.svg";
import "./index.css";

const Input = (props) => {
  const { value, handleOpen, index, hideButton } = props;
  const { updateIndexOfContainer } = useProductsContext();
  return (
    <React.Fragment>
      <div
        id="inputContainer"
        style={
          hideButton
            ? {
                width: "184px",
                height: "31px",
                borderRadius: "30px",
              }
            : {}
        }
      >
        <input
          type="text"
          value={value}
          placeholder="Select Product"
          disabled
          style={
            hideButton
              ? {
                  width: "164px",
                  height: "31px",
                  borderRadius: "30px",
                  paddingLeft: "15px",
                }
              : {}
          }
        ></input>
        {hideButton ? (
          <React.Fragment></React.Fragment>
        ) : (
          <button>
            <img
              src={edit}
              width={"15.98px"}
              height={"16px"}
              onClick={() => {
                updateIndexOfContainer(index);
                handleOpen();
              }}
              style={{ cursor: "pointer" }}
            ></img>
          </button>
        )}
      </div>
    </React.Fragment>
  );
};
export default Input;
