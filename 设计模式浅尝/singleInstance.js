let mySingleInstance = (function () {
  let instance
  function init () {
    return {
      a:1,
      say () {
        console.log("HELLO!")
      }
    }
  }
  if(!instance) instance = init()
  return instance
})

let a = mySingleInstance
let b = mySingleInstance
a === b