校园小助理

- 项目基于next.js框架

#功能模块#
- 

#警示事项！！！！！！！！#
- 注意安装组件时不可使用cnpm，必须使用 $ npm i


#运行项目（开发）#
`
$ npm i --registry=https://registry.npm.taobao.org
$ npm run dev
`



#运行项目（正式）#
`
$ npm run build --需要先编译到.next子目录下
$ NODE_ENV=production REDIS_SESSION=1 node server-load.js 
$ NODE_ENV=production REDIS_SESSION=1 pm2 start server-load.js --name zhuli -i 0
`

#运行项目（测试）#
`
$ NODE_ENV=test pm2 start server-load.js --name zhuli_test 
`

#本地启动redis：
cd /usr/local/redis && src/redis-server
cd /usr/local/redis && src/redis-cli 

#nginx
重启 pkill -9 nginx


