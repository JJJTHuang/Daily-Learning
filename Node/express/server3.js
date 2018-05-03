const express = require('express')
const pathlib = require('path')

let server = express()
server.listen(8080)

server.get('/a',(req,res,next)=>{
    //sendFile需要一个绝对路径，因此需要用到path来解析路径并返回文件的绝对路径
    res.sendFile(pathlib.resolve('a.txt'))
})