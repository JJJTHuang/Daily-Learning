const assert = require('assert');

function sum(a, b) {

    //限定某一条件

    assert(typeof a == 'number', 'first must be number');

    return a + b;

}

console.log(sum('a', 2))