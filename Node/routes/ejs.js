const ejs = require('ejs')

ejs.renderFile('./templates/ejs/1.html',{
    a : 1,
    b : 12,
    str : 'aggag',
    header_path : 'component/header.html'
}).then(data=>{
    console.log(data)
},err=>{
    console.log(err)
})