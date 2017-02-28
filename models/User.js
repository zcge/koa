const db = require('../db');
const Sequelize = require('sequelize');
var User = db.defineModel('users', {
    id: { type: Sequelize.BIGINT(11), autoIncrement: true, primaryKey: true, unique: true },
    user_name: { type: Sequelize.STRING(100), comment: '姓名', allowNull: false, unique: true },
    user_password: { type: Sequelize.STRING(100), comment: '姓名', allowNull: false }
});
module.exports = User;