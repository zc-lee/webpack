import fly from 'flyio';
import env from './envConfig';
import {
    Message
} from 'iview';
import {
    from
} from 'rxjs/observable/from';
export class WebApi {
    constructor() {
        //拦截器,
        fly.interceptors.response.use(
            (response) => {
                //只将请求结果的data字段返回
                return response.data
            },
            (err) => {
                // Message.error(err.message || this.errorMess);
                // return;
            }
        )
    }
    errorMess = "网络异常！请稍后重试"
    //请求主体
    request(url, data, method = 'post', json) {
        let contype = this.getHeader(json);
        return fly.request(url, data, {
            method : method,
            headers: contype
        }).catch(err => {
            Message.error(err.msg || this.errorMess);
            return err;
        })
    }
    /**
     * @desc get请注
     * @param json 当为对像时{isJson:是否为application/json} 当为string时（传值json）为application/json
     * @return type
     */
    getHeader(json = "") {
        let headerObj = {
            'Content-Type': "application/json"
        }
        if (typeof json === 'object') {
            Object.assign(headerObj, json);
        }
        Object.assign(headerObj, {
            'appmodelId': env.get('userInfo').appmodelId
        })
        return headerObj;
    }
    /**
     * @desc get请注
     * @param url 请求URL地址
     * @param {data}  请求数据
     * @param type 请求环境，如 手机，微信，市场
     * @return type
     */
    get(url, data, isUrl = "to", json = "") {
        let getUrl = (isUrl && this.getDomainApi()) + url;
        return this.request(getUrl, data, 'get', json);
    }
    /**
     * @desc get请注
     * @param url 请求URL地址
     * @param {data}  请求数据
     * @param type 请求环境，如 手机，微信，市场
     * @return type
     */
    post(url, data, isUrl = "to", json = "") {
        let getUrl = (isUrl && this.getDomainApi()) + url;
        return this.request(getUrl, data, 'post', json);
    }
    put(url, data, isUrl = "to", json = "") {
        let getUrl = (isUrl && this.getDomainApi()) + url;
        return this.request(getUrl, data, 'PUT', json);
    }
    /**
     * @desc get请注
     * @param url 请求URL地址
     * @param {data}  请求数据 只支持对像
     * @param type 请求环境，如 手机，微信，市场
     * @return type
     */
    delete(url, data, isUrl = "to", json = "") {
        let getUrl = (isUrl && this.getDomainApi()) + url;
        let par    = "?";
        if (typeof (data) == "object") {
            Object.keys(data).forEach((item, index) => {
                par += `${index == 0 ? "" : "&"}${item}=${data[item]}`
            })
        } else {
            par += `data=${data}`
        }
        getUrl += par;
        return this.request(getUrl, null, 'delete', json);
    }
    all(param) {
        return fly.all(param);
    }
    getClient() {
        return "pc";
    }
    getDomainApi() {
        return env.get('pc');
    }
    /**
     * @method
     * @description 获取平台域名
     */
    getDomainPlat() {
        return env.get('plat');
    }
    /**
     * @method
     * @description 上传url
     * @param type 1001-图片类型文件  2001-音频类型文件  2002-视频类型文件  3001-文档类型文件  4001-证书类文件  5001-其他类型文件
     */
    getUploadUrl(type=1001) {
        return env.uploadUrl+`${type}/${'projectName'&&env.projectName}/${env.get('userInfo').appmodelId}`
    }
    getUser() {
        return window.sessionStorage.getItem('userInfo') || {};
    }
    /**
     * @method
     * @description 平台请求
     * @param {Object} 参数{data,url,method}
     */
    platHttp({
        data   = {},
        url    = '',
        isUrl  = 'to',
        header = '',
        method = 'post'
    }) {
        let getUrl = (isUrl && this.getDomainPlat()) + url;
            method = method.toUpperCase();
        if (method === 'DELETE') {
            let par = "?";
            if (typeof (data) == "object") {
                Object.keys(data).forEach((item, index) => {
                    par += `${index == 0 ? "" : "&"}${item}=${data[item]}`
                })
            } else {
                par += `data=${data}`
            }
            getUrl += par;
            data    = null;
        }
        return this.request(getUrl, data, method, header);
    }
}

export default new WebApi();