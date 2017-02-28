const Sequelize = require('sequelize');
const config = require('./config');
console.log('init sequelize...config:', config);
var sequelize = new Sequelize(config.mysql.database, config.mysql.username, config.mysql.password, {
    host: config.mysql.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});

function defineModel(name, attributes) {
    return sequelize.define(name, attributes, {
        tableName: name,
        timestamps: false,
        hooks: {

        }
    });
}
module.exports = {
    defineModel: defineModel
};