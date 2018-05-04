const express = require('express')

let server = express()
server.listen(8080)

server.use('/article',require('./routes/article'))