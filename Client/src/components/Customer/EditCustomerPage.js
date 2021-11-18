import axios from "axios";
import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";
import "../Product/EditPage.css";

const customersURL = "http://localhost:8000/customers";
const productsOfCustomerURL =
  "http://localhost:8000/customers/ProductPurchased";
const deleteCustomerByIDURL =
  "http://localhost:8000/purchases/deleteByCustomerID";
const EMPTY_CUSTOMER = {
  first_name: "",
  last_name: "",
  city: "",
  id: "",
};
const EditCustomerPage = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(EMPTY_CUSTOMER);
  const [productsOfCustomer, setProductsOfCustomer] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`${customersURL}/${id}`);
      console.log(data);
      setCustomer(data);
    })();
    (async () => {
      const { data } = await axios.get(`${productsOfCustomerURL}/${id}`);
      setProductsOfCustomer(data);
    })();
  }, []);

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.name]: e.value });
  };

  const deleteCustomerHandler = async () => {
    // delete from db
    const msg = await axios.delete(`${customersURL}/${id}`);
    //delete all customer's purchases
    const m = await axios.delete(`${deleteCustomerByIDURL}/${id}`);
  };

  const updateCustomerHandler = async () => {
    // update db
    const msg = await axios.put(`${customersURL}/${customer.id}`, customer);
  };
  const removeDuplicates = (arr) => {
    const dic = {};
    arr.forEach((purchase) => {
      dic[purchase.id] = purchase;
    });

    return Object.values(dic);
  };

  return (
    <div>
      <h1>{`Edit Customer Page`}</h1>
      <div style={{ display: "flex" }} id="edit-customer-container">
        <div>
          <strong>First Name: </strong>
          <br />
          <input
            type="text"
            value={customer.first_name}
            name="first_name"
            onChange={(e) => handleChange(e.target)}
          />
          <br />
          <strong>Last Name: </strong>
          <br />
          <input
            type="text"
            value={customer.last_name}
            name="last_name"
            onChange={(e) => handleChange(e.target)}
          />
          <br />
          <strong>City: </strong>
          <br />
          <input
            type="text"
            value={customer.city}
            name="city"
            onChange={(e) => handleChange(e.target)}
          />
          <br />
          <button onClick={() => updateCustomerHandler()}>Update</button>
          <button onClick={() => deleteCustomerHandler()}>Delete</button>
        </div>
        <div id="rigth-container-edit-customer">
          <h3>{`${customer.first_name} product's`}</h3>
          <div className="products-list">
            {removeDuplicates(productsOfCustomer).map((product, i) => {
              return (
                <div
                  className="product-box edit-product-box"
                  key={`${i}product`}
                >
                  <Link to="/editProduct">
                    {" "}
                    <strong>{`Name: ${product.name}`}</strong>
                  </Link>
                  <br />
                  <strong>{`Price: ${product.price}`}</strong>
                  <br />
                  <strong>{`Quantity: ${product.quantity}`}</strong>
                  <br />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(EditCustomerPage);
