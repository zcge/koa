var app = require("../app.js")
let home = async(ctx, next) => {
    if (ctx.session.user === undefined) {
        await ctx.render("index", { user: undefined });
    } else {
        await ctx.render("index", { user: ctx.session.user[0] });
    }
};

module.exports = {
    'GET /': home
}