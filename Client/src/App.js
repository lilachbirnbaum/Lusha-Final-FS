import { observer } from "mobx-react-lite";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Store from "./components/General/Store";
import Header from "./components/General/Header";
import HomePage from "./components/General/HomePage";
import ProductsPage from "./components/Product/ProductsPage";
import EditProductPage from "./components/Product/EditProductPage";
import CustomersPage from "./components/Customer/CustomersPage";
import EditCustomerPage from "./components/Customer/EditCustomerPage";
import PurchasesPage from "./components/purchase/PurchasesPage";
import "./components/General/General.css";
const allProductsURL = "http://localhost:8000/products";
const purchaseAmountURL = "http://localhost:8000/purchases/amount";

function App() {
  const store = new Store();
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(allProductsURL);
      store.loadProducts(data);
      const purchaseAmount = await axios.get(purchaseAmountURL);
      store.loadPurchasesAmount(purchaseAmount.data);
    })();
  }, []);
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route
          exact
          path="/products"
          element={<ProductsPage store={store} />}
        />
        <Route
          exact
          path="/editProduct"
          element={<EditProductPage store={store} />}
        />
        <Route
          exact
          path="/editCustomer/:id"
          element={<EditCustomerPage store={store} />}
        />
        <Route
          exact
          path="/customers"
          element={<CustomersPage store={store} />}
        />
        <Route
          exact
          path="/purchases"
          element={<PurchasesPage store={store} />}
        />
      </Routes>
    </div>
  );
}

export default observer(App);
