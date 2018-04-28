const cluster = require('cluster');
const os = require('os');
const http = require('http');
const porcess = require('process');

if (cluster.isMaster) {
    for (let i = 0; i < os.cpus().length; i++) cluster.fork();

    console.log('主进程');
} else {

    console.log('子进程');

    let server = http.createServer((req, res) => {
        console.log(process.pid);
        res.end();
    })

    server.listen(8080);
}