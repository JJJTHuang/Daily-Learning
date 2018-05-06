const koa = require('koa')
const session = require('koa-session')

let server = new koa()
server.listen(8080)

//此处这样做的目的是提高安全性,我们可以将.keys文件设置为仅自己更查看与更改的文件
//keys是一个数组,每次会进行循环比对，酱紫可增加破甲难度，相对提高用户安全
server.keys = require('./.keys')

server.use(session({},server))

server.use(async ctx=>{
    console.log(ctx.session)

    if(!ctx.session['count']){
        ctx.session['count'] = 1
    }else{
        ctx.session['count']++
    }

    ctx.response.body = `这是你第${ctx.session.count}次来访`
})