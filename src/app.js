const express = require("express");
const path = require("path");
require("./config/db");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const categoryRoutes = require("./routes/category.routes");
const productRoutes = require("./routes/product.routes");

app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);

app.get("/", (req, res) => {
    res.redirect("/categories");
});

module.exports = app;
