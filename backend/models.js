const Sequelize = require("sequelize");
const sequelize = require("./db");

const ExpenseModel = sequelize.define("expense", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  amount: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  items: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = ExpenseModel;
