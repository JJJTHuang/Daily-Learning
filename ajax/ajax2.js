// 2018-1-28
// Tim.
//JQuery-ajax(demo)


function ajax(options) {

    options = options || {};
    options.type = options.type || "GET";
    options.dataType = options.dataType || "text";
    options.data = options.datatype || {};

    // 低版本不兼容
    let xhr = new XMLHttpRequest();

    //数据预处理(GET方法)
    let arr = [];
    for (let name in options.data) {
        arr.push(`${name}=${options.data[name]}`);
    }
    let strdata = arr.join('&')


    if (options.type = "GET") {
        xhr.open("GET", options.url + "?" + strdata, true);
        xhr.send();
    } else {
        xhr.open("POST", options.url, true);
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        xhr.send(strdata)
    }


    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200 && xhr.status < 300 || xhr.status == 304) {

                let data = xhr.responseText;

                switch (options.dataType) {
                    case "json":
                        if (window.JSON || JSON.parse) {
                            data = JSON.parse(data);
                        } else {
                            data = eval("(" + data + ")")
                        }
                        break;
                    case 'xml':
                        data = xhr.responseXML;
                        break;
                }

                options.success && options.success(data);
            } else {
                options.error && error();
            }
        }
    }
}