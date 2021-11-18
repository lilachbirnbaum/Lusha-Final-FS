import AllProductList from "./AllProductList";
import Customer from "../Customer/Customer";
import AddProductToCustomer from "./AddProductToCustomer";
import axios from "axios";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import "./productsPage.css";

const chosenProdCustomersURL =
  "http://localhost:8000/products/customersPurchased";

const ProductsPage = ({ store }) => {
  const [chosenProd, setChosenProd] = useState("");
  const [chosenProdCustomers, setChosenProdCustomers] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [addButtonClicked, setAddButtonClicked] = useState(false);
  const [selectedProductToAdd, setSelectedProductToAdd] = useState("");
  const customersMsg = chosenProdCustomers.length > 0 ? "" : `No purchases yet`;

  const cusWhoPurcButtonClicked = (prod) => {
    setChosenProd(prod);
    (async () => {
      //get all the chosen product's customers

      const { data } = await axios.get(`${chosenProdCustomersURL}/${prod.id}`);
      setChosenProdCustomers(data);
      if (data.length > 0) {
        setSelectedCustomer(data[0]);
      }
    })();
  };

  const saveButtonHandler = () => {
    if (!selectedProductToAdd) {
      alert("Please select product");
    } else {
      store.addProductToCustomer(selectedProductToAdd, selectedCustomer);
      store.increasePurchasedProductsAmount();
    }
  };

  return (
    <div>
      <div>
        <h1>Products Page</h1>
        <strong>{`Total amount of purchased products: ${store.purchasedProductsAmount}`}</strong>
      </div>
      <div className="flex" id="product-page-container">
        <AllProductList
          store={store}
          cusWhoPurcClicked={cusWhoPurcButtonClicked}
        />
        {chosenProd && (
          <div className="customers-data">
            <h3>{`Customers who bougth ${chosenProd.name} `}</h3>
            <div className="customersList">
              {chosenProdCustomers &&
                chosenProdCustomers?.map((customer, i) => (
                  <Customer
                    key={`customer${i}`}
                    customer={customer}
                    callback={setSelectedCustomer}
                  />
                ))}
              {customersMsg}
            </div>
            <button id="add-button" onClick={() => setAddButtonClicked(true)}>
              Add
            </button>
            <br />
            {addButtonClicked && (
              <AddProductToCustomer
                store={store}
                selectedCustomer={selectedCustomer}
                saveButtonHandler={saveButtonHandler}
                setSelectedProduct={setSelectedProductToAdd}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
//
export default observer(ProductsPage);
