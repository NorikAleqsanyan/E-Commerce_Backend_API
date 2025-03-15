const { Category, Subcategory, User } = require("../models");
const { join } = require("path");
const fs = require("fs");
const {
  schemaCategoryCreate,
  schemaCategoryUpdate,
  schemaSubCategoryCreate,
  schemaSubCategoryUpdate,
} = require("../schema");

class AdminController {
  static async addCategory(req, res) {
    try {
      const { error, value } = schemaCategoryCreate.validate(req.body);
      if (error) {
        return res.status(400).send({ value, error: error.details });
      } else {
        if (!req.file) {
          return res.send({ message: "image is not found" });
        }
        const { name } = req.body;
        const cat = await Category.findOne({
          where: { name },
        });
        if (cat) {
          fs.unlink(
            join(__dirname, "..", "public/" + req.file.filename),
            (err) => {
              if (err) throw err;
              console.log("path/file.txt was deleted");
            }
          );
          return res.send({ message: name + " has already" });
        }
        return res.send(
          await Category.create({ name, image: req.file.filename })
        );
      }
    } catch (error) {
      return res.status(400).send({
        message: error.message,
      });
    }
  }

  static async addSubCategory(req, res) {
    try {
      const { error, value } = schemaSubCategoryCreate.validate(req.body);
      if (error) {
        res.send({ value, error: error.details });
      } else {
        const { name, categoryId } = req.body;
        const scat = await Subcategory.findOne({
          where: { name, categoryId },
        });
        if (scat) {
          return res.send({ message: "name and Category has already" });
        }
        return res.send(await Subcategory.create({ name, categoryId }));
      }
    } catch (error) {
      return res.status(400).send({
        message: error.message,
      });
    }
  }

  static async updateCategory(req, res) {
    try {
      const cat = await Category.findByPk(req.params.id);
      if (!cat) {
        return res.send({ message: "Category not found!" });
      }
      const { error, value } = schemaCategoryUpdate.validate(req.body);
      if (error) {
        return res.send({ value, error: error.details });
      }
      const { name } = req.body;
      const cat1 = await Category.findOne({
        where: { name },
      });
      if (cat1) {
        return res.send({ message: name + " has already" });
      }
      await Category.update(
        {
          name: name ? name : cat.name,
          file: req.file ? req.file.filename : cat.image,
        },
        { where: { id: cat.id } }
      );
      res.send(await Category.findByPk(req.params.id));
    } catch (error) {
      return res.status(400).send({
        message: error.message,
      });
    }
  }

  static async updateSubCategory(req, res) {
    try {
      const scat = await Subcategory.findByPk(req.params.id);
      if (!scat) {
        return res.send({ message: "SubCategory not found!" });
      }
      const { error, value } = schemaSubCategoryUpdate.validate(req.body);
      if (error) {
        return res.send({ value, error: error.details });
      }
      const { name, categoryId } = req.body;
      const scat1 = await Subcategory.findOne({
        where: { name },
      });

      if (scat1 && categoryId == scat1.categoryId) {
        return res.send({ message: name + " categoryId has already" });
      }
      if (categoryId) {
        const cat = await Category.findByPk(categoryId);
        if (!cat) {
          return res.status(400).send({ message: " category not found" });
        }
      }
      await Subcategory.update(
        {
          name: name ? name : scat.name,
          categoryId: categoryId ? categoryId : scat.categoryId,
        },
        { where: { id: scat.id } }
      );
      res.send(await Subcategory.findByPk(req.params.id));
    } catch (error) {
      return res.status(400).send({
        message: error.message,
      });
    }
  }

  static async deleteCategory(req, res) {
    try {
      const category = await Category.findByPk(req.params.id);
      if (!category) {
        return res.send(false);
      }
      fs.unlink(join(__dirname, "..", "public/" + category.image), (err) => {
        if (err) throw err;
        console.log("path/file.txt was deleted");
      });
      await Category.destroy({
        where: { id: req.params.id },
      });

      return res.send(true);
    } catch (error) {
      return res.status(400).send({
        message: error.message,
      });
    }
  }

  static async deleteSubCategory(req, res) {
    try {
      const subcategory = await Subcategory.findByPk(req.params.id);
      if (!subcategory) {
        return res.send(false);
      }
      await Subcategory.destroy({
        where: { id: req.params.id },
      });
      return res.send(true);
    } catch (error) {
      return res.status(400).send({
        message: error.message,
      });
    }
  }


  static async blockUserById(req, res) {
    try {
      if (req.user.type != 2) {
        return res.send({ message: "Admin not found!" });
      }

      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.send({ message: "User not found!" });
      }

      await User.update(
        { isBlocked: user.isBlocked == 0 ? 1 : 0 },
        {
          where: { id: user.id },
        }
      );
      return res.send({
        message: `User ${
          user.isBlocked ? "unblocked" : "blocked"
        } successfully`,
        user,
      });
    } catch (error) {
      return res.status(400).send({
        message: error.message,
      });
    }
  }

  static async deleteUserById(req, res) {
    try {
      if (req.user.type != 2) {
        return res.send({ message: "Admin not found!" });
      }

      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.send({ message: "User not found!" });
      }
      await User.destroy({where:{id:user.id}});

      return res.send({ message: "User deleted successfully" });
    } catch (error) {
      return res.status(400).send({
        message: error.message,
      });
    }
  }
}

module.exports = { AdminController };
