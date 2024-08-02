const orderService = require("../services/orderService");
const productService = require("../services/productService");

const createOrder = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const product = await productService.getProductById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const totalPrice = product.price * quantity;
    const orderData = {
      productId,
      quantity,
      totalPrice,
    };

    const order = await orderService.createOrder(orderData);

    res.status(201).json(order);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error processing order", error: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
};
