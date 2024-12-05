import React, { useState, createContext, useContext } from "react";

export const ProductsContext = createContext([]);

export const ProductsProvider = ({ children }) => {
  const initialData = [{ id: "1" }];
  const [productsData, setProductsData] = useState(initialData);
  const [index, setIndex] = useState(0);

  const updateProducts = (updatedData) => {
    const updateProductData = productsData.map((item, indexFromData) => {
      if (indexFromData === index) {
        return { ...updatedData[0] };
      }
      return item;
    });
    setProductsData(updateProductData);
  };

  const addProductContainer = () => {
    setProductsData([...productsData, {}]);
  };

  const updateIndexOfContainer = (index) => {
    setIndex(index);
  };

  const updateDndProducts = (reorderedList) => {
    setProductsData([...reorderedList]);
  };
  const updateVariantsDnd = (reorderedVariants) => {
    const updateProductData = productsData.map((item, indexFromData) => {
      if (indexFromData === index) {
        return { ...item, variants: [...reorderedVariants] };
      }
      return item;
    });
    setProductsData(updateProductData);
  };
  return (
    <ProductsContext.Provider
      value={{
        productsData,
        updateProducts,
        addProductContainer,
        updateIndexOfContainer,
        updateDndProducts,
        updateVariantsDnd,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
export const useProductsContext = () => useContext(ProductsContext);
