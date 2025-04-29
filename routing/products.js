const express = require("express");
const productsController = require("../controllers/productsController");

const router = express.Router();

// Route to show all products
router.get("/", productsController.getProductsView);

// Route to display the "add new product" form
router.get("/add", productsController.getAddProductView);

// Route to handle product form submission
router.post("/add", productsController.addNewProduct);

// Route to show the newest added product
router.get("/new", productsController.getNewProductView);

// Route to show details of a specific product
router.get("/:name", productsController.getProductView);

// Route to delete a specific product
router.delete("/:name", productsController.deleteProduct);

module.exports = router;
