const fs = require('fs');
const http = require('http');
const url = require('url');

let server = http.createServer((req, res) => {

    let { pathname } = url.parse(req.url);

    fs.stat(`www${pathname}`, (err, stat) => {

        if (err) {
            res.setHeader(404);
            res.write('Not Found');
            res.end()
        } else {

            if (req.headers['if-modified-since']) {

                let oDate = new Date(req.headers['if-modified-since']);

                let time_client = Math.floor(oDate.getTime() / 1000); //浏览器记录的上一次文件修改的时间

                let time_server = Math.floor(stat.mtime.getTime() / 1000); //文件最后一次修改的时间

                if (time_server < time_client) {
                    sendFiletoClient();
                } else {
                    res.writeHeader(304);
                    res.write('Not Modified');
                    res.end();
                }
            } else {
                sendFileToClient();
            }

        }

        function sendFileToClient() {
            //发送
            let rs = fs.createReadStream(`www${pathname}`);

            res.setHeader('Last-Modified', stat.mtime.toGMTString());

            //输出
            rs.pipe(res);

            rs.on('error', err => {
                res.writeHeader(404);
                res.write('Not Found');
                res.end();
            });
        }

    });

})

server.listen(8080);