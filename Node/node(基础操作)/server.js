const http = require("http");

let server = http.createServer((req, res) => {
    console.log(req.url);

    // res.write(req.url);

    //服务停止
    res.end();
})

//监听。
server.listen(8980)