module.exports = (sequelize, Sequelize) => {
  const Manager = sequelize.define("manager", {
    userId: {
      type:Sequelize.INTEGER,
      primaryKey:true
    },
    phoneNumber: Sequelize.STRING,
    description: Sequelize.STRING,
  });
  return Manager;
};
