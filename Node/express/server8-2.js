const express = require('express')
const cookieparser = require('cookie-parser')

let server = express()
server.listen(8080)

//  那一串东西是secret(签名密钥),用于签名，签名后的cookie是由secret加上对应cookie的值进行哈希得到
//  的，返回时也会进行值与哈希的计算并且会与服务端进行匹配校验，因此具有防篡改的功能,
server.use(cookieparser('dfdsgfjfyt6dr5setrgdxgxhgDGFDHYasd12213&!%872'))

server.get('/a', (req, res, next) => {
    console.log(req.cookie)

    console.log(req.signedCookies)

    res.cookie("c", 666, { signed: true })

    res.send('hello world')
})