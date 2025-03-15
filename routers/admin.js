const express = require("express");
const { AdminController } = require("../controllers/AdminController");
const { upload } = require("../uploud/config");
const admin = express.Router();

admin.post("/categories",upload.single("image"),AdminController.addCategory);
admin.post("/subcategories", AdminController.addSubCategory);

admin.patch("/categories/:id",upload.single("image"), AdminController.updateCategory);
admin.patch("/subcategories/:id", AdminController.updateSubCategory);
admin.patch("/blockUser/:id", AdminController.blockUserById);

admin.delete("/categories/:id",AdminController.deleteCategory);
admin.delete("/subcategories/:id",AdminController.deleteSubCategory);
admin.delete("/user/:id",AdminController.deleteUserById);

module.exports = { admin };

