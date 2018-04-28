const http = require('http');
const fs = require('fs');
const lib = require('./libs/lib')

let server = http.createServer((req, res) => {

    let arr = [];

    //post数据

    req.on('data', data => {
        arr.push(data);
    })

    req.on('end', () => {

        let data = Buffer.concat(arr); //拼接二进制数据

        let files = {},
            post = {};

        if (req.headers['content-type']) {

            let str = req.headers['content-type'].split('; ')[1];

            if (str) {
                let boundary = '--' + str.split('=')[1];
                let arr = data.split(boundary);

                arr.shift();
                arr.pop();

                arr.map(item => item.slice(2, item.length - 2));

                arr.forEach(item => {

                    let n = item.indexOf('\r\n\r\n');

                    let disposition = item.slice(0, n);
                    //若是传输文件，则content有内容
                    let content = item.slice(n + 4);

                    disposition = disposition.toString();

                    if (disposition.indexOf('\r\n') == -1) {
                        //普通数据(Content-Disposition: form-data; name="user")

                        content = content.toString();

                        // console.log(content);

                        let name = disposition.split('; ')[1].split('=')[1];
                        name = name.substring(1, name.length - 1);

                        post[name] = content;

                    } else {
                        //文件数据(Content-Disposition: form-data; name="f1"; filename="a.txt"\r\n
                        //Content - Type: text / plain)

                        let [line1, line2] = disposition.split('\r\n');

                        // console.log(line2);

                        // let name = line1.split('; ')[1].split('=')[1];
                        // name = name.substring(1, name.length - 1);

                        // let filename = line1.split('; ')[2].split('=')[1];
                        // filename = filename.substring(1, name.length - 1);


                        // let path = '123456'
                        // fs.writeFile(path, content, err => {
                        //     if (err) {
                        //         console.log('文件传输失败');
                        //     } else {
                        //         files[name] = { filename, path, type };
                        //         console.log('成功。');
                        //     }
                        // })

                    }

                })

            }


        }
        res.end();
    })


})

server.listen(8080)