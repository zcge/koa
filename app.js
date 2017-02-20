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

app.use(views(__dirname+ '/views', { map: {html: 'nunjucks' }}))
app.use(convert(bodyparser));
app.use(convert(json()));
app.use(convert(logger()));

app.use(require('koa-static')(__dirname + '/public'));





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