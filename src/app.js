const express = require("express");
const path = require("path");
require("./config/db");

const categoryRoutes = require("./routes/category.routes");
const productRoutes = require("./routes/product.routes");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);

app.get("/", (req, res) => {
    res.render("index");
});

module.exports = app;
