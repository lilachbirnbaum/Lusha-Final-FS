import { Link } from "react-router-dom";
import img from "../../Images/person.png";
const Customer = ({ customer, callback }) => {
  return (
    <div
      className="customer-box"
      style={{ display: "flex" }}
      onClick={() => callback(customer)}
    >
      <div>
        <Link to={`/editCustomer/${customer.customer_id}`}>
          {" "}
          <strong>{`Name: ${customer.first_name} ${customer.last_name}`}</strong>
        </Link>
        <br />
        <strong>{`Purchased date: ${customer.date.slice(0, 10)}`}</strong>
        <br />
      </div>
      <div>
        <img src={img} style={{ width: "30px", height: "30px" }}></img>
      </div>
    </div>
  );
};

export default Customer;
