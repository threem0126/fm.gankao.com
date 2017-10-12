export const sleep = (ms)=>{
    return new Promise((resolve, reject) => {
        setTimeout(_ => resolve(ms), ms);
    });
}

function checkTime(i){ //将0-9的数字前面加上0，例1变为01
    if(i<10)
    {
        i = "0" + i;
    }
    return i;
}

export const checkPhoneFormat = (phone)=> {
    return (/^1[34578]\d{9}$/.test(phone))
}

export const maskMobile = (mobile)=> {
    return mobile.substr(0, 3) + '****' + mobile.substr(7, 4)
}

export const runTime = ()=> {
    let ret = {}
    if (typeof window === "object") {
        let UA = window.navigator.userAgent;
        ret.isServer = false
        ret.inapp = (UA.indexOf("gankao") !== -1);
        ret.inWeixin = (UA.indexOf("MicroMessenger") !== -1);
        ret.isQQ = UA.indexOf("QQ") !== -1;
        ret.iOS = (UA.indexOf("iPad") !== -1 || UA.indexOf("iPhone") !== -1);
        ret.isOnPc = !(/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent));
        return ret
    } else {
        ret.isServer = true
    }
    return ret
}

export const formatRemainTime = (leftMiSecond)=> {
    let days = parseInt(leftMiSecond / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
    let hours = parseInt(leftMiSecond / 1000 / 60 / 60 % 24, 10); //计算剩余的小时
    let minutes = parseInt(leftMiSecond / 1000 / 60 % 60, 10);//计算剩余的分钟
    let seconds = parseInt(leftMiSecond / 1000 % 60, 10);//计算剩余的秒数
    days = checkTime(days);
    hours = checkTime(hours);
    minutes = checkTime(minutes);
    seconds = checkTime(seconds);
    return (days > 0 ? (days + "天") : '') + (hours > 0 ? (hours + "小时") : "") + (minutes > 0 ? (minutes + "分") : '') + seconds + "秒"
}

export const getLocatinGeo = ()=> {
    return new Promise((resolve, reject) => {
        if (typeof window !== "object") {
            reject("非客户端环境，无法获取经纬度")
            return
        }
        if (false && window.wx) {
            window.wx.getLocation({
                type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: (res) => {
                    const lat = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                    const lng = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                    resolve({lng, lat})
                },
                fail: (res) => {
                    resolve({lng: 0, lat: 0})
                }
            });
        } else if (navigator.geolocation && navigator.geolocation.getCurrentPosition) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = parseFloat(position.coords.latitude); // 纬度，浮点数，范围为90 ~ -90
                    const lng = parseFloat(position.coords.longitude); // 经度，浮点数，范围为180 ~ -180。
                    resolve({lng, lat})
                },
                (error) => {
                    let errMsg = "";
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            errMsg = "用户拒绝对获取地理位置的请求。";
                            break;
                        case error.POSITION_UNAVAILABLE:
                            errMsg = "位置信息是不可用的。";
                            break;
                        case error.TIMEOUT:
                            errMsg = "请求用户地理位置超时。";
                            break;
                        case error.UNKNOWN_ERROR:
                            errMsg = "未知错误。";
                            break;
                        default:
                            errMsg = "未知错误。";
                    }
                    reject(errMsg)
                }
            );
        } else {
            reject('没有获得经纬度信息的接口')
        }
    });
}

export const delayRun = (fun, ms, errerhandle)=> {
    setTimeout(async ()=> {
        try {
            await fun();
        } catch (err) {
            if (errerhandle)
                errerhandle(err);
            else {
                console.error("error in delayRun:");
                console.error(err);
            }
        }
    }, ms);
}

export const getCookie = (name) => {
    if(typeof document !=="object"){
        return null;
    }
    let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

export const setCookie =(name,value)=> {
    if(typeof document !=="object"){
        return
    }
    let Days = 30;
    let exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}