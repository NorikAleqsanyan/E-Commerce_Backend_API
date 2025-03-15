module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("order", {
        productId: Sequelize.INTEGER,
        castomerId: Sequelize.INTEGER,
        total: Sequelize.STRING,
        name: Sequelize.STRING,
    });
    return Order;
}