const { Order } = require("../models");

const createOrder = async (orderData) => {
  return await Order.create(orderData);
};

const getAllOrders = async () => {
  return await Order.findAll();
};

module.exports = {
  createOrder,
  getAllOrders,
};
