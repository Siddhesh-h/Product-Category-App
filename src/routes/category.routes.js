const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/category.controller");

router.get("/", categoryController.getCategories);
router.post("/add", categoryController.addCategory);

router.get("/edit/:id", categoryController.editCategoryForm);
router.post("/update/:id", categoryController.updateCategory);

router.get("/delete/:id", categoryController.deleteCategory);

module.exports = router;
