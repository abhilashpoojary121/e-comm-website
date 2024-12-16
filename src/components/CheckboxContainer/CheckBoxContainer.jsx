import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import placeholder from "../../assets/media/placeholder.png";
import "./index.css";
const cancelButtonStyle = {
  fontFamily: "SF Pro Text Medium",
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
  fontFamily: "SF Pro Text Medium",
  width: "72px",
  height: "32px",
};
const parentCheckboxContainer = {
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
};
const childCheckboxContainer = {
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
};
const CheckboxContainer = (props) => {
  const {
    responseData,
    handleAdd,
    handleClose,
    setSearchValue,
    isLoading,
    fetchNewData,
    hasMoreData,
  } = props;
  const [mappedData, setMappedData] = useState([]);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  const parentProductsChecked = mappedData.filter((product) =>
    product.variants.some((variant) => variant.checkedValue)
  ).length;

  //useeffect to map and load the data in checkboxes
  useEffect(() => {
    setMappedData(
      responseData == null || !responseData
        ? []
        : responseData.map((item) => ({
            id: item.id,
            title: item.title,
            inputValue: "",
            selectValue: "",
            checkedValue: false,
            discountAdded: false,
            toggleVariantButton: false,
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
                    discountAdded: false,
                    inputValue: "",
                    selectValue: "",
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

  // Check if all child checkboxes are checked for a parent
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
      <div id="product-wrapper">
        {isLoading ? (
          <div id="loader-container">
            <CircularProgress />
          </div>
        ) : (
          <React.Fragment>
            {mappedData?.length === 0 ? (
              <React.Fragment></React.Fragment>
            ) : (
              <InfiniteScroll
                dataLength={
                  responseData == null || !responseData
                    ? 0
                    : responseData.length
                }
                next={fetchNewData}
                height={400}
                hasMore={hasMoreData}
                loader={
                  <div style={{ textAlign: "center" }}>
                    <CircularProgress />
                  </div>
                }
              >
                {mappedData.map((item, index) => {
                  return (
                    <div key={index} id="checkbox-container">
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
                                sx={parentCheckboxContainer}
                              />
                              <img
                                src={
                                  imageLoaded && item.imageSrc
                                    ? `${item.imageSrc}&width=36&height=36`
                                    : placeholder
                                }
                                alt="product-image"
                                onLoad={handleImageLoad}
                                loading="lazy"
                              />
                            </React.Fragment>
                          }
                        />
                      </div>
                      {item.variants.map((element, variantIndex) => (
                        <div key={variantIndex}>
                          <hr />
                          <div id="child-checkbox-container">
                            <FormControlLabel
                              key={element.id}
                              label={element.title}
                              sx={{ fontFamily: "SF Pro Text" }}
                              control={
                                <Checkbox
                                  checked={element.checkedValue}
                                  onChange={() =>
                                    handleChildCheckbox(item.id, element.id)
                                  }
                                  sx={childCheckboxContainer}
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
                })}
              </InfiniteScroll>
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
            onClick={() => {
              setSearchValue("");
              handleClose();
            }}
            sx={cancelButtonStyle}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setSearchValue("");
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
