const http = require('http');
const fs = require('fs');
const mysql = require('mysql');
const url = require('url');
const crypto = require('crypto');
const zlib = require('zlib');

function md5(str) {
    let obj = crypto.createHash('md5');
    obj.update(str);
    return obj.digest('hex');
}

function md5_2(str) {
    const _key = '12378giasib1uh12rh-=abjkbcj';
    return md5(md5(str) + _key);
}

let db = mysql.createPool({ host: 'localhost', user: 'root', password: '', port: 3306, database: 'test' })

let server = http.createServer((req, res) => {

    let { pathname, query } = url.parse(req.url, true);
    let { user, pass } = query;

    switch (pathname) {
        case '/reg':
            if (!user) {
                res.write('{"err": 1, "msg": "username can\'t be null"}');
                res.end();
            } else if (!pass) {
                res.write('{"err": 1, "msg": "password can\'t be null"}');
                res.end();
            } else if (!/^\w{4,16}$/.test(user)) {
                res.write('{"err": 1, "msg": "username is invaild"}');
                res.end()
            } else if (/['|"]/.test(pass)) {
                res.write('{"err": 1, "msg": "password is invaild"}');
                res.end();
            } else {
                db.query(`SELECT * from user_table  WHERE username='${user}'`, (err, data) => {
                    if (err) {
                        res.write('{"err": 1, "msg": "Connect database failed"}');
                        res.end();
                    } else if (data.length > 0) {
                        res.write('{"err": 1, "msg": "this username exsits"}');
                        res.end();
                    } else {
                        db.query(`INSERT INTO user_table(ID, username, password) VALUES(0, '${user}', ${pass})`, (err, data) => {
                            if (err) {
                                res.write('{"err":1,"msg":"databases error"}');
                                res.end();
                            } else {
                                res.write('{"err":0,"msg":"Register Success."}');
                                res.end();
                            }
                        })
                    }
                })

            }
            break;
        case '/login':
            //校验
            if (!user) {
                res.write('{"err": 1, "msg": "username can\'t be null"}');
                res.end();
            } else if (!pass) {
                res.write('{"err": 1, "msg": "password can\'t be null"}');
                res.end();
            } else if (!/^\w{4,16}$/.test(user)) {
                res.write('{"err": 1, "msg": "username is invaild"}');
                res.end();
            } else if (/['|"]/.test(pass)) {
                res.write('{"err": 1, "msg": "password is invaild"}');
                res.end();
            } else {
                db.query(`SELECT * FROM user_table WHERE username = '${user}'`, (err, data) => {
                    if (err) {
                        res.write('{"err": 1, "msg": "database error"}');
                        res.end();
                    } else if (data.length == 0) {
                        res.write('{"err": 1, "msg": "no this user"}');
                        res.end();
                    } else if (data[0].password != pass) {
                        res.write('{"err": 1, "msg": "username or password is incorrect"}');
                        res.end();
                    } else {
                        res.write('{"err": 0, "msg": "success"}');
                        res.end();
                    }
                });
            }
            break;

        default:

            let rs = fs.createReadStream(`www${ pathname }`);
            let gz = zlib.createGzip();

            res.setHeader('content-encoding', 'gzip');

            rs.pipe(gz).pipe(res);

            rs.on('error', err => {
                res.writeHeader(404);
                res.write('Not Found');
                res.end();
            })

            break;
    }

})

server.listen(8085);