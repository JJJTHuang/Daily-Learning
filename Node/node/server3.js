const http = require('http')
const fs = require('fs')
const zlib = require('zlib')
const cluster = require('cluster')//进程分叉
const os = require('os')

if (cluster.isMaster) {
    for (let i = 0; i < os.cpus().length; i++) {
        //进程分裂
        cluster.fork()
    }
} else {
    let server = http.createServer((req, res) => {

        let rs = fs.createReadStream(`www${req.url}`)
        let gz = zlib.createGzip()
        
        //为何要设置响应头content-encoding,
        //Accpet-encoding 与 content-encoding是http中用来对“采用何种编码格式”进行协定的字段
        //gzip后的文件里面存的是二进制数据,浏览器看不懂,所以就直接给下载了
        //而设置后,这代码告诉浏览器按照gzip的编码格式进行正文的数据传输,接收数据后你不要解析,先解压后再解析
        res.setHeader('content-encoding','gzip')

        //流式操作
        rs.pipe(gz).pipe(res)

        //错误监听
        rs.on('error',()=>{
            res.setHeader('content-encoding','')
            res.writeHead('404')
            res.write('Not found')
            res.end()
        })

    })
    
    server.listen(8080)
}