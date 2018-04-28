const fs = require('fs');

let rs = fs.createReadStream('111');
let ws = fs.createWriteStream('222.jpg');

rs.pipe(ws);

//报错
rs.on('error', err => {
    console.log('出错了')
})

ws.on('finish', () => {
    console.log('finish');
})