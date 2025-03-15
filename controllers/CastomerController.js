const { Card, Wishlist } = require("../models");

class CastomerController {
  static async getWishlist(req, res) {
    try {
      if (!req.wishlist) {
        return res.send({ message: "Wishlist not found!" });
      }
      return res.send({ wishlist: req.wishlist });
    } catch (error) {
      console.error(error.message);
      return res.send({
        message: "An error occurred while retrieving Wishlist data.",
      });
    }
  }
  static async getCard(req, res) {
    try {
      if (!req.card) {
        return res.send({ message: "Card not found!" });
      }

      return res.send({ card: req.card });
    } catch (error) {
      console.error(error.message);
      return res.send({
        message: "An error occurred while retrieving Card data.",
      });
    }
  }


  static async deleteCardById(req, res) {
    try {
      const card = await Card.findByPk(req.params.id);

      if (!card) {
        return res.send({ message: "Card not found!" });
      }

      await card.destroy();

      return res.send({ message: "Card deleted successfully" });
    } catch (error) {
      console.error(error.message);
      return res.send({
        message: "An error occurred while deleting Card data.",
      });
    }
  }
  static async deleteWishlistById(req, res) {
    try {
      const wish = await Wishlist.findByPk(req.params.id);

      if (!wish) {
        return res.send({ message: "Wishlist not found!" });
      }

      await wish.destroy();

      return res.send({ message: "Wishlist deleted successfully" });
    } catch (error) {
      console.error(error.message);
      return res.send({
        message: "An error occurred while deleting Wishlist data.",
      });
    }
  }
  
}

module.exports = { CastomerController };
