module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("product", {
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        price: Sequelize.INTEGER,
        count: Sequelize.INTEGER,
        subcategoryId:Sequelize.INTEGER,
        managerId:Sequelize.INTEGER,  
    });
    return Product;
}

