import React, { useState, useEffect } from "react";
import { v4 } from "uuid";
import { useProductsContext } from "../../context/ProductsContext";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import checkIcon from "../../assets/media/checkIcon.svg";
import uncheckedIcon from "../../assets/media/uncheckedIcon.svg";
import "./index.css";
const cancelButtonStyle = {
  width: "104px",
  height: "32px",
  fontSize: "14px",
  borderRadius: "4px",
  color: "#00000099",
  border: "1px solid #00000066",
  "&:hover": {
    backgroundColor: "#00000042",
  },
};
const addButtonStyle = {
  width: "72px",
  height: "32px",
};
const CheckboxContainer = (props) => {
  const { responseData, handleAdd, handleClose, isLoading } = props;
  const [mappedData, setMappedData] = useState([]);

  //calculate total products to handle scroll +1 for parent
  const totalProducts = mappedData.reduce(
    (acc, item) => acc + item.variants.length + 1,
    0
  );

  const parentProductsChecked = mappedData.filter((product) =>
    product.variants.some((variant) => variant.checkedValue)
  ).length;

  //checkbox functions
  useEffect(() => {
    setMappedData(
      responseData?.length === 0 || !responseData
        ? []
        : responseData.map((item) => ({
            id: item.id,
            title: item.title,
            checkedValue: false,
            imageSrc: item.image.src,
            variants:
              item.variants.length === 0
                ? []
                : item.variants.map((variant) => ({
                    id: variant.id,
                    title: variant.title,
                    price: variant.price,
                    inventory_quantity: variant.inventory_quantity,
                    checkedValue: false,
                  })),
          }))
    );
  }, [responseData]);

  // Handle the parent checkbox state change
  const handleParentChange = (event, parentId) => {
    const newCheckedValue = event.target.checked;
    setMappedData((prevData) =>
      prevData.map((item) => {
        if (item.id === parentId) {
          return {
            ...item,
            checkedValue: newCheckedValue,
            variants: item.variants.map((variant) => ({
              ...variant,
              checkedValue: newCheckedValue,
            })),
          };
        }
        return item;
      })
    );
  };

  const handleChildCheckbox = (parentId, childId) => {
    setMappedData((prevData) =>
      prevData.map((item) => {
        if (item.id === parentId) {
          return {
            ...item,
            variants: item.variants.map((variant) =>
              variant.id === childId
                ? { ...variant, checkedValue: !variant.checkedValue }
                : variant
            ),
          };
        }
        return item;
      })
    );
  };

  const allChildrenChecked = (parentId) => {
    const parentItem = mappedData.find((item) => item.id === parentId);
    return parentItem.variants.every((variant) => variant.checkedValue);
  };

  // Check if some child checkboxes are checked for a parent
  const someChildrenChecked = (parentId) => {
    const parentItem = mappedData.find((item) => item.id === parentId);
    return parentItem.variants.some((variant) => variant.checkedValue);
  };

  return (
    <React.Fragment>
      <div className={totalProducts > 7 ? "show-scroll" : "no-scroll"}>
        {isLoading ? (
          <div id="loader-container">
            <CircularProgress />
          </div>
        ) : (
          <React.Fragment>
            {mappedData?.length === 0 ? (
              <React.Fragment></React.Fragment>
            ) : (
              mappedData.map((item) => {
                return (
                  <div key={v4()} id="checkbox-container">
                    <hr />
                    <div id="parent-checkbox-container">
                      <FormControlLabel
                        id="parent-checkbox"
                        label={item.title}
                        control={
                          <React.Fragment>
                            <Checkbox
                              checked={allChildrenChecked(item.id)}
                              indeterminate={
                                someChildrenChecked(item.id) &&
                                !allChildrenChecked(item.id)
                              }
                              onChange={(e) => handleParentChange(e, item.id)}
                              sx={{
                                width: "24px",
                                height: "24px",
                                padding: "6px 4.8px 6px 4.8px",
                                borderRadius: "4px",
                                color: "#008060",
                                "&.Mui-checked": {
                                  color: "#008060",
                                },
                                "&.MuiCheckbox-indeterminate": {
                                  color: "#008060",
                                },
                              }}
                            />
                            <img src={item.imageSrc} />
                          </React.Fragment>
                        }
                      />
                    </div>
                    {item.variants.map((element) => (
                      <div key={v4()}>
                        <hr />
                        <div id="child-checkbox-container">
                          <FormControlLabel
                            key={element.id}
                            label={element.title}
                            control={
                              <Checkbox
                                checked={element.checkedValue}
                                onChange={() =>
                                  handleChildCheckbox(item.id, element.id)
                                }
                                sx={{
                                  width: "24px",
                                  height: "24px",
                                  marginRight: "10px",
                                  borderRadius: "4px",
                                  color: "#008060",
                                  "&.Mui-checked": {
                                    color: "#008060",
                                  },
                                  "&.MuiCheckbox-indeterminate": {
                                    color: "#008060",
                                  },
                                }}
                              />
                            }
                          />
                          <div id="item-info">
                            <span>{`${element.inventory_quantity} available`}</span>
                            <span>{`₹${element.price}`}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })
            )}
          </React.Fragment>
        )}
      </div>
      <hr />
      <div id="modal-footer">
        {parentProductsChecked === 0 ? (
          <div></div>
        ) : (
          <span>{`${parentProductsChecked} ${
            parentProductsChecked === 1 ? "product" : "products"
          } selected`}</span>
        )}

        <div>
          <Button
            variant="outlined"
            onClick={handleClose}
            sx={cancelButtonStyle}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              handleAdd(mappedData);
            }}
            sx={addButtonStyle}
          >
            Add
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CheckboxContainer;
