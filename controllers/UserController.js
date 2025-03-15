const { Category, Subcategory, User, Product } = require("../models");

class UserController {
  static async getUser(req, res) {
    try {
      if (!req.user) {
        return res.send({ message: "User not found!" });
      }

      return res.send({ user: req.user });
    } catch (error) {
      console.error(error.message);
      return res.send({
        message: "An error occurred while retrieving user data.",
      });
    }
  }
  static async getCategory(req, res) {
    try {
      const categories = await Category.findAll();
      return res.send({
        categories,
      });
    } catch (error) {
      console.error(error.message);
      return res.send({
        message: "An error occurred while retrieving categories.",
      });
    }
  }
  static async getProduct(req, res) {
    try {
      const product = await Product.findAll();
      return res.send({
        product,
      });
    } catch (error) {
      return res.send({
        message: "An error occurred while retrieving product.",
      });
    }
  }
  static async getCategoryById(req, res) {
    try {
      const category = await Category.findByPk(req.params.id, {
        include: {
          model: Subcategory,
        },
      });
      if (!category) {
        return res.send({ message: "Category not found!" });
      }
      return res.send({ category });
    } catch (error) {
      return res.send({
        message: error.message,
      });
    }
  }
  static async getProductById(req, res) {
    try {
      const prod = await Product.findByPk(req.params.id,);
      if (!prod) {
        return res.send({ message: "Product not found!" });
      }
      return res.send({ prod });
    } catch (error) {
      return res.send({
        message: error.message,
      });
    }
  }
  static async getSubcategory(req, res) {
    try {
      const subcategories = await Subcategory.findAll();
      return res.send({
        subcategories,
      });
    } catch (error) {
      return res.send({
        message: "An error occurred while retrieving subcategories.",
      });
    }
  }
  static async getSubcategoryById(req, res) {
    try {
      const Subcategory = await Subcategory.findByPk(req.params.id);
      if (!Subcategory) {
        return res.send({ message: "SubCategory not found!" });
      }
      return res.send({ Subcategory });
    } catch (error) {
      return res.send({
        message: "An error occurred while retrieving the subcategory.",
      });
    }
  }

  static async updateUser(req, res) {
    try {
      const { name, surname } = req.body;

      if (!name || !surname) {
        return res.send({ message: "Name and surname are required!" });
      }

      const user = await User.findByPk(req.user.id);

      if (!user) {
        return res.send({ message: "User not found!" });
      }
      User.update({
        name: name,
        surname: surname,
      });
      return res.send({ message: "User updated successfully", user });
    } catch (error) {
      return res.send({
        message: "An error occurred while updating user data.",
      });
    }
  }
  static async updateUserImage(req, res) {
    try {
      const { image } = req.body;

      if (!image) {
        return res.send({ message: "Image are required!" });
      }

      const user = await User.findByPk(req.user.id);

      if (!user) {
        return res.send({ message: "User not found!" });
      }
      await User.update({
        image: image
      });
      return res.send({ message: "User updated successfully", user });
    } catch (error) {
      return res.send({
        message: "An error occurred while updating user data.",
      });
    }
  }
  static async updateUserPassword(req, res) {
    try {
      const { oldPassword, Password, confimPassword } = req.body;

      if (!oldPassword || Password || confimPassword) {
        return res.send({ message: "Password are required!" });
      }

      const user = await User.findByPk(req.user.id);

      if (!user) {
        return res.send({ message: "User not found!" });
      }

      if (user.password !== oldPassword) {
        return res.send({ message: "Old password is incorrect!" });
      }

      if (Password !== confimPassword) {
        return res.send({
          message: "New password and confirmation do not match!",
        });
      }

      User.update({
        password: Password,
      });

      return res.send({ message: "User updated successfully", user });
    } catch (error) {
      console.error(error.message);
      return res.send({
        message: "An error occurred while updating user data.",
      });
    }
  }

  static async deleteUser(req, res) {
    try {
      if (req.user.type !== 2) {
        return res.send({
          message: "Forbidden: You don't have permission to delete this user!",
        });
      }

      const user = await User.findByPk(req.user.id);

      if (!user) {
        return res.send({ message: "User not found!" });
      }

      await user.destroy();

      return res.send({ message: "User deleted successfully" });
    } catch (error) {
      console.error(error.message);
      return res.send({
        message: "An error occurred while deleting user data.",
      });
    }
  }
}

module.exports = { UserController };
