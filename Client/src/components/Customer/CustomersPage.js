import { useEffect, useState } from "react";
import CustomerRow from "./CustomerRow";
import ComboBox from "../General/ComboBox";
import axios from "axios";
import "./CustomerPage.css";
import img from "../../Images/shopping-cart.png";
const productsOfCustomerURL =
  "http://localhost:8000/customers/ProductPurchased";
const allCustomersURL = "http://localhost:8000/customers";
const productsURL = "http://localhost:8000/products";
const purchasesURL = "http://localhost:8000/purchases";

const CustomersPage = ({ store }) => {
  const [allcustomers, setAllcustomers] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedProduct, setSelectedProduct] = useState();

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(allCustomersURL);
      const customers = data;
      let responses = [];
      customers.map((customer) => {
        responses.push(setCustomerPurchases(customer.id));
      });
      const results = await Promise.all(responses);
      const final = customers.map((customer) => {
        let purchses = results.find((obj) => obj.customerId === customer.id);
        if (!purchses) {
          purchses = [];
        }
        return { ...customer, purchases: purchses.data };
      });
      const products = await axios.get(productsURL);
      setAllProducts(products.data);
      setAllcustomers(final);
    })();
  }, []);

  useEffect(() => {
    const firstItemInComboBox = allProducts.find((p) => p.quantity > 0);
    setSelectedProduct(firstItemInComboBox?.name);
  }, [allProducts]);

  const setCustomerPurchases = async (customerId) => {
    const { data } = await axios.get(`${productsOfCustomerURL}/${customerId}`);
    return { data: data, customerId: customerId };
  };

  const addProductButtonHandler = (customer) => {
    setSelectedCustomer(customer);
  };

  const buyButtonHandler = async () => {
    const newPro = allProducts.find((p) => p.name === selectedProduct);
    newPro.quantity = newPro.quantity - 1;

    //update product Amount
    const msg1 = await axios.put(`${productsURL}/${newPro.id}`, newPro);

    //2. update purchases
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    const newPurchase = {
      customer_id: selectedCustomer.id,
      product_id: newPro.id,
      date: date,
    };

    await axios.post(purchasesURL, newPurchase);

    store.increasePurchasedProductsAmount();
    //get all customer purchases
    const { data } = await axios.get(
      `${productsOfCustomerURL}/${selectedCustomer.id}`
    );
    let newAllCustomers = [...allcustomers];
    const index = newAllCustomers.findIndex(
      (c) => c.id === selectedCustomer.id
    );
    newAllCustomers[index].purchases = [...data];
    setAllcustomers(newAllCustomers);
  };
  const selectedProductHandler = (productName) => {
    setSelectedProduct(productName);
  };

  return (
    <div>
      <h1>Customers Information</h1>
      <div id="customer-info-container">
        <div>
          <table border="1">
            <tbody>
              <tr>
                <th>Customer</th>
                <th>Products</th>
                <th>Date</th>
              </tr>
              {allcustomers &&
                allcustomers.map((customer, i) => {
                  return (
                    <CustomerRow
                      key={`cusRow${i}`}
                      customer={customer}
                      callback={addProductButtonHandler}
                      products={customer.purchases}
                    />
                  );
                })}
            </tbody>
          </table>
        </div>
        {selectedCustomer && (
          <div id="purchase-container">
            <div>
              <h3
                style={{
                  backgroundColor: "rgb(235, 235, 235)",
                  padding: "5px",
                }}
              >{`Purchase Product for ${selectedCustomer.first_name} ${selectedCustomer.last_name}`}</h3>
              <ComboBox
                list={allProducts.filter((p) => p.quantity > 0)}
                onSelected={selectedProductHandler}
              />

              <button id="buy-button" onClick={() => buyButtonHandler()}>
                <img src={img} style={{ width: "25px", height: "25px" }}></img>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomersPage;
