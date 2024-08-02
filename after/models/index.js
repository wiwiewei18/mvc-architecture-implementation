const { Sequelize } = require("sequelize");
const config = require("../config");

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
  }
);

const Product = require("./product")(sequelize);
const Order = require("./order")(sequelize);

sequelize
  .sync()
  .then(() => {
    console.log("Database & tables created!");
  })
  .catch((error) => {
    console.error("Error creating database & tables:", error);
  });

module.exports = {
  sequelize,
  Product,
  Order,
};
