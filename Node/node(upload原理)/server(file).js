const http = require('http');
const fs = require("fs");
// const uuid = require('uuid/v4');
const lib = require('./libs/lib')

let server = http.createServer((req, res) => {

    let arr = [];

    req.on('data', data => {
        arr.push(data);
    })


    req.on('end', () => {

        let Data = Buffer.concat(arr)


        let post = {}
        let files = {};
        if (req.headers['content-type']) {
            let str = req.headers['content-type'].split("; ")[1];

            if (str) {
                let boundary = '--' + str.split('=')[1];

                //1.用分隔符切割数据
                let arr = Data.split(boundary);

                //2.丢弃头尾两个数据
                arr.shift();
                arr.pop();

                //3.丢弃每个头尾的\r\n
                arr = arr.map(item => item.slice(2, item.length - 2))

                console.log(arr)

                //4.每个数据在\r\n\r\n处切半
                arr.forEach(buffer => {

                    let n = buffer.indexOf('\r\n\r\n');

                    //描述(content-type)
                    let dispostion = buffer.slice(0, n);
                    //内容
                    let content = buffer.slice(n + 4);

                    dispostion = dispostion.toString();

                    if (dispostion.indexOf('\r\n') == -1) {

                        //普通数据
                        //Content-Disposition: form-data; name="user"

                        content = content.toString();

                        let name = dispostion.split('; ')[1].split("=")[1];

                        name = name.substring(1, name.lengh - 1)
                    } else {

                        //文件数据
                        /*  Content-Disposition: form-data; name="f1"; filename="a.txt"\r\n
                        Content-Type: text/plain  */

                        let [line1, line2] = dispostion.split('\r\n');

                        let [, name, filename] = line1.split('; ');

                        let type = line2.split('; ')[1];

                        name = name.split('=')[1];
                        name = name.substring(1, name.lengh - 1);

                        filename = filename.split('=')[1];
                        filename = filename.substring(1, name.lengh - 1);

                        // let path = `upload/${uuid().replace(/\-g/,'')}`
                        let path = '111';

                        fs.writeFile(path, content, err => {
                            if (err) {
                                console.log('文件写入失败', err);
                            } else {
                                files[name] = { filename, path, type };
                                console.log(files)
                            }
                        })

                    }

                });

                console.log(post)

            }
        }


        res.end();
    })
})

server.listen(8080)