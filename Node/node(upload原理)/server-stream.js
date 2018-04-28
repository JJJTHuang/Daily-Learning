const fs = require("fs");
const http = require("http");

let server = http.createServer((req, res) => {
    let rs = fs.createReadStream(`www${req.url}`);

    rs.pipe(res);

    //若通过流的方式传出有错则会被抓捕到
    rs.on('error', err => {
        res.writeHead(404) //返回状态码
        res.write('Not Found');
        res.end();
    })
})

server.listen(8080);