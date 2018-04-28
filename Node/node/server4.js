const http = require('http')
const cluster = require('cluster')
const os = require('os')
const fs = require('fs')
const zlib = require('zlib')

if(cluster.isMaster){
    for(let i = 0;i<os.cpus().length;i++){
        cluster.fork()
    }
}else{
    http.createServer((req,res)=>{

        let rs = fs.createReadStream(`www${req.url}`),
            gzip = zlib.createGzip()

        res.setHeader('content-encoding','gzip')
        
        rs.pipe(gzip).pipe(res)

        rs.on('error',()=>{
            res.setHeader('content-encoding','')
            res.writeHeader('404')
            res.write('Not found')
            res.end()
        })

    }).listen(8080)
}