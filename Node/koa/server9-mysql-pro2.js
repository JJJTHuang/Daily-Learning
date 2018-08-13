const koa = require('koa')
// mysql-pro
const mysql = require('mysql-pro')
const router = require('koa-router')

const db = new mysql({
    mysql: {
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

r1.get('/user', async (ctx, next) => {

    let id = ctx.query.id
    
    console.log(ctx.query)

    try{

        // Transaction 事务(要么都发生，要么都不发生) ACID四个特性
        await db.startTransaction()
        let data = await db.executeTransaction("SELECT * FROM user_table where id = ?",[id]);
        await db.stopTransaction();

        ctx.response.body = data
    }catch(e){
        ctx.response.body = '数据库正在维护中，请稍候重试';
    }
    
})