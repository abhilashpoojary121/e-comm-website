import React, { useState } from "react";
import { useProductsContext } from "../context/ProductsContext";
import Button from "@mui/material/Button";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Product from "./Product/Product";
import ProductPicker from "./ProductPicker/ProductPicker";
import "./style.css";

const ProductList = () => {
  //importing functions and data from context
  const { productsData, index, addProductContainer, updateDndProducts } =
    useProductsContext();
  //states for modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //handler functions for Drag and Drop functionality
  const handleDrag = (results) => {
    const { source, destination, type } = results;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;
    //Reordering for the psrentgroup
    if (type === "parentGroup") {
      const reorderedList = [...productsData];
      const [removedItem] = reorderedList.splice(source.index, 1);
      reorderedList.splice(destination.index, 0, removedItem);
      updateDndProducts(reorderedList);
    }
    // Reordering for the variants
    if (type === "variantGroup") {
      const [productIndex, variantIndex] = source.droppableId
        .split("-")
        .slice(1);
      const [productDestinationIndex, variantDestinationIndex] =
        destination.droppableId.split("-").slice(1);

      const updatedProductsData = [...productsData];
      const product = updatedProductsData[productIndex];

      const reorderedVariants = [...product.variants];
      const [removedVariant] = reorderedVariants.splice(variantIndex, 1);
      reorderedVariants.splice(variantDestinationIndex, 0, removedVariant);
      product.variants = reorderedVariants;
      updatedProductsData[productIndex] = product;
      updateDndProducts(updatedProductsData);
    }
  };

  return (
    <div id="productList">
      <h3>Add Products</h3>
      <h4>Product</h4>
      <DragDropContext onDragEnd={handleDrag}>
        <div id="product-list-container">
          <Droppable droppableId="parent" type="parentGroup">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {productsData.map((item, index) => {
                  return (
                    <div key={index} style={{ width: "fit-content" }}>
                      <Draggable
                        draggableId={`dragid-${index}`}
                        key={`dragkey-${index}`}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                          >
                            <Product
                              index={index}
                              title={item.title}
                              value={item.title}
                              variants={item.variants}
                              handleOpen={handleOpen}
                            />
                          </div>
                        )}
                      </Draggable>
                    </div>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
      <div id="button-container">
        <Button variant="outlined" onClick={() => addProductContainer()}>
          Add Product
        </Button>
      </div>
      <ProductPicker
        open={open}
        setOpen={setOpen}
        handleClose={handleClose}
        index={index}
      />
    </div>
  );
};

export default ProductList;
