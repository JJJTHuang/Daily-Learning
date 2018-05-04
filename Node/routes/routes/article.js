const express = require('express')

let route = express.Router()

route.get('/',(req,res)=>{
    console.log(req.query)
    res.send('文章首页')
})

route.get('/:id',(req,res)=>{
    let {id} = req.params

    console.log(req.query)

    res.send(`${id}文章页`)
})

route.get('/edit',(req,res)=>{
    res.send('编辑文章')
})

module.exports = route