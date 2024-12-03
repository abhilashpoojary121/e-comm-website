import React, { useState, createContext, useContext } from "react";

export const ProductsContext = createContext([]);

export const ProductsProvider = ({ children }) => {
  const initialData = [{}];
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
  return (
    <ProductsContext.Provider
      value={{
        productsData,
        updateProducts,
        addProductContainer,
        updateIndexOfContainer,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
export const useProductsContext = () => useContext(ProductsContext);
