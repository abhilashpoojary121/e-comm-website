import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { DataGrid } from "@mui/x-data-grid";
import "./index.css";
import searchIcon from "../../assets/media/searchIcon.svg";
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
    padding: "20px 5px 5px 30px",
    margin: "0",
  },
  hr: {
    border: "1px solid #0000001A",
  },
};

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
const ProductPicker = (props) => {
  const { handleClose, open } = props;
  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      sortable: false,
    },
  ];
  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  ];
  const handleAdd = () => {};
  return (
    <React.Fragment>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h3>Search Product</h3>
          <hr />
          <div id="searchBar">
            <img src={searchIcon} />
            <input type="text" placeholder="Search product" />
          </div>
          <hr />
          <DataGrid
            rows={rows}
            columns={columns}
            // initialState={{ pagination: { paginationModel } }}
            // pageSizeOptions={[5, 10]}
            disableColumnMenu
            disableColumnResize
            columnSeparator={false}
            checkboxSelection
            sx={{
              height: "auto",
              border: 0,
              "& .MuiDataGrid-columnSeparator": { display: "none" },
            }}
          />
          <div id="modal-footer">
            <Button
              variant="outlined"
              onClick={handleClose}
              sx={cancelButtonStyle}
            >
              Cancel
            </Button>
            <Button variant="contained" onClick={handleAdd} sx={addButtonStyle}>
              Add
            </Button>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default ProductPicker;
