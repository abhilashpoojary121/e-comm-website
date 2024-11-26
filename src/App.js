import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import ProductList from "./components/productList";
import "./App.css";
import monkheader from "./assets/media/monkheader.svg";
function App() {
  return (
    <>
      <div id="header-container">
        <img src={monkheader} width="30.97px" height="30.97px"></img>
        <h3>Monk Upsell & Cross-sell</h3>
        <hr />
      </div>
      <ProductList />
    </>
  );
}

export default App;
