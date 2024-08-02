const express = require("express");
const orderController = require("../controllers/orderController");

const router = express.Router();

router.post("/checkout", orderController.createOrder);
router.get("/orders", orderController.getAllOrders);

module.exports = router;
