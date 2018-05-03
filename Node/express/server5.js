const express=  require("express")

let server = express()
server.listen(8080)

server.get('/a',(req,res)=>{
    res.redirect('https://www.baidu.com')
    // res.setHeader('location','https://www.baidu.com')
    // res.writeHeader(301)
    // res.end()
})