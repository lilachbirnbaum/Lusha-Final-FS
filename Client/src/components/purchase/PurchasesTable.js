const PurchasesTable = ({ list }) => {
  return (
    <table border="1">
      <tbody>
        <tr>
          <th>Customer Name</th>
          <th>Purchased Products</th>
          <th>Purchase Date</th>
        </tr>
        {list.map((customer) => {
          return (
            <tr>
              <td>{`${customer.first_name} ${customer.last_name}`}</td>
              <td>
                <ul>
                  {customer.purchases.map((pur) => {
                    return <li>{pur.product_name}</li>;
                  })}
                </ul>
              </td>
              <td>
                <ul>
                  {customer.purchases.map((pur) => {
                    return <li>{pur.date}</li>;
                  })}
                </ul>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default PurchasesTable;
