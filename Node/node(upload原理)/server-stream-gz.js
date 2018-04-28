const fs = require("fs");
const http = require("http");
const zlib = require("zlib");

let server = http.createServer((req, res) => {
    let rs = fs.createReadStream(`www${req.url}`);

    //此处若没有setHeader，由于传输过来的是二进制数据，浏览器会把html直接下载
    res.setHeader('content-encoding', 'gzip');

    // rs.pipe(res);

    let gz = zlib.createGzip();
    rs.pipe(gz).pipe(res);

    //若通过流的方式传出有错则会被抓捕到
    rs.on('error', err => {
        res.writeHead(404) //返回状态码
        res.write('Not Found');

        res.end();
    })
})

server.listen(8080);