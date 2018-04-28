const express = require('express');
const bodyparser = require('body-parser');  //接收普通的post数据
const multer = require('multer');   //接收文件的post数据
const mysql = require('mysql')

let server = express();
server.listen(8080);

server.use(bodyparser.urlencoded({extended:false}));

let multerobj = multer({dest:'./upload'});

server.use(multerobj.any());//调用中间件

server.use('/api',(req,res)=>{

    //处理跨域
    if(req.headers['origin']=='null'||req.headers['origin'].startsWith('http://localhost')){
        res.setHeader('Access-Control-Allow-Origin', '*');
    }

    let arr = [];

    // req.files.forEach(file=>{
    //     arr.push(file)
    // });
    

    res.send('OK')
});

server.use(express.static('./www/'));


