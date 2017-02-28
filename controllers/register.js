let User = require("../models/User.js");
let register = async(ctx, next) => {
    await ctx.render("register/index.html");
};
let registerAction = async(ctx, next) => {
    let username = ctx.request.body.username;
    let password = ctx.request.body.password;
    let password2 = ctx.request.body.password2;
    if (!username || !password || !password2) {
        return;
    }
    await User.create({
        user_name: username,
        user_password: password
    }).then(function(result) {
        console.log(111111, result);
        ctx.session.user = [{
            user_name: username,
            user_password: password
        }];
        ctx.redirect("/");
    }).catch(function(err) {
        console.log('inserted error');
        console.log(err.message);
        ctx.redirect("/register");
    });
};

module.exports = {
    'GET /register': register,
    'POST /registerAction': registerAction
}