const http = require('http');
const fs = require('fs');

const url = require('url') //用于解析数据

// GET 直接找Req.url

//创建一个server
let server = http.createServer((req, res) => {

    console.log(req.url)

    let { pathname, query } = url.parse(req.url, true)

    console.log(pathname, query)

    res.end()

})


server.listen(8080)