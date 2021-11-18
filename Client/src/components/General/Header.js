import "./Header.css";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div id="top-nav">
      <Link to="/" className="link">
        Home
      </Link>
      <Link to="/products" className="link">
        Products
      </Link>
      <Link to="/customers" className="link">
        Customers
      </Link>
      <Link to="/purchases" className="link">
        Purchases
      </Link>
    </div>
  );
};

export default Header;
