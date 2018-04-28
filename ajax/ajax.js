// 2018-1-28
// Tim.
//JQuery-ajax(demo)

function ajax(options) {

    options = options || {};
    options.data = options.data || {};
    options.dataType = options.dataType || "text";
    options.type = options.type || "GET";


    // 对低版本的浏览器不兼容
    let xhr = new XMLHttpRequest()

    // GET方式需要数据组装

    let arr = [];
    for (let name in options.data) {
        // arr.push(`${name} = ${options.data[name]}`)
        arr.push(`${encodeURIComponent(name)}=${encodeURIComponent(options.data[name])}`);
    }
    let strdata = arr.join('&');


    if (options.type == 'post') {
        xhr.open('POST', options.url, true);
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        xhr.send(strdata);
    } else {
        xhr.open('GET', options.url + '?' + strdata, true);
        xhr.send();
    }

    xhr.onreadystatechange = function() {

        if (xhr.readyState == 4) {

            if (xhr.status == 200 && xhr.status < 300 || xhr.status == 304) {

                let data = xhr.responseText;

                switch (data.type) {
                    case 'json':
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

                options.success && options.success(data)
            } else {
                options.error && options.error();
            }

        }
    }
};