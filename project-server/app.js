const Koa = require('koa');
const static = require('koa-static');

const log4js = require('./utils/logger')
const log = log4js.getLogger('app.js')

const staticPath = './public';

const app = new Koa();

app.use(static(__dirname + '/' +  staticPath));
app.listen(8080);

log.info('开始监听8080端口');