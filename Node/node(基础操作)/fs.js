const fs = require('fs');

fs.readFile('1.txt', (err, data) => {

    console.log(data.toString()) //输出二进制


    // 简单的文件拷贝
    fs.writeFile('2.txt', data, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log('success')
        }
    })

})