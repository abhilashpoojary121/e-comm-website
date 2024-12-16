import React, { useState, useEffect } from "react";
import { useProductsContext } from "../../context/ProductsContext";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CheckboxContainer from "../CheckboxContainer/CheckBoxContainer";
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
  const { handleClose, open, setOpen } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [responseData, setResponseData] = useState([]);
  const { updateProducts } = useProductsContext();
  //states for infiniteScroll component
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);

  useEffect(() => {
    setPage(1);
    setHasMoreData(true);
    const getData = setTimeout(() => {
      getSearchedProducts();
    }, 1000);

    return () => clearTimeout(getData);
  }, [searchValue]);

  //fetching new data for infinitescroll
  const fetchNewData = async () => {
    setPage((prevState) => prevState + 1);
    try {
      const response = await fetch(
        `https://stageapi.monkcommerce.app/task/products/search?search=${searchValue}&page=${page}&limit=10`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.REACT_APP_MONK_API_KEY,
          },
          redirect: "follow",
        }
      );
      const result = await response.json();
      if (result && result.length > 0) {
        setResponseData((prev) => [...prev, ...result]);
      } else {
        setHasMoreData(false);
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  const getSearchedProducts = async () => {
    setIsLoading(true);
    const headers = {
      "Content-Type": "application/json",
      "x-api-key": process.env.REACT_APP_MONK_API_KEY,
    };
    try {
      const response = await fetch(
        `https://stageapi.monkcommerce.app/task/products/search?search=${searchValue}&page=1&limit=10`,
        {
          method: "GET",
          headers: headers,
          redirect: "follow",
        }
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const result = await response.json();
      setResponseData(result);
      setPage((prevState) => prevState + 1);
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
              alt="close-button"
              style={{ width: "17px", height: "17px", cursor: "pointer" }}
              onClick={() => {
                setSearchValue("");
                handleClose();
              }}
            />
          </Box>
          <hr />
          <div id="searchBar">
            <img src={searchIcon} alt="seacrh-icon" />
            <input
              type="text"
              placeholder="Search product"
              value={searchValue}
              onChange={handleInputChange}
              style={{ width: "90%" }}
              autoFocus="autofocus"
            />
          </div>
          <hr />
          <CheckboxContainer
            responseData={responseData}
            handleAdd={handleAdd}
            handleClose={handleClose}
            setSearchValue={setSearchValue}
            isLoading={isLoading}
            fetchNewData={fetchNewData}
            hasMoreData={hasMoreData}
          />
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default ProductPicker;
