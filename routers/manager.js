const express = require("express");
const { ManagerController } = require("../controllers/ManagerController");
const { upload } = require("../uploud/config");
const manager = express.Router();


manager.get("/products", ManagerController.getMyProduct);


manager.post("/products", upload.array("image"), ManagerController.addProduct);


manager.patch("/product/:id", ManagerController.updateProduct);
manager.patch("/product/addimage/:id", upload.array("image"), ManagerController.addProductImage);
manager.patch("/productImage/:id", upload.single("image"), ManagerController.updateProductImage);


manager.delete("/product/:id", ManagerController.deleteProduct);
manager.delete("/productImage/:id", ManagerController.deleteProductImage);


module.exports = { manager };
