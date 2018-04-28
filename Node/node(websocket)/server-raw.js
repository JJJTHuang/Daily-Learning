const net = require('net');
const crypto = require('crypto');

//由于协议不同，所以http模块会直接拒绝连接，因此我们需要通过传输层来进行通信
let serverNet = net.createServer(sock => {

    console.log('已连接');;

    //握手
    sock.once('data', data => {

        console.log('Hand shake start');

        let str = data.toString();
        let lines = str.split('\r\n');

        lines = lines.slice(1, lines.length - 2);

        let headers = {};

        lines.forEach(i => {

            let [key, value] = i.split(': ');

            headers[key.toLowerCase()] = value;

        })

        if (headers['upgrade'] != 'websocket') {
            console.log('其他协议', headers['upgrade']);
            sock.end();
        } else if (headers['web-socket-version'] != 13) {
            console.log('版本不对', headers['web-socket-version'])
            sock.end();
        } else {
            let key = headers['sec-websocket-key'];
            let mask = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';

            let hash = crypto.createHash('sha1');
            hash.update(key + mask);
            let key_digest = hash.digest('base64');

            sock.write(`HTTP/1.1 101 Switching Protocols\r\n
            Upgrade: websocket\r\n
            Connection: Upgrade\r\n
            Sec-WebSocket-Accept: ${key_digest}\r\n\r\n`)

            console.log('hand shake end');

            sock.on('data', data => {
                console.log('有数据。')
                console.log(data);
            })
        }

    })
})

serverNet.listen(8080);

/*

通过net module (传输层通信)
//握手once (101 Switching protocal)=>WebSocket
//查看WebSocket版本是否==13
//得到key+mask 通过sha1 加密成base64 进行校验
//返回表明握手成功！开始数据通信
//二进制数据解析

*/

/*

1.客户端握手，发送协议升级的头信息
2.服务器接到了，进行校验(upgrade==13,mask)，通过后升级传输协议，并按规定方式传输信息(二进制数据解析)
3.任意通信。
一次握手，终生连接。

*/


/*
websocket原理:

基于传输层的通信
1.握手 =》 协议升级 (101 switch protocol)
2.检测版本 == 13？
3.得到 key+mask 进行sha加密并校验
4.若Ok则返回数据并开始通信
5.二进制数据解析
*/