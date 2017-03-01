const db = require('../db');
const Sequelize = require('sequelize');
var Pages = db.defineModel('pages', {
    id: { type: Sequelize.BIGINT(11), autoIncrement: true, primaryKey: true, unique: true },
    user_id: { type: Sequelize.BIGINT(11), allowNull: false },
    page_title: { type: Sequelize.STRING(100), coment: "文章标题", allowNull: false },
    page_url: { type: Sequelize.STRING(100), coment: "文章地址", allowNull: false }
});
module.exports = Pages;