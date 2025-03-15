module.exports = (sequelize, Sequelize) => {
    const Productimages = sequelize.define("productimages", {
      productId: Sequelize.INTEGER,
      image: Sequelize.STRING,
    });
    return Productimages;
  };
  