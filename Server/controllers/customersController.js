const express = require("express");
const customersBLL = require("../services/customersBLL");

const router = express.Router();

router.route("/").get(async (req, res) => {
  const customers = await customersBLL.getAllCustomers();
  console.log(customers);
  return res.json(customers);
});
// Get by id
router.route("/:id").get(async (req, res) => {
  const id = req.params.id;
  const result = await customersBLL.getCustomerById(id);
  return res.json(result);
});

// Add
router.route("/").post(async (req, res) => {
  const newCustomer = req.body;
  const result = await customersBLL.addCustomer(newCustomer);
  return res.json(result);
});

// PUT
router.route("/:id").put(async (req, res) => {
  const id = req.params.id;
  const customer = req.body;
  const result = await customersBLL.updateCustomer({ ...customer, id });
  return res.json(result);
});

// DELETE
router.route("/:id").delete(async (req, res) => {
  const id = req.params.id;
  const result = await customersBLL.deleteCustomer(id);
  return res.json(result);
});

router.route("/ProductPurchased/:id").get(async (req, res) => {
  const customerId = req.params.id;
  const products = await customersBLL.getAllProductsOfCustomer(customerId);
  return res.json(products);
});

module.exports = router;
