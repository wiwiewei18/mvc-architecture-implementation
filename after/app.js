const express = require("express");
const bodyParser = require("body-parser");

const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use(productRoutes);
app.use(orderRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
