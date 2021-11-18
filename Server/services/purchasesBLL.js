const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "finalProject",
  password: "123",
  port: 5432,
});

exports.getAllPurchases = async () => {
  try {
    const { rows } = await pool.query("SELECT * FROM purchases;");
    return rows;
  } catch (error) {
    return "Error getting the purchases";
  }
};
exports.deletePurchase = async (id) => {
  console.log(id);
  try {
    await pool.query(`DELETE FROM purchases WHERE id=${id};`);
    return `purchase id:${id} deleted sucessfully`;
  } catch (error) {
    return `Error deleting purchase id:${id}`;
  }
};
exports.addPurchase = async (purchase) => {
  try {
    await pool.query(
      `INSERT INTO purchases(customer_id, product_id, date) VALUES (${purchase.customer_id}, ${purchase.product_id}, '${purchase.date}');`
    );
    return `purchase: ${purchase.customer_id}, ${purchase.product_id} added sucessfully`;
  } catch (error) {
    return `Error adding purchase: ${purchase.customer_id}, ${purchase.product_id}`;
  }
};
exports.purchasesAmount = async () => {
  try {
    const { rows } = await pool.query("SELECT COUNT(*) FROM purchases;");
    return +rows[0].count;
  } catch (error) {
    return "Error getting the purchases amount";
  }
};
//
exports.deletePurchaseByCustomerID = async (id) => {
  try {
    await pool.query(`DELETE FROM purchases WHERE customer_id=${id};`);
    return `customer id:${id} purchases deleted sucessfully`;
  } catch (error) {
    return `Error deleting customer's id:${id} purchases`;
  }
};

exports.purchasesByFilter = async (customerId, productId, date) => {
  try {
    const customerQuery = customerId
      ? `purchases.customer_id = ${customerId}`
      : "purchases.customer_id = purchases.customer_id";
    const productQuery = productId
      ? `purchases.product_id = ${productId}`
      : "purchases.product_id = purchases.product_id";
    const dateQuery = date
      ? `purchases.date = '${date}'`
      : "purchases.date = purchases.date";
    let query = `select purchases.customer_id, purchases.product_id, purchases.date, products.name as product_name, 
        customers.first_name, customers.last_name  from purchases inner join products on products.id = purchases.product_id 
        inner join customers on customer_id = customers.id where ${customerQuery} and ${productQuery} and ${dateQuery};`;

    const { rows } = await pool.query(query);

    let purchases = [];
    rows.forEach((purchase) => {
      console.log(purchase);
      const index = purchases.findIndex((pur) => {
        return pur.id === purchase.customer_id;
      });

      if (index > -1) {
        purchases[index].purchases.push({
          product_id: purchase.product_id,
          product_name: purchase.product_name,
          date: purchase.date,
        });
      } else {
        const newCustomer = {
          first_name: purchase.first_name,
          last_name: purchase.last_name,
          id: purchase.customer_id,
          purchases: [],
        };
        newCustomer.purchases.push({
          product_id: purchase.product_id,
          product_name: purchase.product_name,
          date: purchase.date,
        });
        purchases.push(newCustomer);
      }
    });
    return purchases;
  } catch (error) {
    return `Error `;
  }
};
