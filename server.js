import express from 'express'
import next from 'next'
import path from 'path'
import session from 'express-session';
import connectRedis from "connect-redis";
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import hpp from 'hpp';
import bodyParser from 'body-parser';
import compression from 'compression';
import _config from './config'

const port = parseInt(process.env.PORT, 10) || 8012
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
    .then(() => {
        const server = express();
        // Security
        server.disable('x-powered-by');
        server.set('port', port);
        server.use(bodyParser.urlencoded({extended: false}));
        server.use(bodyParser.json({limit: '5000kb'}));
        server.use(hpp());
        // server.use(helmet.contentSecurityPolicy({
        //     defaultSrc: ["'self'"],
        //     scriptSrc: ["'self'"],
        //     styleSrc: ["'self'"],
        //     imgSrc: ["'self'"],
        //     connectSrc: ["'self'", 'ws:'],
        //     fontSrc: ["'self'"],
        //     objectSrc: ["'none'"],
        //     mediaSrc: ["'none'"],
        //     frameSrc: ["'none'"],
        // }));
        server.use(helmet.xssFilter());
        server.use(helmet.frameguard('deny'));
        server.use(helmet.ieNoOpen());
        server.use(helmet.noSniff());
        server.use(cookieParser());
        server.use(compression());

        server.use(express.static(path.join(__dirname, './public')));

        //启用Session，可选Redis存储。PM2集群模式时，必须用分布式存储
        const sessionCookieKey = "zhuli-" + (process.env.NODE_ENV || "production");
        let sessionOpt = {
            secret: _config.session.secret,
            key: sessionCookieKey,
            resave: false,
            saveUninitialized: true,
            cookie: {maxAge: 8000 * 1000}
        }
        if (process.env.REDIS_SESSION === "1") {
            const RedisStore = connectRedis(session);
            sessionOpt.store = new RedisStore({
                host: _config.redis.host,
                port: _config.redis.port,
                pass: _config.redis.password || ''
            })
            console.log('Session存储方式：Redis ....')
        } else {
            console.log('Session存储方式：进程内存 ....')
        }
        server.use(session(sessionOpt));

        //region 以下是管理模块的链接，需要认证cookie中的身份

        //除了上面的pay，其他路由访问都需要登录主站
        server.get('*', (req, res, next) => {
            // if(req.path.indexOf("/pay")===0){
            //     next()
            //     return
            // }
            // console.log(`req.cookies.student=${req.cookies.student}`)
            // let redirect = `${req.protocol}://${req.hostname}:${port}${req.originalUrl}`
            // if (!req.cookies.student) {
            //     //未登录
            //     res.redirect(`${_config.gankao_main_site.url}?redirect=${encodeURIComponent(redirect)}`)
            // } else {
            //     res.cookie('studentCP', req.cookies.student, {maxAge: 60 * 60 * 24 * 31, httpOnly: false, path: '/'});//cooike 时长 30 sec
            //     next()
            // }
            next()
        }, (req, res) => {
            return handle(req, res)
        })
        //endregion

        server.listen(port, (err) => {
            if (err) throw err
            console.log(`> Ready on http://localhost:${port}`)
        })
    })
