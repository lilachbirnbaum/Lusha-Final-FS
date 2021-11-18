const express = require("express");
const productsBLL = require("../services/productsBLL");

const router = express.Router();

router.route("/").get(async (req, res) => {
  const products = await productsBLL.getAllproducts();
  console.log(products);
  return res.json(products);
});

// Add
router.route("/").post(async (req, res) => {
  const newProduct = req.body;
  const result = await productsBLL.addProduct(newProduct);
  return res.json(result);
});

// PUT
router.route("/:id").put(async (req, res) => {
  const id = req.params.id;
  const product = req.body;
  const result = await productsBLL.updateProduct({ ...product, id });
  return res.json(result);
});

// DELETE
router.route("/:id").delete(async (req, res) => {
  const id = req.params.id;
  const result = await productsBLL.deleteProduct(id);
  return res.json(result);
});

router.route("/customersPurchased/:id").get(async (req, res) => {
  const prodId = req.params.id;
  const customers = await productsBLL.getAllCustomers(prodId);
  return res.json(customers);
});

module.exports = router;
