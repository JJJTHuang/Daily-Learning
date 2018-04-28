const http = require('http');
const io = require('socket.io');

let httpserver = http.createServer();
httpserver.listen(8080);

let wsServer = io.listen(httpserver);

let aSock = [];

wsServer.on('connection', sock => {

    aSock.push(sock);

    sock.on('disconnect', () => {
        let n = aSock.indexOf(sock);
        if (n != -1) {
            aSock.splice(n, 1);
        }
    })

    sock.emit('msg', 'socket服务发来一条信息')

    sock.on('msg', str => {

        aSock.forEach(s => {
            if (s != sock) {
                s.emit('msg', str);
            }
        })

    });

})


setInterval(() => {
    console.log(aSock.length)
}, 1000);