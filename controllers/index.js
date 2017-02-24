var app = require("../app.js")
let home = async(ctx, next) => {
    if (ctx.session.user === undefined) {
        //未登录重定向到login页面
        ctx.redirect("/login");
    } else {
        //否则渲染主页面
        await ctx.render("home", ctx.session.user);
    }
};

module.exports = {
    'GET /': home
}