const koa =  require('koa')
const pathlib = require('path')
const ejs = require('koa-ejs')

let server = new koa()
server.listen(8080)

ejs(server, {
    root : pathlib.resolve('templates'),
    layout : false,
    viewExt : 'ejs'
})

server.use(async ctx=>{
    //模板文件渲染为异步操作，需要await 
    await ctx.render('1',{
        name : "hahah",
        age : 18
    })

    ctx.render('2')

    ctx.render('1')

    ctx.cookies.set('aba',55)
})