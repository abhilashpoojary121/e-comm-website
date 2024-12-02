import React, { useState, createContext, useContext } from "react";

export const ProductsContext = createContext([]);

export const ProductsProvider = ({ children }) => {
  const initialData = [{}];
  const [productsData, setProductsData] = useState(initialData);

  const updateProducts = (updatedData, indexOfModal) => {
    console.log("indexOdmodal", indexOfModal);
    const updateProductData = productsData.map((item, index) => {
      if (index === indexOfModal) {
        return { ...updatedData[0] };
      }
      return item;
    });
    setProductsData(updateProductData);
  };

  const addProductContainer = () => {
    setProductsData([...productsData, {}]);
  };
  return (
    <ProductsContext.Provider
      value={{ productsData, updateProducts, addProductContainer }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
export const useProductsContext = () => useContext(ProductsContext);
