const { Product } = require("../models");

const getAllProducts = async () => {
  return await Product.findAll();
};

const getProductById = async (productId) => {
  return await Product.findByPk(productId);
};

module.exports = {
  getAllProducts,
  getProductById,
};
