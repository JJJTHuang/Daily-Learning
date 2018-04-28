const fs = require('fs');
const http = require('http');
const url = require("url");

let server = http.createServer((req, res) => {

    let { pathname } = url.parse(req.url);

    //获取文件日期
    fs.stat(`www${pathname}`, (err, stat) => {

        if (err) {
            res.setHeader(404);

            res.write('Not Found');

            res.end();
        } else {

            if (req.headers['if-modified-since']) {

                let oDate = new Date(req.headers['if-modified-since']); //最新时间

                let time_cilent = Math.floor(oDate.getTime() / 1000);

                let time_server = Math.floor(stat.mtime.getTime() / 1000);

                if (time_cilent < time_server) {
                    sendFiletoClient();
                } else {
                    res.writeHeader(304);

                    res.write('Not Modified');

                    res.end();
                }

            } else {
                sendFiletoClient();
            }
        }

        function sendFiletoClient() {
            let rs = fs.createReadStream(`www${pathname}`);
            res.setHeader('Last-Modified', stat.mtime.toGMTString()); //设置响应头的时间

            rs.pipe(res);

            rs.on('error', err => {
                res.writeHeader(404);

                res.write('Not Found');

                res.end();
            })
        }
    })

})

server.listen(8080)