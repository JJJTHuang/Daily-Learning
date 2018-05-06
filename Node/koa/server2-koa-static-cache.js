const koa = require('koa')
const staticCache = require('koa-static-cache')
const pathlib = require('path')

let server = new koa()
server.listen(8080)

let www = pathlib.resolve('www')
console.log(www)
server.use(staticCache(www))