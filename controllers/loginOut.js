var app = require("../app.js");

let loginOut = async(ctx, next) => {
    ctx.session = {};
    ctx.redirect("/");
};

module.exports = {
    'GET /loginOut': loginOut
}