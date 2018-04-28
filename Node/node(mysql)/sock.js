const http = require('http');
const io = require('socket.io');

let httpServer = http.createServer();
httpServer.listen(8080);

//只要有websocket操作都转到socket.io
let wsServer = io.listen(httpServer);
wsServer.on('connection', sock => {
    /*
    sock仅有两个方法
    sock.emit
    sock.on
    */

    setInterval(() => {
        sock.emit('a', new Date().getTime())
    }, 1000)

})