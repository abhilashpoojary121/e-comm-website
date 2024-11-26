import React from "react";
import edit from "../../assets/media/edit.svg";
import "./index.css";

const Input = ({ value }) => {
  return (
    <React.Fragment>
      <div id="inputContainer">
        <input
          type="text"
          value={value}
          placeholder="Select Product"
          disabled
        ></input>
        <button>
          <img src={edit} width={"15.98px"} height={"16px"}></img>
        </button>
      </div>
    </React.Fragment>
  );
};
export default Input;
