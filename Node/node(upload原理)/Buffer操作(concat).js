let b1 = new Buffer('test');
let b2 = new Buffer('t');

console.log(Buffer.concat([b1, b2]).toString());


console.log(b1.indexOf(b2, 2))