/*  --2018-1-31-- */

const http = require('http');
const fs = require("fs");
const url = require('url');
const queryString = require('querystring');

// 还未接触数据库，暂时把前台传送的数据存于内存
let users = {
    // 'name': 'hehe',
    // 'password': '123123'
}

let server = http.createServer((req, res) => {

    //GET

    let { pathname, query } = url.parse(req.url, true);

    // POST

    let str = ""; //此处有bug，暂时简单处理着先

    req.on('data', data => {
        str += data;
    })

    req.on('end', () => {
        let postData = queryString.parse(str)
    })

    // 简单模拟用户注册登录，静态资源的访问

    let { user, pass } = query;

    switch (pathname) {
        case '/login':
            if (!user) {
                res.write('{"err": 1, "msg": "user is required"}');
            } else if (!pass) {
                res.write('{"err": 1, "msg": "pass is required"}');
            } else if (!/^\w{8,32}$/.test(user)) {
                res.write('{"err": 1, "msg": "invaild username"}');
            } else if (/^['|"]$/.test(pass)) {
                res.write('{"err": 1, "msg": "invaild password"}');
            } else if (!users[user]) {
                res.write('{"err": 1, "msg": "no this user"}');
            } else if (users[user] != pass) {
                res.write('{"err": 1, "msg": "username or password is incorrect"}');
            } else {
                res.write('{"err": 0, "msg": "login success"}');
            }
            res.end();
            break;
        case '/reg':
            if (!user) {
                res.write('{"err":1,"msg":"user is required"}')
            } else if (!pass) {
                res.write('{"err":1,"msg":"password is required"}')
            } else if (!/^\w{8,32}$/.test(user)) {
                res.write('{"err": 1, "msg": "invaild username"}');
            } else if (/^['|"]$/.test(pass)) {
                res.write('{"err": 1, "msg": "invaild password"}');
            } else if (users[user]) {
                res.write('{"err": 1, "msg": "user already exists"}');
            } else {
                res.write('{"err": 0, "msg": "reg success"}');
            }
            users[user] = pass;
            res.end();
            break;
        default: //文件默认放在www文件夹下
            fs.readFile(`www${pathname}`, (err, data) => {
                if (err) {
                    res.writeHeader(404);
                    res.write('Not Found.');
                } else {
                    res.write(data);
                }

                res.end();

            })

    }

})

server.listen(8080)