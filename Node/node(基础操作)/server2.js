const http = require('http');
const fs = require('fs');

let server = http.createServer((req, res) => {
    fs.readFile(`www${req.url}`, (err, data) => {
        if (err) {
            res.writeHeader('404') //给浏览者看的（状态码存在于头部）
            res.write(err) //直接向浏览器输出内容
        } else {
            res.write(data);
        }
        res.end();
    })
})

server.listen(8080)