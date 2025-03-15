module.exports = (sequelize, Sequelize) => {
  const Feedback = sequelize.define("feedback", {
    orderId: Sequelize.INTEGER,
    text: Sequelize.STRING,
  });
  return Feedback;
};
