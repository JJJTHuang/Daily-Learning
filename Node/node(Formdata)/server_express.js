const express = require('express');
const bodyparser = require('body-parser');//接收普通数据
const multer = require('multer');//接收文件数据

let server = express();
server.listen(8081);

server.use(bodyparser.urlencoded({extended:false}));//使用插件

let multerobj = multer({dest: './upload/'})

server.use(multerobj.any());

server.use('/api',(req,res)=>{

    if (req.headers['origin']=='null'|| req.headers['origin'].startsWith('http://localhost')){
        res.setHeader('Access-Control-Allow-Origin', '*');//处理跨域
    }

    res.send('OK')
    console.log(req.headers);
    console.log(req.body);
})

server.use(express.static('./www/'))