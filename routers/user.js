const express = require("express");
const { UserController } = require("../controllers/UserController");
const user = express.Router();

user.get("/profile", UserController.getUser);
user.get("/categories", UserController.getCategory);
user.get("/category/:id", UserController.getCategoryById);
user.get("/subcategories", UserController.getSubcategory);
user.get("/subcategory/:id", UserController.getSubcategoryById);
user.get("/products", UserController.getProduct);
user.get("/product/:id", UserController.getProductById);

user.patch("", UserController.updateUser);
user.patch("/image", UserController.updateUserImage);
user.patch("/password", UserController.updateUserPassword);

user.delete("", UserController.deleteUser);

module.exports = { user };
