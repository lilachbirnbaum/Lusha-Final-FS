import { Link } from "react-router-dom";
import "./productsPage.css";
const Product = ({ product, callback }) => {
  return (
    <div className="product-box flex">
      <div>
        <Link to="/editProduct">
          {" "}
          <strong>{`Name: ${product.name}`}</strong>
        </Link>
        <br />
        <strong>{`Price: ${product.price}$`}</strong>
        <br />
        <strong>{`Quantity: ${product.quantity}`}</strong>
        <br />
      </div>
      <div>
        <button
          className="customer-who-pur-button"
          onClick={() => callback(product)}
        >
          Customers who purchased
        </button>
      </div>
    </div>
  );
};

export default Product;
