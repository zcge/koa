var app = require("../app.js");
var User = require("../models/User.js");

let login = async(ctx, next) => {
    await ctx.render("login/index.html");
};

let loginAction = async(ctx, next) => {
    let name = ctx.request.body.name;
    let password = ctx.request.body.password;
    //如果没有取到名字和密码，return
    if (!name && !password) {
        console.log(name, password);
        return;
    }
    let user = await User.findAll({
        'where': {
            user_name: name,
            user_password: password
        }
    });
    console.log(name, password, user);
    if (user.length >= 0) {
        ctx.session.user = user;
        ctx.redirect("/");
    } else {
        ctx.redirect("/login");
    }
};

module.exports = {
    'GET /login': login,
    'POST /loginAction': loginAction
}