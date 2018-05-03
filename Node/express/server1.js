const express = require("express")

let server = express()
server.listen(8080)

server.get('/a',(req,res,next)=>{
    console.log('aaaa')
    //这里的主要的作用使将控制权转交给下一个中间件，如果当前中间件没有结束请求，而且next未被调用，请求会被挂起，后面定义的中间件就没有被执行的机会
    next()    
})

//express.static以前是一个外部的中间件，后来太常用了就纳入到express里面了
server.use(express.static('./www/'))