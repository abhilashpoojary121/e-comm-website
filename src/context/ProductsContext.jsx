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

  const handleAddDiscountState = (indexOfParent, indexOfVariants) => {
    const productsList = [...productsData];
    const updatedProductsData = productsList.map((item, index) => {
      if (indexOfParent === index) {
        const updatedVariants = item.variants.map((variant, variantsIndex) => {
          if (variantsIndex === indexOfVariants) {
            return { ...variant, discountAdded: true };
          }
          return variant;
        });
        return { ...item, variants: updatedVariants };
      }
      return item;
    });
    setProductsData(updatedProductsData);
  };
  const getDiscountState = (indexOfParent, indexOfVariants) => {
    const product = productsData[indexOfParent];
    if (product && product.variants && product.variants[indexOfVariants]) {
      return product.variants[indexOfVariants].discountAdded;
    }
    return false;
  };

  const handleAddDiscountInput = (indexOfParent, indexOfVariants, value) => {
    const productsList = [...productsData];
    const updatedProductsData = productsList.map((item, index) => {
      if (indexOfParent === index) {
        const updatedVariants = item.variants.map((variant, variantsIndex) => {
          if (variantsIndex === indexOfVariants) {
            return { ...variant, inputValue: value };
          }
          return variant;
        });
        return { ...item, variants: updatedVariants };
      }
      return item;
    });
    setProductsData(updatedProductsData);
  };

  const getInputValue = (indexOfParent, indexOfVariants) => {
    const product = productsData[indexOfParent];
    if (product && product.variants && product.variants[indexOfVariants]) {
      return product.variants[indexOfVariants].inputValue;
    }
    return "";
  };
  const handleSelectInput = (indexOfParent, indexOfVariants, value) => {
    const productsList = [...productsData];
    const updatedProductsData = productsList.map((item, index) => {
      if (indexOfParent === index) {
        const updatedVariants = item.variants.map((variant, variantsIndex) => {
          if (variantsIndex === indexOfVariants) {
            return { ...variant, selectValue: value };
          }
          return variant;
        });
        return { ...item, variants: updatedVariants };
      }
      return item;
    });
    setProductsData(updatedProductsData);
  };
  const variantSelectValue = (indexOfParent, indexOfVariants) => {
    const product = productsData[indexOfParent];
    if (product && product.variants && product.variants[indexOfVariants]) {
      return product.variants[indexOfVariants].selectValue;
    }
    return "";
  };
  const handleToggleVariantButton = (indexOfParent) => {
    const productsList = [...productsData];
    const updatedProductsData = productsList.map((item, index) => {
      if (indexOfParent === index) {
        return { ...item, toggleVariantButton: !item.toggleVariantButton };
      }
      return item;
    });
    setProductsData(updatedProductsData);
  };
  const getToggleVariantButton = (indexOfParent) => {
    const product = productsData[indexOfParent];
    if (product) {
      return product.toggleVariantButton;
    }
    return false;
  };

  const handleDiscountParent = (indexOfParent) => {
    const productsList = [...productsData];
    const updatedProductsData = productsList.map((item, index) => {
      if (indexOfParent === index) {
        return { ...item, discountAdded: true };
      }
      return item;
    });
    setProductsData(updatedProductsData);
  };
  const getToggleParentButtonState = (indexOfParent) => {
    const product = productsData[indexOfParent];
    if (product) {
      return product.discountAdded;
    }
    return false;
  };
  const handleParentInput = (indexOfParent, value) => {
    const productsList = [...productsData];
    const updatedProductsData = productsList.map((item, index) => {
      if (indexOfParent === index) {
        return { ...item, inputValue: value };
      }
      return item;
    });
    setProductsData(updatedProductsData);
  };
  const parentInputValue = (indexOfParent) => {
    const product = productsData[indexOfParent];
    if (product) {
      return product.inputValue;
    }
    return false;
  };
  const handleParentSelectInput = (indexOfParent, value) => {
    const productsList = [...productsData];
    const updatedProductsData = productsList.map((item, index) => {
      if (indexOfParent === index) {
        return { ...item, selectValue: value };
      }
      return item;
    });
    setProductsData(updatedProductsData);
  };
  const parentSelectInputValue = (indexOfParent) => {
    const product = productsData[indexOfParent];
    if (product) {
      return product.selectValue;
    }
    return false;
  };
  return (
    <ProductsContext.Provider
      value={{
        productsData,
        index,
        updateProducts,
        addProductContainer,
        deleteProductContainer,
        deleteVariants,
        updateIndexOfContainer,
        updateDndProducts,
        updateVariantsDnd,
        handleAddDiscountState,
        getDiscountState,
        handleAddDiscountInput,
        getInputValue,
        handleToggleVariantButton,
        getToggleVariantButton,
        handleDiscountParent,
        getToggleParentButtonState,
        handleParentInput,
        parentInputValue,
        handleParentSelectInput,
        parentSelectInputValue,
        handleSelectInput,
        variantSelectValue,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
export const useProductsContext = () => useContext(ProductsContext);
