module.exports = (sequelize, Sequelize) => {
  const Subcategory = sequelize.define("subcategory", {
    categoryId: Sequelize.INTEGER,
    name: Sequelize.STRING,
  });
  return Subcategory;
};
