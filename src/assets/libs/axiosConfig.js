import axios from 'axios'
import qs from 'qs'

class AjaxRequest{
    constructor() {
        this.baseURL = process.env.NODE_ENV == 'production'?'/':'http://localhost:3000'
        this.timeout = 3000 //超时时间
    }

    //构造请求参数
    merge(options) {
        return {...options, timeout: this.timeout }
    }

    // 拦截方法
    setInterceptor(instance) {
        // 请求时拦截器,更改请求头
        instance.interceptors.request.use((config) => {
            config.headers.Authorization = "xxx"
            config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
            return config;
        }, (err) => {
            return Promise.reject(err);
        })

        // 相应时方法
        instance.interceptors.response.use((res) => {
            return res.data;
        }, (err) => {
            return Promise.reject(err);
        })
    }

    // 请求方法
    request(options) { //url,method
        let instance = axios.create(); //创建axios实例
        this.setInterceptor(instance);
        let config = this.merge(options);
        return instance(config);   //返回promise
    }

    
}

export default new AjaxRequest