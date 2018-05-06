const koa = require('koa')
const router = require('koa-router')

let server = new koa()
server.listen(8080)

let r1 = router()
server.use(r1.routes())

r1.get('/aaa', async(ctx,next)=>{

    //ctx.req , ctx.res 都是原生对象

    //ctx.request , ctx.response 都是封装对象

    console.log(ctx.res)

    // ctx.response.body = '<h1>同学你好。<h1>'
    ctx.response.status = 403
})