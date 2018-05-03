const express = require('express')
const cookiesession = require('cookie-session')

let server = express()
server.listen(8080)

server.use(cookiesession({
    //keys其实就是secret数组,他会抽取数组里面的值进行签名,因此提高安全性
    keys : ['123123&!*TGD','(H@(UM<@S)iidiasd','!Y(&EG!@B*NSusadnsandiu']
    //secret:'asd12e12*(!@YE(*@(!*END'
}))

server.get('/a', (req, res, next) => {
    if(!req.session['count']){
        req.session.count = 1
    }else{
        req.session.count++
    }

    res.send(`欢迎你第${req.session.count}次来访`)
    res.end()
})