const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "finalProject",
  password: "123",
  port: 5432,
});

exports.getAllproducts = async () => {
  try {
    const { rows } = await pool.query("SELECT * FROM products;");
    return rows;
  } catch (error) {
    return "Error getting the products";
  }
};
exports.deleteProduct = async (id) => {
  console.log(id);
  try {
    await pool.query(`DELETE FROM products WHERE id=${id};`);
    return `product id:${id} deleted sucessfully`;
  } catch (error) {
    return `Error deleting product id:${id}`;
  }
};
exports.addProduct = async (product) => {
  try {
    await pool.query(
      `INSERT INTO products(name, price, quantity) VALUES ('${product.name}', ${product.price}, ${product.quantity});`
    );
    return `product: '${product.name}' added sucessfully`;
  } catch (error) {
    return `Error adding product: "${product.name}"`;
  }
};
exports.updateProduct = async (product) => {
  console.log(product);
  try {
    await pool.query(
      `UPDATE products SET name='${product.name}',price=${product.price}, quantity=${product.quantity} WHERE id=${product.id};`
    );
    return `product: '${product.name}' updated sucessfully`;
  } catch (error) {
    return `Error updating product: '${product.name}'`;
  }
};

exports.getAllCustomers = async (prodId) => {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM  customers INNER JOIN  purchases ON purchases.customer_id = customers.id WHERE product_id = ${prodId};`
    );
    return rows;
  } catch (error) {
    return "Error getting the products";
  }
};
