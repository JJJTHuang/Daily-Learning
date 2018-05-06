const koa = require('koa')
const betterbody = require('koa-better-body')
const convert = require('koa-convert')
const pathlib = require('path')

let server = new koa()
server.listen(8080)

server.use(convert(betterbody({
    uploadDir : pathlib.resolve('upload')
})))

console.log(pathlib.resolve('upload'))

server.use(async (ctx,next)=>{
    console.log(ctx.request)
    console.log(ctx.request.fields)
    console.log(ctx.request.files)
})