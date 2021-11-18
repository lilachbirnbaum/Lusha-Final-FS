import ComboBox from "../General/ComboBox";
import PurchasesTable from "./PurchasesTable";
import { useState, useEffect } from "react";
import axios from "axios";
import "./PurchasesPage.css";

const customersURL = "http://localhost:8000/customers";
const purchasesByFiltersURL =
  "http://localhost:8000/purchases/purchasesByFilter";
const PurchasesPage = ({ store }) => {
  const [productSelected, setProductSelected] = useState({ id: -1 });
  const [customerSelected, setCustomerSelected] = useState({ id: -1 });
  const [dateSelected, setDateSelected] = useState(-1);
  const [allCustomers, setAllCustomers] = useState([]);
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(customersURL);
      setAllCustomers(data);
    })();
  }, []);
  const customerSelectedHandler = (customerId) => {
    const customer = allCustomers.find((c) => c.id === +customerId);

    setCustomerSelected(customer);
  };
  const productSelectedHandler = (productName) => {
    const product = store.allProducts.find((p) => p.name === productName);
    setProductSelected(product);
  };
  const searchHandler = async () => {
    const { data } = await axios.get(
      `${purchasesByFiltersURL}/${customerSelected.id}/${productSelected.id}/${dateSelected}`
    );

    setPurchases(data);
  };
  return (
    <div>
      <h1>Purchases Page</h1>
      <div id="purchase-page-container">
        <div id="search-bar" className="flex">
          <ComboBox
            list={allCustomers}
            onSelected={customerSelectedHandler}
            type="customer"
            placeHolder="Choose customer"
          />
          <ComboBox
            list={store.allProducts}
            onSelected={productSelectedHandler}
            type=""
            placeHolder="Choose product"
          />
          <div>
            <input
              type="date"
              onChange={(e) => setDateSelected(e.target.value)}
            ></input>
          </div>
          <div>
            <button onClick={searchHandler}>Search</button>
          </div>
        </div>
        {purchases.length > 0 && (
          <div id="purchases-table">
            <PurchasesTable list={purchases} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PurchasesPage;
