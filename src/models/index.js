const sequelize = require("../config/database");
const User = require("./user.model");
const Document = require("./document.model");

// Associations
User.hasMany(Document, { foreignKey: "userId" });
Document.belongsTo(User, { foreignKey: "userId" });

module.exports = { sequelize, User, Document };
