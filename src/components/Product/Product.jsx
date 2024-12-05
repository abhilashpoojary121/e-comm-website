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
import { ReactComponent as SelectChevronIcon } from "../../assets/media/chevron-down_minor.svg";
import upArrow from "../../assets/media/upArrow.svg";
import { Draggable, Droppable } from "react-beautiful-dnd";
const Product = (props) => {
  const {
    index,
    title,
    variants,
    handleOpen,
    value,
    handleToggleDiscountButton,
    toggleDiscountButton,
    handleToggleVariant,
    toggleVariantButton,
    selectInput,
    handleSelectInput,
    discountInput,
    handleDiscountInput,
  } = props;

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
              value={discountInput}
              placeholder=""
              onChange={(event) => {
                handleDiscountInput(index, event.target.value);
              }}
            ></input>
            <FormControl
              sx={{
                width: "95px",
                height: "33.6px",
                marginLeft: "5px",
                paddingTop: 0,
              }}
            >
              <Select
                value={selectInput}
                IconComponent={SelectChevronIcon}
                onChange={(event) => {
                  handleSelectInput(index, event.target.value);
                }}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
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
                    fontSize: "14px",
                    paddingRight: 4,
                    paddingLeft: 2,
                    paddingTop: "5px",
                    paddingBottom: "5px",
                    boxShadow: " 0px 2px 4px 0px #0000001a",
                    borderRadius: "0px",
                    alignContent: "center",
                  },
                  "& .MuiSelect-icon": {
                    top: "20%",
                  },
                }}
              >
                <MenuItem value={""}>% Off</MenuItem>
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
              handleToggleVariant(index);
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
      {variants && toggleVariantButton ? (
        variants.map((element, indexOfVariants) => (
          <div key={v4()}>
            <Droppable
              droppableId={`variant-${index}-${indexOfVariants}`}
              type="variantGroup"
            >
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <Draggable
                    draggableId={`variant-${index}-${indexOfVariants}`}
                    index={indexOfVariants}
                  >
                    {(provided) => (
                      <div
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                      >
                        <div
                          className="parent-grid-container"
                          id="child-grid-container"
                        >
                          <img
                            id="dragdots"
                            src={dragdots}
                            width="7px"
                            height="14px"
                          />
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
                      </div>
                    )}
                  </Draggable>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))
      ) : (
        <React.Fragment></React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Product;
