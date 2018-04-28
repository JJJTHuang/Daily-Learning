const http = require('http');
const fs = require('fs');
const queryString = require('querystring')


//创建一个server
let server = http.createServer((req, res) => {

    let str = '';

    // 监听分段送来的的数据，每当就有数据传过来就接上
    //'data'是作者起的，名字其实可以随便定义
    req.on('data', data => {
        str += data;
    })

    // 传输结束回调
    req.on('end', () => {
        let postData = queryString.parse(str)

        console.log(postData)
    })

    res.end();
})


server.listen(8980)