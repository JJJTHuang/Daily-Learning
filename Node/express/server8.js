const express = require('express')
const cookieparser = require('cookie-parser')

let server = express()
server.listen(8080)

server.use(cookieparser({}))

server.get('/a',(req,res,next)=>{
    console.log(req.cookie)

    res.cookie("b",666, {})

    res.send('hello world')
})