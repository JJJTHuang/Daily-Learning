const koa = require('koa')
const mysql = require('koa-mysql')
const convert = require('koa-convert')

let server = new koa()
server.listen(8080)

const db = mysql.createPool({
    host: 'localhost',
    post: 3306,
    user: 'root',
    password: '',
    database: 'test'
})

//由于koa升级的时候，对应的MySQL中间件并未升级，也就是说只能通过generator才可使用koa-mysql,所以需换一个数据库中间件
server.use(function *(ctx){
    let data = yield db.query('Select * from user_table')

    console.log(data)
})

// server.use(async (ctx, next) => {
//     try {
//         let data = await convert(db.query)('Select * from user_table')
//         ctx.response.body = data
//     }
//     catch(e){
//         this.status = 500
//     }
// })