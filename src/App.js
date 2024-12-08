import ProductList from "./components/productList";
import { createTheme, ThemeProvider } from "@mui/material";
import { ProductsProvider } from "./context/ProductsContext";
import "./App.css";
import monkheader from "./assets/media/monkheader.svg";

//defining global theme
const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        outlined: {
          fontFamily: "SF Pro Text",
          width: "193px",
          height: "48px",
          fontSize: "16px",
          border: "2px solid",
          color: "#008060",
          borderColor: "#008060",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "#00806030",
          },
        },
        contained: {
          fontFamily: "SF Pro Text Medium",
          width: "141px",
          height: "32px",
          borderRadius: "4px",
          border: "2px solid #008060",
          backgroundColor: "#008060",
          textTransform: "none",
        },
      },
    },
  },
  typography: {
    fontFamily: "SF Pro Text",
  },
});
function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <ProductsProvider>
          <div id="header-container">
            <img src={monkheader} width="30.97px" height="30.97px"></img>
            <h3>Monk Upsell & Cross-sell</h3>
            <hr />
          </div>
          <ProductList />
        </ProductsProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
