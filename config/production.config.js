/*
 */

export const config = {
    appName:'zhuli.gankao.com',
    weixin_gate:{
        url:'http://weixin_gate.gankao.com'
    },
    gankao_main_site:{
        url:"http://www.gankao.com/user/login"
    },
    redis: {
        host: "10.9.193.140",
        port: 6379,
        password:'gankao123poi',
        cache_prefx:'prod_zhuli_',
        defaultExpireSecond:10*60
    },
    session: {
        secret: '6%124212341d%9df047'
    }
}