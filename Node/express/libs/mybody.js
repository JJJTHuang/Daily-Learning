const query = require('querystring')

module.exports = (req,res,next)=>{
    let arr = []
    req.on('data',data=>{
        arr.push(data)
    })

    req.on('end',()=>{
        
        req.body = query.parse(Buffer.concat(arr).toString())

        next()
    })
}