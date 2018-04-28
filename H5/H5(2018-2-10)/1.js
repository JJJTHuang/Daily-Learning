this.onmessage = function(ev){

    let result=0;

    for(let i in ev.data){
        result+=ev.data[i];
    }

    this.postMessage(result);
}