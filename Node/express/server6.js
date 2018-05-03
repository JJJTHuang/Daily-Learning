const express = require('express')
// const body = require('body-parser')
const mybody = require('./libs/mybody')

let server = express()
server.listen(8080)

server.use(mybody)
// server.use(body.urlencoded({extended:false}))

server.post('/upload',(req,res,next)=>{
    
    console.log(req.body)

    res.end()
})