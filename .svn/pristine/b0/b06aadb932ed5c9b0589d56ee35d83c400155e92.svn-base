
/**
 * Http请求处理
 */
class Http {

    public getRequestUrlTail(params: any) {
        const para_filter = [];
        for (let key in params) {
            let value = params[key];
            para_filter.push(key + "=" + encodeURIComponent(value) + "&");
        }
        para_filter.sort();
        let arg = para_filter.join('');
        arg = arg.substr(0, arg.length - 1);
        return arg;
    }
    /**
     * 请求http请求
     * @param url 请求链接
     * @param params 请求参数
     * @param type 请求类型 POST GET
     * @param timeout 超时时间 单位毫秒  默认15000毫秒,
     */
    public requestAsync(url: string, params: any, type: string = "POST", timeout: number = 15000): Promise<string> {
        return new Promise((successFunc: Function, fialFunc: Function) => {
            var xhr = new XMLHttpRequest();
            if (CC_PREVIEW) {
                // url = "http://192.168.0.200/test/proxy.php?url=" + encodeURIComponent(url);
            }
            xhr.timeout = 15000;
            xhr.ontimeout = () => {
                fialFunc("请求超时");
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    let ioError = xhr.status >= 400 || xhr.status == 0;
                    var response = xhr.responseText;
                    if (ioError) {//请求错误
                        fialFunc();
                    } else {
                        CC_DEBUG && console.log(response);
                        successFunc(response);
                    }
                }
            };
            let paramsStr = this.getRequestUrlTail(params);
            // if (CC_DEBUG) {
            Log.trace("url:", url, paramsStr)
            // }
            if (type === "POST") {
                xhr.open(type, url, true);
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr.send(paramsStr);
            } else {
                xhr.open(type, paramsStr ? url + "?" + paramsStr : url, true);
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr.send();
            }
        })
    }
}
window["Http"] = Http;