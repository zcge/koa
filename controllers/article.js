let article = async(ctx, next) => {
    let url = ctx.request.query.url;
    let title = ctx.request.query.title;
    await ctx.render("article/index.html", {
        page: {
            page_url: url,
            page_title: title
        }
    });
};
module.exports = {
    "GET /article": article
}