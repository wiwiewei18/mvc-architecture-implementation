const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Order",
    {
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      tableName: "orders",
    }
  );
};
