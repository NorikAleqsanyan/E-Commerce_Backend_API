const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("", "root", "", {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
});

const User = require("./User")(sequelize, Sequelize);
const Card = require("./Card")(sequelize, Sequelize);
const Category = require("./Category")(sequelize, Sequelize);
const Feedback = require("./Feedback")(sequelize, Sequelize);
const Order = require("./Order")(sequelize, Sequelize);
const Product = require("./Product")(sequelize, Sequelize);
const Productimages = require("./Productimages")(sequelize, Sequelize);
const Subcategory = require("./Subcategory")(sequelize, Sequelize);
const Wishlist = require("./Wishlist")(sequelize, Sequelize);
const Manager = require("./Manager")(sequelize, Sequelize);
const Castomer = require("./Castomer")(sequelize, Sequelize);

Manager.belongsTo(User, {
  foreignKey: "userId",
  onupdate: "cascade",
  ondelete: "cascade",
});

Castomer.belongsTo(User, {
  foreignKey: "userId",
  onupdate: "cascade",
  ondelete: "cascade",
});

Card.belongsTo(Product, {
  foreignKey: "productId",
  onupdate: "cascade",
  ondelete: "cascade",
});
Card.belongsTo(Castomer, {
  foreignKey: "castomerId",
  onupdate: "cascade",
  ondelete: "cascade",
});

Feedback.belongsTo(Order, {
  foreignKey: "orderId",
  onupdate: "cascade",
  ondelete: "cascade",
});
Order.belongsTo(Castomer, {
  foreignKey: "castomerId",
  onupdate: "cascade",
  ondelete: "cascade",
});
Order.belongsTo(Product, {
  foreignKey: "productId",
  onupdate: "cascade",
  ondelete: "cascade",
});
Product.belongsTo(Manager, {
  foreignKey: "managerId",
  onupdate: "cascade",
  ondelete: "cascade",
});
Productimages.belongsTo(Product, {
  foreignKey: "productId",
  onupdate: "cascade",
  ondelete: "cascade",
});
Subcategory.belongsTo(Category, {
  foreignKey: "categoryId",
  onupdate: "cascade",
  ondelete: "cascade",
});
Product.belongsTo(Subcategory, {
  foreignKey: "subcategoryId",
  onupdate: "cascade",
  ondelete: "cascade",
});

Wishlist.belongsTo(Castomer, {
  foreignKey: "castomerId",
  onupdate: "cascade",
  ondelete: "cascade",
});
Wishlist.belongsTo(Product, {
  foreignKey: "productId",
  onupdate: "cascade",
  ondelete: "cascade",
});

User.hasOne(Manager, { foreignKey: "userId" });
User.hasOne(Castomer, { foreignKey: "userId" });

Product.hasMany(Card, { foreignKey: "productId" });
Product.hasMany(Productimages, { foreignKey: "productId" });
Product.hasMany(Wishlist, { foreignKey: "productId" });
Product.hasMany(Order, { foreignKey: "productId" });

Castomer.hasMany(Card, { foreignKey: "castomerId" });
Castomer.hasMany(Order, { foreignKey: "castomerId" });
Castomer.hasMany(Subcategory, { foreignKey: "castomerId" });
Castomer.hasMany(Wishlist, { foreignKey: "castomerId" });

Order.hasMany(Feedback, { foreignKey: "orderId" });
Manager.hasMany(Product, { foreignKey: "managerId" });
Subcategory.hasMany(Product, { foreignKey: "subcategoryId" });
Category.hasMany(Subcategory, { foreignKey: "categoryId" });

sequelize.sync();
module.exports = {
  User,
  sequelize,
  Card,
  Category,
  Feedback,
  Order,
  Product,
  Productimages,
  Subcategory,
  Wishlist,
  Manager,
  Castomer,
};
