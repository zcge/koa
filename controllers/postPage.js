let fs = require("fs");
let Pages = require("../models/Pages.js");
let postPage = async(ctx, next) => {
    if (!ctx.session.user) {
        ctx.redirect('/login');
    } else {
        await ctx.render("postPage/index.html");
    }
};

let postPageAction = async(ctx, next) => {
    //用户登录了
    if (ctx.session.user) {
        let body = ctx.request.body;
        let title = body.title;
        let content = body.content;
        let json = {
            title: title,
            content: content
        }
        let user = ctx.session.user[0];
        let url = "/pages/" + ctx.session.user[0].user_name + "_" + title + ".js";

        await fs.writeFile("./public" + url, "var article = " + JSON.stringify(json),
            function(err) {
                if (err) {
                    console.log(err);
                    ctx.redirect('/postPage');
                    return;
                } else {
                    console.log('write ok.');
                }
            }
        );
        await Pages.create({
            user_id: user.id,
            page_url: url,
            page_title: title
        }).then(function(result) {
            console.log(result)
            ctx.redirect("/");
        }).catch(function(err) {
            console.log('inserted error');
            console.log(err.message);
        });
    } else {
        console.log("非法操作,用户还没有登录...");
        ctx.redirect('/login');
        return;
    }
};
module.exports = {
    'GET /postPage': postPage,
    'POST /postPageAction': postPageAction
}