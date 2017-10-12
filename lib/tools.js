import fetch from 'isomorphic-fetch'
import * as types from './../constants'
import {sleep} from './../lib/utils'
import _clientconfig from './../config-client'
import * as UIshell from './../pages/_components/UIshell'
import {getCookie} from './../lib/utils'

JSON.stringifyline = function (Obj) {
    return JSON.stringify(Obj, null, 2)
}

const remote_api = ()=> {
    return _clientconfig.apiUrl
}
const getfrontpage = ()=>{
    return (typeof window === "object") ? window.location.href : ""
}
//这里不传递token，则采用cookie验证。但前提是同主域
const APIProxy_Do = async ({cmd, params={}, req}) => {
    let uri = remote_api() + '/' + cmd;
    //console.log(uri)
    let query = {
        method: 'post',
        rejectUnauthorized: false,
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            token: (req ? req.cookies.student : getCookie('studentCP')),//当从服务器上请求时，把本site取到的httpOnly的Cookie值传到API中
            frontpage: getfrontpage()
        },
        withCredentials:'true',
        json: true,
        body: JSON.stringify(params)
    }
    console.log('query')
    console.log(query)
    let res = await fetch(uri, query);
    let jsonResult = await res.json()
    return jsonResult
}

export const APIProxy = async ({cmd, params={}, loadingToast=types.LOADING_TOAST_MODEL, req} ) => {
    try {
        //服务器端运行
        if (typeof window === "undefined") {
            return await APIProxy_Do({cmd, params,req})
        }
        if (loadingToast === types.LOADING_TOAST_NONE) {
            return await APIProxy_Do({cmd, params,req})
        } else if (loadingToast === types.LOADING_TOAST_MODEL) {
            return new Promise((resolve, reject) => {
                UIshell.showToast({
                    message: "加载中...",
                    ontoastShowed: async (closeToast) => {
                        let startTime = new Date().getTime()
                        let ret = await APIProxy_Do({cmd, params, req});
                        let endTime = new Date().getTime()
                        let needSleep = 700 - (endTime - startTime)
                        if (needSleep > 0) {
                            await sleep(needSleep)
                        }
                        closeToast()
                        resolve(ret)
                    }
                });
            });
        } else {
            throw `${types.LOADING_TOAST_MINI}模式的调用尚未实现`
        }
    } catch (err) {
        console.error(err)
        return {err: `数据访问遇到错误(${JSON.stringify(err)})`, result: null}
    }
}

export const hashcode = (str) => {
    let hash = 0, i, chr, len;
    if (str.length === 0) return hash;
    for (i = 0, len = str.length; i < len; i++) {
        chr = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

export const updateFile2Qiniu = async(prefix, file_elem,qiniutoken, filename)=> {
    if(!filename) {
        try {
            filename = file_elem["name"];
        } catch (e) {
            filename = "";
        }
    }
    //以上防止在图片在编辑器内拖拽引发第二次上传导致的提示错误
    let ext = filename.substr(filename.lastIndexOf("."));
    ext = ext.toUpperCase();
    const timestamp = new Date().getTime();
    const name = prefix + "/" + timestamp + ext;
    let data = new FormData();
    data.append("file", file_elem);
    data.append("key", name);
    data.append("token", qiniutoken);
    let res = await fetch("http://upload.qiniu.com", {
        method: 'post',
        rejectUnauthorized: false,
        body:data
    });
    let result = await res.json()
    if (result){
        return result["key"];
    }else {
        return false;
    }
};
