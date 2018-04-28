var str = window.prompt()
var n = window.prompt()
var result = ''
for (var i = 0; i < n; i++) {
    var pl = window.prompt().split(" ")
    var p = pl[0], l = pl[1]
    var Rstr = str.substr(p, l).split("").reverse().join('')
    var ocStr = str.substr(p + 1, str.length)
    result += str[p].concat(Rstr).concat(ocStr)
    str = result
}

console.log(result)

// n首歌    长度s秒     每张CD容量L秒     同一张CD每首歌曲间隔1s    任一张CD歌曲数不被13整除



















