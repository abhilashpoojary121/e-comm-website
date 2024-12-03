import React, { useContext, useState } from "react";
import { v4 } from "uuid";
import { useProductsContext } from "../../context/ProductsContext";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Input from "../../common-components/Input/Input";
import dragdots from "../../assets/media/dragdots.svg";
import closeIcon from "../../assets/media/closeIcon.svg";
import downArrow from "../../assets/media/downArrow.svg";
import upArrow from "../../assets/media/upArrow.svg";
const Product = (props) => {
  const {
    index,
    title,
    variants,
    handleOpen,
    value,
    handleToggleDiscountButton,
    toggleDiscountButton,
  } = props;
  const [toggleVariantButton, setToggleVariantButton] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [selectInput, setSelectInput] = useState("% Off");

  return (
    <React.Fragment>
      <div className="parent-grid-container">
        <img id="dragdots" src={dragdots} width="7px" height="14px" />
        <span>{`${index + 1}.`}</span>
        <Input
          handleOpen={handleOpen}
          value={value}
          index={index}
          hideButton={false}
        />
        {toggleDiscountButton ? (
          <div id="discount-fields">
            <input
              className="discountInput"
              type="text"
              value={textInput}
              placeholder=""
              onChange={(event) => {
                setTextInput(event.target.value);
              }}
            ></input>
            <FormControl
              sx={{
                width: 95,
                height: "33.6px",
                marginLeft: "5px",
                paddingTop: 0,
              }}
            >
              <Select
                value={selectInput}
                onChange={(event) => {
                  setSelectInput(event.target.value);
                }}
                sx={{
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "#00000012",
                    borderRadius: "0px",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#008060",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#00000012",
                  },
                  "& .MuiSelect-select": {
                    fontFamily: "SF Pro Text Light",
                    paddingRight: 4,
                    paddingLeft: 2,
                    paddingTop: "5px",
                    paddingBottom: "5px",
                    boxShadow: " 0px 2px 4px 0px #0000001a",
                    borderRadius: "0px",
                    alignContent: "center",
                  },
                }}
              >
                <MenuItem value={"percent"}>% Off</MenuItem>
                <MenuItem value={"flat"}>flat off</MenuItem>
              </Select>
            </FormControl>
          </div>
        ) : (
          <Button
            id="disocunt-btn"
            variant="contained"
            onClick={() => {
              handleToggleDiscountButton(index);
            }}
          >
            Add Discount
          </Button>
        )}

        <img id="closeIcon" src={closeIcon} width="11.67px" height="11.67px" />
        <div
          id={variants ? "show-variant" : "hide-variant"}
          className="variants-container"
        >
          <div
            id="variant-button"
            onClick={() => {
              setToggleVariantButton(!toggleVariantButton);
            }}
          >
            {toggleVariantButton ? (
              <React.Fragment>
                <span>Hide variant</span>
                <img src={upArrow} width="11px" height="21px" />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <span>Show variant</span>
                <img src={downArrow} width="11px" height="21px" />
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
      {/* <div
        id={variants ? "show-variant" : "hide-variant"}
        className="variants-container"
      >
        <div
          id="variant-button"
          onClick={() => {
            setToggleVariantButton(!toggleVariantButton);
          }}
        >
          {toggleVariantButton ? (
            <React.Fragment>
              <span>Hide variant</span>
              <img src={upArrow} width="11px" height="21px" />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <span>Show variant</span>
              <img src={downArrow} width="11px" height="21px" />
            </React.Fragment>
          )}
        </div>
      </div> */}

      {variants && toggleVariantButton ? (
        variants.map((element, indexOfVariants) => (
          <div
            key={v4()}
            className="parent-grid-container"
            id="child-grid-container"
          >
            <img id="dragdots" src={dragdots} width="7px" height="14px" />
            <span>{`${indexOfVariants + 1}.`}</span>
            <Input
              handleOpen={handleOpen}
              value={element.title}
              index={index}
              hideButton={true}
            />
            <Button
              id="disocunt-btn"
              variant="contained"
              onClick={() => {
                handleToggleDiscountButton(index);
              }}
            >
              Add Discount
            </Button>
            <img
              id="closeIcon"
              src={closeIcon}
              width="11.67px"
              height="11.67px"
            />
          </div>
        ))
      ) : (
        <React.Fragment></React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Product;
