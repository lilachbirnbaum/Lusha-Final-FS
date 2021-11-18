const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "finalProject",
  password: "123",
  port: 5432,
});

exports.getAllCustomers = async () => {
  try {
    const { rows } = await pool.query("SELECT * FROM customers;");
    return rows;
  } catch (error) {
    return "Error getting the customers";
  }
};
exports.deleteCustomer = async (id) => {
  try {
    await pool.query(`DELETE FROM customers WHERE id=${id};`);
    return `customer id:${id} deleted sucessfully`;
  } catch (error) {
    return `Error deleting customer id:${id}`;
  }
};
exports.addCustomer = async (customer) => {
  console.log(customer);
  try {
    await pool.query(
      `INSERT INTO customers(first_name, last_name, city) VALUES ('${customer.first_name}', '${customer.last_name}', '${customer.city}');`
    );
    return `customer: '${customer.first_name} ${customer.last_name}' added sucessfully`;
  } catch (error) {
    return `Error adding customer: '${customer.first_name} ${customer.last_name}'`;
  }
};
exports.updateCustomer = async (customer) => {
  try {
    await pool.query(
      `UPDATE customers SET first_name='${customer.first_name}',last_name='${customer.last_name}', city='${customer.city}' WHERE id=${customer.id};`
    );
    return `customer: '${customer.first_name} ${customer.last_name}' updated sucessfully`;
  } catch (error) {
    return `Error updating customer: '${customer.first_name} ${customer.last_name}'`;
  }
};

exports.getAllProductsOfCustomer = async (customerId) => {
  try {
    const { rows } = await pool.query(
      `select name, price,quantity,products.id,purchases.date from products inner join purchases ON products.id = purchases.product_id WHERE customer_id =${customerId};`
    );
    return rows;
  } catch (error) {
    return "Error getting the products";
  }
};

exports.getCustomerById = async (id) => {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM customers WHERE id='${id}' `
    );
    return rows[0];
  } catch (error) {
    return "Error getting the customers";
  }
};
