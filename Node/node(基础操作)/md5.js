const crypto = require('crypto')

// blue为了提高安全性一般会加一段属于自己的东西 ，双层md5

function md5(str) {
    let obj = crypto.createHash('md5');
    obj.update(str);

    return obj.digest('hex') //以十六进制的形式输出
}

console.log(md5(md5("123123") + 'test'))