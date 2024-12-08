import React from "react";
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
import "./index.css";
const Product = (props) => {
  const { index, variants, handleOpen, value } = props;
  const {
    deleteProductContainer,
    deleteVariants,
    handleAddDiscountState,
    getDiscountState,
    handleAddDiscountInput,
    getInputValue,
    handleToggleVariantButton,
    getToggleVariantButton,
    handleDiscountParent,
    getToggleParentButtonState,
    handleParentInput,
    parentInputValue,
    handleParentSelectInput,
    parentSelectInputValue,
    handleSelectInput,
    variantSelectValue,
  } = useProductsContext();

  return (
    <React.Fragment>
      <div className="parent-grid-container">
        <img id="dragdots" src={dragdots} width="7px" height="14px" />
        <span>{`${index + 1}.`}</span>
        <Input
          handleOpen={handleOpen}
          value={value || ""}
          index={index}
          hideButton={false}
        />
        {getToggleParentButtonState(index) ? (
          <div id="discount-fields">
            <input
              className="discountInput"
              type="text"
              value={parentInputValue(index) || ""}
              placeholder=""
              onChange={(event) => {
                handleParentInput(index, event.target.value);
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
                value={parentSelectInputValue(index) || ""}
                IconComponent={SelectChevronIcon}
                onChange={(event) => {
                  handleParentSelectInput(index, event.target.value);
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
              handleDiscountParent(index);
            }}
          >
            Add Discount
          </Button>
        )}

        <img
          id="closeIcon"
          src={closeIcon}
          width="11.67px"
          height="11.67px"
          onClick={() => deleteProductContainer(index)}
        />
        <div
          id={variants && variants.length > 0 ? "show-variant" : "hide-variant"}
          className="variants-container"
        >
          <div
            id="variant-button"
            onClick={() => {
              handleToggleVariantButton(index);
            }}
          >
            {getToggleVariantButton(index) ? (
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
      {variants && getToggleVariantButton(index) ? (
        variants.map((element, indexOfVariants) => (
          <div key={indexOfVariants}>
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
                            value={element.title || ""}
                            index={index}
                            hideButton={true}
                          />
                          {getDiscountState(index, indexOfVariants) ? (
                            <div id="discount-fields">
                              <input
                                className="variantDiscountInput"
                                type="text"
                                value={
                                  getInputValue(index, indexOfVariants) || ""
                                }
                                placeholder=""
                                onChange={(event) => {
                                  handleAddDiscountInput(
                                    index,
                                    indexOfVariants,
                                    event.target.value
                                  );
                                }}
                              ></input>
                              <FormControl
                                sx={{
                                  width: "95px",
                                  height: "33.6px",
                                  marginLeft: "5px",
                                  paddingTop: 0,
                                  borderRadius: "30px",
                                }}
                              >
                                <Select
                                  value={
                                    variantSelectValue(
                                      index,
                                      indexOfVariants
                                    ) || ""
                                  }
                                  IconComponent={SelectChevronIcon}
                                  onChange={(event) => {
                                    handleSelectInput(
                                      index,
                                      indexOfVariants,
                                      event.target.value
                                    );
                                  }}
                                  displayEmpty
                                  inputProps={{ "aria-label": "Without label" }}
                                  sx={{
                                    ".MuiOutlinedInput-notchedOutline": {
                                      borderColor: "#00000012",
                                      borderRadius: "30px",
                                    },
                                    "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                      {
                                        borderColor: "#008060",
                                        borderRadius: "30px",
                                      },
                                    "&:hover .MuiOutlinedInput-notchedOutline":
                                      {
                                        borderColor: "#00000012",
                                        borderRadius: "30px",
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
                                      borderRadius: "30px",
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
                                handleAddDiscountState(index, indexOfVariants);
                              }}
                            >
                              Add Discount
                            </Button>
                          )}
                          <img
                            id="closeIcon"
                            src={closeIcon}
                            width="11.67px"
                            height="11.67px"
                            onClick={() =>
                              deleteVariants(index, indexOfVariants)
                            }
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
