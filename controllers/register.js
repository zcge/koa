var app = require("../app.js")
let register = async(ctx, next) => {
    await ctx.render("register/index.html");
};

module.exports = {
    'GET /register': register
}