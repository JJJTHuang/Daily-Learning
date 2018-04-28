const http = require('http')
const urllib = require('url') //解析路径

let server = http.createServer((req,res)=>{
    let {pathname,query} = urllib.parse(req.url,true)
    console.log(pathname,query)
})

server.listen(8080)