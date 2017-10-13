import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import React from 'react'
import {setUIStyle} from './_components/UIshell'
import _configclient from './../config-client'

// import FastClick from 'fastclick';
//
// if(typeof window ==="object"){
//     window.addEventListener('load', () => {
//         FastClick.attach(document.body);
//     });
// }

let csslist = [];
_configclient.themesUse.map(item=> {
    csslist = [...csslist, ..._configclient.themes[item]]
    return item
})

if(!csslist.length){
    throw '指定的主题样式没有定义！'
}

export default class extends Document {
    static getInitialProps({renderPage}) {
        const sheet = new ServerStyleSheet()
        const page = renderPage(App => props => sheet.collectStyles(<App {...props} />))
        const styleTags = sheet.getStyleElement()
        const _style = setUIStyle()
        return {...page, styleTags, _style}
    }

    render() {
        let {_style}= this.props
        return (
            <html>
            <Head>
                <title> </title>
                <meta charSet="UTF-8"/>
                <meta name="gankao_sharable" content="1"/>
                <meta name="viewport"
                      content="width=device-width, initial-scale=1, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"/>
                <meta content="telephone=no" name="format-detection"/>
                <meta content="yes" name="apple-mobile-web-app-capable"/>
                <meta name="wx_share_title" content="测试分享"/>
                <meta name="wx_share_content" content="这是来自赶考网的邀请"/>
                <meta name="wx_share_link" content="http://www.gankao.com"/>
                <meta name="wx_share_imgurl" content="http://www.gankao.com/assets/site/2015/images/logo.jpg"/>
                <link rel="stylesheet" href="/stylesheets/font-awesome.min.css"/>
                {csslist.map((itemUrl)=>{
                    return <link rel="stylesheet" href={itemUrl}/>
                })}
                <link rel='stylesheet' href='/stylesheets/style.css'/>
                <link rel='stylesheet' href='/stylesheets/fm.css'/>
                {this.props.styleTags}
            </Head>
            <body onSelect="return false;" onSelectStart="return false;">
            <Main />
            <NextScript />
            </body>
            {/*{微信 wx js对象库引用 }*/}
            <script type="text/javascript" src="//res.wx.qq.com/open/js/jweixin-1.2.0.js"/>
            {/*{微信 weixin js sdk 引用 }*/}
            {/*<script src="http://weixin_gate_test.gankao.com/wx_config"/>*/}
            </html>
        )
    }
}
