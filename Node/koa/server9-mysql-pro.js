const koa = require('koa')
const mysql = require('mysql-pro')
const router = require('koa-router')

const db = new mysql({
    mysql:{
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: 'test'
    }
})

const server = new koa()
server.listen(8080)

let r1 = router()
server.use(r1.routes())

r1.get('/user',async(ctx,next)=>{
    await db.startTransaction()
    let data = await db.executeTransaction("SELECT * FROM user_table");
    await db.stopTransaction();

    console.log(data)

    ctx.response.body = data
})