const mysql = require('mysql')
const config = require('./config')
const crypto = require('crypto')

let db = mysql.createPool({
    host: config.db_host,
    post: config.db_port,
    user: config.db_user,
    password: config.db_pass,
    database: config.db_name
})

let user = 'user1' , pass = '123456'
let sha = crypto.createHash('sha256')
sha.update(pass + config.salt_key)
pass = sha.digest('hex')
console.log(pass)


db.query(`insert into user_table (ID,username,password) values(1,'${user}','${pass}')`, (err, result) => {
    if(err){
        console.log(err)
    }else{
        console.log(result)
    }
})

// db.query(`select * from user_table`,(err,result)=>{
//     if(err){
//         console.log(err)
//     }else{
//         console.log(result)
//     }
// })