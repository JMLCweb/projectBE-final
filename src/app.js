require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const productsRoutes = require("../src/routes/productsRouter");
app.use("/products", productsRoutes);

const cart = require("../src/routes/cartRoutes");
app.use("/cart", cart);

const usersRoutes = require("../src/routes/usersRoutes");
app.use("/users", usersRoutes);

const adminRoutes = require("../src/routes/adminRoutes");
app.use("/godmode", adminRoutes);

app.listen(port, function () {
  console.log(`Listening on ${port}`);
});
