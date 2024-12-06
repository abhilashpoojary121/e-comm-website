import React, { useState, useEffect } from "react";
import { useProductsContext } from "../../context/ProductsContext";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import CheckboxContainer from "../../common-components/CheckboxContainer/CheckBoxContainer";
import "./index.css";
import searchIcon from "../../assets/media/searchIcon.svg";
import closeModal from "../../assets/media/closeModal.svg";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "663px",
  height: "auto",
  maxHeight: "612px",
  bgcolor: "#FFFFFF",
  borderRadius: "4px",
  h3: {
    fontWeight: "500",
    padding: "20px 5px 20px 30px",
    margin: "0",
  },
  hr: {
    border: "1px solid #0000001A",
    margin: 0,
  },
};

const ProductPicker = (props) => {
  const { handleClose, open, setOpen, index } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [responseData, setResponseData] = useState([]);
  const { productsData, updateProducts } = useProductsContext();
  useEffect(() => {
    const getData = setTimeout(() => {
      if (searchValue) {
        getSearchedProducts();
      }
    }, 1000);

    return () => clearTimeout(getData);
  }, [searchValue]);

  const getSearchedProducts = async () => {
    setIsLoading(true);
    const headers = {
      "Content-Type": "application/json",
      "x-api-key": "72njgfa948d9aS7gs5",
    };
    try {
      const response = await fetch(
        `http://stageapi.monkcommerce.app/task/products/search?search=${searchValue}&page=0&limit=1`,
        {
          method: "GET",
          headers: headers,
        }
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      // Parse the response body as JSON
      const result = await response.json();
      setResponseData(result);
    } catch (err) {
      console.log("error", err);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
    setIsLoading(false);
  };
  const handleAdd = (mappedData) => {
    if (mappedData && mappedData.length > 0) {
      updateProducts(mappedData);
      setOpen(false);
    } else {
      alert("Please select a product");
    }
  };
  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <React.Fragment>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingRight: "20px",
            }}
          >
            <h3>Search Product</h3>
            <img
              src={closeModal}
              style={{ width: "17px", height: "17px", cursor: "pointer" }}
              onClick={() => {
                handleClose();
              }}
            />
          </Box>
          <hr />
          <div id="searchBar">
            <img src={searchIcon} />
            <input
              type="text"
              placeholder="Search product"
              value={searchValue}
              onChange={handleInputChange}
              style={{ width: "90%" }}
            />
          </div>
          
          <CheckboxContainer
            responseData={responseData}
            handleAdd={handleAdd}
            handleClose={handleClose}
            isLoading={isLoading}
          />
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default ProductPicker;
