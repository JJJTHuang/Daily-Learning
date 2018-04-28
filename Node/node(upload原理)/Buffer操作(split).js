let b1 = new Buffer('asdas--ooo--qwei');


//Buffer.protetype.split = Buffer.protetype.split||function 
// 这样写的目的是因为现在node的buffer模块还不完善，但是官方日后可能会补充split方法，现在就先自己造个简单的轮子
Buffer.prototype.split = Buffer.prototype.split || function(buffer) {
    let arr = []; //存放切割后的数据

    let cur = []; //当前位置
    let n = 0; //截取到的位置

    while ((n = this.indexOf(buffer, cur)) != -1) {

        arr.push(this.slice(cur, n));

        cur = n + buffer.length;
    }

    arr.push(this.slice(cur));

    return arr;

}

let arr = b1.split('--');

console.log(arr)

console.log(arr.map(item =>
    item.toString()
))