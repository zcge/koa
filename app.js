const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const views = require('koa-views');
const co = require('co');
const convert = require('koa-convert');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
const logger = require('koa-logger');
const path = require('path');
const port = 3000;
const controller = require('./controller');
const config = require("./config");
const session = require("koa-session2");
// var http = require('http');
// var captchapng = require('captchapng');
// http.createServer(function(request, response) {
//     if (request.url == '/captcha.png') {
//         var num = parseInt(Math.random() * 9000 + 1000);
//         var p = new captchapng(80, 30, num); // width,height,numeric captcha
//         p.color(0, 0, 0, 0); // First color: background (red, green, blue, alpha)
//         p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)
//         console.log(num);
//         var img = p.getBase64();
//         var imgbase64 = new Buffer(img, 'base64');
//         response.writeHead(200, {
//             'Content-Type': 'image/png'
//         });
//         response.end(imgbase64);
//     } else response.end('');
// }).listen(8181);

app.use(views(__dirname + '/views', { map: { html: 'nunjucks' } }))
app.use(convert(bodyparser));
app.use(convert(json()));
app.use(convert(logger()));

app.use(require('koa-static')(__dirname + '/public'));

app.use(session({
    key: "SESSIONID", //default "koa:sess"
    maxAge: 500000000 //设置session超时时间
}))



// logger
app.use(async(ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.use(controller());

app.on('error', function(err, ctx) {
    console.log(err)
    logger.error('server error', err, ctx);
});

app.listen(port, function() {
    console.info("监听端口号:" + port + "成功");
})

module.exports = app;