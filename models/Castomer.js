module.exports = (sequelize, Sequelize) => {
  const Castomer = sequelize.define("castomer", {
    userId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
  });
  return Castomer;
};
