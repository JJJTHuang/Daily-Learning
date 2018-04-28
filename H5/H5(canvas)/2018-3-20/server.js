const http = require('http')
const fs = require('fs')

http.createServer((req,res)=>{
    if(req.url == '/post'){
        
        let arr = []

        req.on('data',data=>{
            arr.push(data)
        })

        req.on('end',()=>{
            let buffer = Buffer.concat(arr)
            let filename = Math.random() + '.jpg'

            fs.writeFile(filename, decodeURIComponent(buffer.toString().replace(/^col=/, '')).replace(/^data:[^,]+;base64,/, ''),'base64',err=>{
                if(err){
                    res.end('wrong')
                }else{
                    fs.readFile(filename, (err, data) => {
                        // res.setHeader('Content-Disposition', 'attachment; filename=download.png'); res.end(data)//设置下载按钮，让用户从服务器下载到本地
                        res.end('ok');
                    })

                }
            })

        })

    }else{
        fs.readFile(`www${req.url}`,(err,data)=>{
            if(err){
                res.write('404')
            }else{
                res.write(data)
            }
            res.end()
        })
    }
}).listen(8081)