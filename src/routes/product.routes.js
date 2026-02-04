const express = require("express");
const router = express.Router();

const productController = require("../controllers/product.controller");

router.get("/", productController.getProducts);
router.post("/add", productController.addProduct);

router.get("/edit/:id", productController.editProductForm);
router.post("/update/:id", productController.updateProduct);

router.get("/delete/:id", productController.deleteProduct);

module.exports = router;
