const express = require('express')
const multer = require('multer')

let server = express()
server.listen(8080)

server.use(multer({ dest: 'www/' }).any())

server.post('/upload',(req,res,next)=>{
    console.log(req.files)
    res.end()
})