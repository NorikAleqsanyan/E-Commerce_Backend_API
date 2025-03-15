const express = require("express");
const { CastomerController } = require("../controllers/CastomerController");
const castomer = express.Router();

castomer.get("/wishlist", CastomerController.getWishlist);
castomer.get("/card", CastomerController.getCard);

castomer.delete("/wishlist/:id", CastomerController.deleteWishlistById);
castomer.delete("/card/:id", CastomerController.deleteCardById);
module.exports = { castomer };
