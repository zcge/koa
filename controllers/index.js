var app = require("../app.js")
let home =  async (ctx, next)=> {
    await ctx.render("home",{
        name:"韩少"
    });
};

module.exports = {
    'GET /': home
}