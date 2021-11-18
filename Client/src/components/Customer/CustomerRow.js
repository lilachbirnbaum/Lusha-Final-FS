import "./CustomerPage.css";
const CustomerRow = ({ customer, callback, products }) => {
  return (
    <tr>
      <td>
        <div>
          <label>{`${customer.first_name} ${customer.last_name}`}</label>
          <br />
          <button
            className="add-product-button"
            onClick={() => callback(customer)}
          >
            Add Product
          </button>
        </div>
      </td>
      <td>
        <ul>
          {products &&
            products.map((p, i) => (
              <li key={`ProLi${i}${customer.id}`}>{p.name}</li>
            ))}
        </ul>
      </td>
      <td>
        <ul>
          {products &&
            products.map((p, i) => (
              <li key={`ProLiDate${i}${customer.id}`}>
                {p.date?.slice(0, 10)}
              </li>
            ))}
        </ul>
      </td>
    </tr>
  );
};

export default CustomerRow;
