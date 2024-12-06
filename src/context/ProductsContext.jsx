import React, { useState, createContext, useContext } from "react";

export const ProductsContext = createContext([]);

export const ProductsProvider = ({ children }) => {
  const initialData = [{ id: "1" }];
  const [productsData, setProductsData] = useState(initialData);
  const [index, setIndex] = useState(0);

  const updateProducts = (updatedData) => {
    const checkedData = updatedData.reduce((acc, item) => {
      if (item.variants) {
        const filteredVariants = item.variants.filter(
          (variant) => variant.checkedValue
        );
        if (filteredVariants.length > 0) {
          acc.push({ ...item, variants: filteredVariants });
        }
      }
      return acc;
    }, []);
    const productList = [...productsData];
    const checkedProductList = productList.flatMap((item, productIndex) => {
      if (productIndex === index) {
        return checkedData;
      }
      return item;
    });
    setProductsData(checkedProductList);
  };

  const addProductContainer = () => {
    setProductsData([...productsData, {}]);
  };

  const deleteProductContainer = (index) => {
    const updatedProducts = [...productsData];
    updatedProducts.splice(index, 1);
    setProductsData(updatedProducts);
  };

  const deleteVariants = (indexOfProduct, indexOfVariant) => {
    const updatedProducts = [...productsData];
    updatedProducts.forEach((item, productIndex) => {
      if (productIndex === indexOfProduct) {
        if (item.variants && item.variants.length > 0) {
          item.variants.splice(indexOfVariant, 1);
        }
      }
    });
    setProductsData(updatedProducts);
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
        deleteProductContainer,
        deleteVariants,
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
