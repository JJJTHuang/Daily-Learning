const koa = require('koa')
const router = require('koa-router')

let server = new koa()
server.listen(8080)

let r1 = router()
server.use(r1.routes())

// server.use(async ctx =>{

//     console.log(ctx.response)

//     ctx.response.body = 'Hello!'
// })

r1.get('/aaa/:name/:args', async(ctx,next)=>{
    console.log(ctx.params)

    ctx.response.body = 'aaa';
})