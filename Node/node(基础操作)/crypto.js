const crypto = require('crypto')

let obj = crypto.createHash('md5')

let str = 'sadasdsacxzc';

obj.update(str)

console.log(obj.digest('hex'))