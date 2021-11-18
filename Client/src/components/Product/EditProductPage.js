import ComboBox from "../General/ComboBox";
import axios from "axios";
import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import "./EditPage.css";

const chosenProdCustomersURL =
  "http://localhost:8000/products/customersPurchased";
const EMPTY_PRODUCT = {
  name: "",
  price: "",
  quantity: "",
  id: "",
};
const EditProductPage = ({ store }) => {
  const [product, setProduct] = useState(EMPTY_PRODUCT);
  const [customers, setCustomers] = useState([]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.name]: e.value });
  };
  const selectedHandler = (selectedProductName) => {
    const selectedProduct = store.allProducts.find(
      (p) => p.name === selectedProductName
    );
    if (!selectedProduct) {
      return;
    }
    setProduct({ ...selectedProduct });
  };
  const deleteProductHandler = async () => {
    //check if the product is the last one
    if (store.allProducts.length === 1) {
      alert("Cannot delete product because its the last one");
      return;
    } else {
      //1. delete from store
      store.deleteProduct(product.id);
      //2. delete from db
      const msg = await axios.delete(
        `http://localhost:8000/products/${product.id}`
      );
      setProduct(store.allProducts[0]);
    }
  };

  const updateProductHandler = async () => {
    //1. update store
    store.updateProduct(product);
    //2. update db
    const msg = await axios.put(
      `http://localhost:8000/products/${product.id}`,
      product
    );
  };
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `${chosenProdCustomersURL}/${product.id}`
      );

      setCustomers([...data]);
    })();
  }, [product]);

  return (
    <div>
      <h1>Edit Product Page</h1>
      <div className="flex" id="edit-product-container">
        <ComboBox
          list={store?.allProducts}
          onSelected={selectedHandler}
          placeHolder="Choose product"
        />
        <div>
          <strong>Name: </strong>
          <br />
          <input
            type="text"
            value={product.name}
            name="name"
            onChange={(e) => handleChange(e.target)}
          />
          <br />
          <strong>Price: </strong>
          <br />
          <input
            type="number"
            value={product.price}
            name="price"
            onChange={(e) => handleChange(e.target)}
          />
          <br />
          <strong>Quantity: </strong>
          <br />
          <input
            type="number"
            value={product.quantity}
            name="quantity"
            onChange={(e) => handleChange(e.target)}
          />
          <br />
          <button onClick={() => updateProductHandler()}>Update</button>
          <button onClick={() => deleteProductHandler()}>Delete</button>
        </div>
        <div>
          <h3>{`${product.name}${product.id === "" ? "" : " customers"}`}</h3>
          {customers.map((customer, i) => {
            return (
              <div className="customer-box" key={`${i}customer`}>
                <Link to={`/editCustomer/${customer.customer_id}`}>
                  {" "}
                  <strong>{`Full Name: ${customer.first_name} ${customer.last_name}`}</strong>
                </Link>
                <br />
                <strong>{`City: ${customer.city}`}</strong>
                <br />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default observer(EditProductPage);
