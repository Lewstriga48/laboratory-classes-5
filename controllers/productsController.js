const Product = require("../models/Product");
const { MENU_LINKS } = require("../constants/navigation");
const { STATUS_CODE } = require("../constants/statusCode");

// Display all products
exports.getProductsView = (req, res) => {
  const products = Product.getAll();

  res.render("products.ejs", {
    headTitle: "Shop - Products",
    path: "/",
    menuLinks: MENU_LINKS,
    activeLinkPath: "/products",
    products,
  });
};

// Show the form to add a new product
exports.getAddProductView = (req, res) => {
  res.render("add-product.ejs", {
    headTitle: "Shop - Add Product",
    path: "/add",
    menuLinks: MENU_LINKS,
    activeLinkPath: "/products/add",
  });
};

// Add a new product from form data
exports.addNewProduct = (req, res) => {
  const { name, description, price } = req.body;
  const newProduct = new Product(name, description, price);

  console.log("New product submitted:", newProduct); // Log added

  Product.add(newProduct);

  res.status(STATUS_CODE.FOUND).redirect("/products/new");
};

// Show the most recently added product
exports.getNewProductView = (req, res) => {
  const newestProduct = Product.getLast();

  res.render("new-product.ejs", {
    headTitle: "Shop - Newest Product",
    path: "/new",
    activeLinkPath: "/products/new",
    menuLinks: MENU_LINKS,
    newestProduct,
  });
};

// Show details of a single product by name
exports.getProductView = (req, res) => {
  const name = req.params.name;
  const product = Product.findByName(name);

  if (!product) {
    return res.status(STATUS_CODE.NOT_FOUND).send("Product not found");
  }

  res.render("product.ejs", {
    headTitle: `Shop - ${product.name}`,
    path: `/products/${name}`,
    activeLinkPath: `/products/${name}`,
    menuLinks: MENU_LINKS,
    product,
  });
};

// Delete a product by name
exports.deleteProduct = (req, res) => {
  const name = req.params.name;
  Product.deleteByName(name);

  res.status(STATUS_CODE.OK).json({ success: true });
};
