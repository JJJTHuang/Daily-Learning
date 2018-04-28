const http = require('http')
const urllib = require('url')
const queryString = require('querystring')

let server = http.createServer((req, res) => {
    let arr = []
    req.on('data', buffer => {
        console.log('data:', buffer.toString())
        arr.push(buffer)    
    })

    req.on('end', () => {
        let buffer = Buffer.concat(arr)

        let post = queryString.parse(buffer.toString())

        console.log(post)
    })
})

server.listen(8080)