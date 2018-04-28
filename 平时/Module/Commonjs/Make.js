//浏览器端实现Commonjs
//缺少的四个变量，module,exports,require,global

var module = {
    exports : {}
}

(function (module, exports){
    exports.multiply = function (n) {
        return n*n*n
    }
})(module,module.exports)

var f = module.exports.multiply