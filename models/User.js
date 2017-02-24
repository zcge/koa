const db = require('../db');
const Sequelize = require('sequelize');
var User = db.defineModel('users', {
    id: Sequelize.STRING(100),
    user_name: Sequelize.STRING(100),
    user_password: Sequelize.STRING(100)
});
module.exports = User;