let app = require("../app.js"),
    User = require("../models/User.js");
// var captchapng = require('captchapng');
let login = async(ctx, next) => {
    await ctx.render("login/index.html");
};
var captchapng = require('captchapng');
let captchapngAction = async(ctx, next) => {
    var num = parseInt(Math.random() * 9000 + 1000);
    var p = new captchapng(80, 30, num);
    p.color(0, 0, 0, 0);
    p.color(80, 80, 80, 255);
    var img = p.getBase64();
    var imgbase64 = new Buffer(img, 'base64');
    ctx.session.verifycode = "" + num;
    ctx.response.type = 'image/png';
    ctx.response.body = imgbase64;
};
let loginAction = async(ctx, next) => {
    let name = ctx.request.body.name;
    let password = ctx.request.body.password;
    let verifycode = ctx.request.body.verifycode;
    if (verifycode !== ctx.session.verifycode) {
        ctx.redirect("/login");
        return;
    }
    //如果没有取到名字和密码，return
    if (!name && !password) {
        console.log(name, password);
        ctx.redirect("/login");
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
    'POST /loginAction': loginAction,
    'GET /captchapng': captchapngAction
}