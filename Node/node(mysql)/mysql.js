const mysql = require('mysql');

let db = mysql.createPool({ host: 'localhost', user: 'root', password: '', port: 3306, database: 'test' })

db.query(`INSERT INTO user_table (ID,username,password) VALUES(0,'hello','123456');`, (err, data) => {
    if (err) {
        console.log('connect failed', err)
    } else {
        console.log(data);
    }
})