class Product {
  constructor(name, description, price) {
    this.name = name;
    this.description = description;
    this.price = parseFloat(price); // Price is stored as a number
  }

  // Static array to store products in memory
  static #products = [];

  // Return all products
  static getAll() {
    return this.#products;
  }

  // Add a new product to the list
  static add(product) {
    console.log("Adding product:", product); // For debugging purposes
    this.#products.push(product);
  }

  // Find a product by its name
  static findByName(name) {
    return this.#products.find((product) => product.name === name);
  }

  // Delete a product by its name
  static deleteByName(name) {
    this.#products = this.#products.filter((product) => product.name !== name);
  }

  // Get the most recently added product
  static getLast() {
    if (!this.#products.length) {
      return null;
    }
    return this.#products[this.#products.length - 1];
  }
}

module.exports = Product;
