const { Product, Productimages, Manager, Subcategory } = require("../models");
const { schemaProductCreate, schemaProductUpdate } = require("../schema");
const { join } = require("path");
const fs = require("fs");

class ManagerController {

  static async addProduct(req, res) {
    try {
      const { error, value } = schemaProductCreate.validate(req.body);
      if (error) {
        return res.send({ value, error: error.details });
      }

      if (!req.files) {
        return res.send({ message: "Image not found" });
      }

      const { name, description, price, count, subcategoryId } = req.body;
      const subcategory = await Subcategory.findByPk(subcategoryId);
      if (!subcategory) {
        return res.send({ message: "subcategory not found" });
      }
      const newProduct = await Product.create({
        name,
        description,
        price,
        count,
        subcategoryId,
        managerId: req.user.id,
      });

      for (let key of req.files) {
        await Productimages.create({
          productId: newProduct.id,
          image: key.filename,
        });
      }

      return res.send({
        product: newProduct,
      });
    } catch (error) {
      return res.status(400).send({
        message: error.message,
      });
    }
  }

  static async updateProduct(req, res) {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) {
        return res.send({ message: "Product not found!" });
      }
      const { error, value } = schemaProductUpdate.validate(req.body);
      if (error) {
        return res.send({ value, error: error.details });
      }
      const { name, description, price, count, subcategoryId } = req.body;

      if (subcategoryId) {
        const subcategory = await Subcategory.findByPk(subcategoryId);
        if (!subcategory) {
          return res.send({ message: "subcategory not found" });
        }
      }
      await Product.update(
        {
          name: name ? name : product.name,
          description: description ? description : product.description,
          price: price ? price : product.price,
          count: count ? count : product.count,
          subcategoryId: subcategoryId ? subcategoryId : product.subcategoryId,
        },
        { where: { id: product.id } }
      );
      res.send(await Product.findByPk(req.params.id));
    } catch (error) {
      return res.status(400).send({
        message: error.message,
      });
    }
  }
  static async updateProductImage(req, res) {
    try {
      const productImg = await Productimages.findByPk(req.params.id);
      if (!productImg) {
        return res.send({ message: "ProductImage not found." });
      }

      if (!req.file) {
        return res.send({ message: "No image uploaded." });
      }

      fs.unlink(
        join(__dirname, "..", "public/" + productImg.filename),
        (err) => {
          if (err) throw err;
          console.log("path/file.txt was deleted");
        }
      );

      await Productimages.update(
        {
          image: req.file.filename,
        },
        { where: { id: productImg.id } }
      );

      return res.send({
        message: "Product image updated successfully.",
      });
    } catch (error) {
      return res.status(400).send({
        message: error.message,
      });
    }
  }
  static async addProductImage(req, res) {
    try {
      if (!req.files) {
        return res.send({ message: "Image not found" });
      }

      const product = await Product.findByPk(req.params.id);
      if (!product) {
        return res.send({ message: "Product not found" });
      }

      for (let key of req.files) {
        await Productimages.create({
          image: key.filename,
          productId: product.id,
        });
      }
      return res.send({ message: "Image added successfully" });
    } catch (error) {
      return res.status(400).send({
        message: error.message,
      });
    }
  }

  static async getMyProduct(req, res) {
    try {
      const manager = await Manager.findByPk(req.user.id);

      if (!manager) {
        return res.send({ message: "Manager not found" });
      }

      const products = await Product.findAll({
        where: {
          managerId: manager.userId,
        },
      });

      return res.send({
        products,
      });
    } catch (error) {
      return res.status(400).send({
        message: error.message,
      });
    }
  }

  static async deleteProduct(req, res) {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) {
        return res.send(false);
      }
      const arr = await Productimages.findAll({
        where: { productId: product.id },
      });
      for (const key in arr) {
        fs.unlink(join(__dirname, "..", "public/" + key.image), (err) => {
          if (err) throw err;
          console.log("path/file.txt was deleted");
        });
      }

      await Product.destroy({
        where: { id: req.params.id },
      });
      await Productimages.destroy({
        where: { productId: req.params.id },
      });

      return res.send(true);
    } catch (error) {
      return res.status(400).send({
        message: error.message,
      });
    }
  }
  static async deleteProductImage(req, res) {
    try {
      const image = await Productimages.findByPk(req.params.id);
      if (!image) {
        return res.send(false);
      }
      await Productimages.destroy({
        where: { id: req.params.id },
      });

      return res.send(true);
    } catch (error) {
      return res.status(400).send({
        message: error.message,
      });
    }
  }
}

module.exports = { ManagerController };
