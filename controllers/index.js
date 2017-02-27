var app = require("../app.js")
let home = async(ctx, next) => {
    if (ctx.session.user === undefined) {
        //未登录重定向到login页面
        // ctx.redirect("/login");
        await ctx.render("home", { user: undefined });
    } else {
        await ctx.render("home", { user: ctx.session.user[0] });
    }
};

module.exports = {
    'GET /': home
}