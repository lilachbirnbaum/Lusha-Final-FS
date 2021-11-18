const express = require("express");
const purchasesBLL = require("../services/purchasesBLL");

const router = express.Router();
const EMPTY = "-1";
router.route("/").get(async (req, res) => {
  const purchases = await purchasesBLL.getAllPurchases();
  return res.json(purchases);
});

// Add
router.route("/").post(async (req, res) => {
  const newPurchase = req.body;
  //   console.log(newPurchase);
  const result = await purchasesBLL.addPurchase(newPurchase);
  return res.json(result);
});

// DELETE PURCHASE BY ID
router.route("/:id").delete(async (req, res) => {
  const id = req.params.id;
  const result = await purchasesBLL.deletePurchase(id);
  return res.json(result);
});
//DELETE PURCHASES BY CUSTOMER ID
router.route("/deleteByCustomerID/:id").delete(async (req, res) => {
  const id = req.params.id;
  const result = await purchasesBLL.deletePurchaseByCustomerID(id);
  return res.json(result);
});

router.route("/amount").get(async (req, res) => {
  const result = await purchasesBLL.purchasesAmount();
  return res.json(result);
});

router
  .route("/purchasesByFilter/:customerId/:productId/:date")
  .get(async (req, res) => {
    const customerId =
      req.params.customerId === EMPTY ? "" : req.params.customerId;
    const productId =
      req.params.productId === EMPTY ? "" : req.params.productId;
    const date = req.params.date === EMPTY ? "" : req.params.date;
    // console.log(customerId, productId, date);
    const result = await purchasesBLL.purchasesByFilter(
      customerId,
      productId,
      date
    );
    return res.json(result);
  });

module.exports = router;
