let Pages = require("../models/Pages.js");
let TAG = "home-controller";
let home = async(ctx, next) => {
    if (!ctx.session.user) {
        ctx.redirect("/login");
    } else {
        let pages = await Pages.findAll({
            'where': {
                user_id: ctx.session.user[0].id
            }
        });
        let arr = [];
        for (var i in pages) {
            arr.push(pages[i].dataValues);
        }
        console.log(TAG, pages, arr);

        await ctx.render("home/index.html", { pages: arr })
    }


};
module.exports = {
    "GET /home": home
}