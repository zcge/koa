var app = require("../app.js")
let login =  async (ctx, next)=> {
    await ctx.render("login/index.html",{
        name:"韩少"
    });
};

module.exports = {
    'GET /login': login
}