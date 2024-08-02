const express = require("express");
const bodyParser = require("body-parser");
const { Sequelize, DataTypes } = require("sequelize");

// Initialize Express app
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Initialize Sequelize
const sequelize = new Sequelize("shop", "username", "password", {
  host: "localhost",
  dialect: "mysql",
});

// Define Product model
const Product = sequelize.define(
  "Product",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    tableName: "products",
  }
);

// Define Order model
const Order = sequelize.define(
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

// Sync models with database
sequelize
  .sync()
  .then(() => {
    console.log("Database & tables created!");
  })
  .catch((error) => {
    console.error("Error creating database & tables:", error);
  });

// Get all products
app.get("/products", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
});

// Checkout
app.post("/checkout", async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    // Find product by ID
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Calculate total price
    const totalPrice = product.price * quantity;

    // Create an order
    const order = await Order.create({
      productId,
      quantity,
      totalPrice,
    });

    // Respond with the order details
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Error processing order", error });
  }
});

// Get all orders
app.get("/orders", async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
