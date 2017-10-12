import React from 'react'
import W from './../../lib/WEUI'
import Link from 'next/link'
import {Helmet} from 'react-helmet'
import Router from 'next/router'
import * as types from './../../constants'
import {APIProxy, set} from './../../lib/tools'
import * as UIshell from './../_components/UIshell'
import ShareHinter from './../_components/ShareHinter'

const data = ()=> {
    return [
        {icon: <img src='/images/icon_tabbar.png'/>, label: '我操作的学校', href: '/school/schoollist'},
    {icon: <img src='/images/icon_tabbar.png'/>, label: '最新付款', href: '/school/payhistory'},
    // {icon: <img src='/images/icon_tabbar.png'/>, label: '卡状态查询(关卡)', href: '/'},
    // {icon: <img src='/images/icon_tabbar.png'/>, label: '会员查询', href: '/'},
    // {icon: <img src='/images/icon_tabbar.png'/>, label: '财务审核', href: '/'},
    // {icon: <img src='/images/icon_tabbar.png'/>, label: '批量登记收款', href: '/'},
    // {icon: <img src='/images/icon_tabbar.png'/>, label: '批量关卡', href: '/'},
    // {icon: <img src='/images/icon_tabbar.png'/>, label: '其他...', href: '/'}
    ]
}

const admindata = ()=> {
    return [
        {icon: <img src='/images/icon_tabbar.png'/>, label: '业务员名录*', href: '/school/ownermanage'},
    {icon: <img src='/images/icon_tabbar.png'/>, label: '学校管理', href: '/school/schoollist'},
    ]
}


class paySuccess extends React.Component {
    // pathname - path section of URL
    // query - query string section of URL parsed as an object
    // asPath - String of the actual path (including the query) shows in the browser
    // req - HTTP request object (server only)
    // res - HTTP response object (server only)
    // jsonPageRes - Fetch Response object (client only)
    // err - Error object if any error is encountered during the rendering
    static async getInitialProps({req, res, pathname, query, asPath, err}) {
        let Data = await APIProxy({
            req,
            cmd: 'gkagentadmin/homepage',
            params: {}
        })
        let {err: gkerr, result, __user} = Data
        if (gkerr) {
            return UIshell.renderErrorPage(gkerr)
        } else {
            console.log(__user)
            let {user, schoolOwner} = __user
            return {user, schoolOwner}
        }
    }

    constructor(props) {
        super(props);
        UIshell.wrapPage(this, props)
    }

    handlePayEnterClick = () => {
        UIshell.showDialog({
            title: "提示",
            message: "你即将进入的未指定学校的公版链接，建议在学校管理中发送指定学校的专用链接",
            buttons: [{
                label: '好，去指定的',
                onClick: ((closeDialog) => {
                    closeDialog();
                    Router.push({
                        pathname: '/school/schoollist'
                    })
                }).bind(this)
            }, {
                label: "不用，就公版",
                onClick: ((closeDialog) => {
                    closeDialog();
                    //
                    setTimeout(() => {
                        window.location.href = "/pay"
                    })
                }).bind(this)
            }],
            dialogType: types.DIALOG_CONFIRM
        });
    }

    render = () => {
        let {user, schoolOwner} = this.props
        console.log(user)
        return <div>
        <style jsx>{`
                .adminLabel{
                    border-radius:5px;
                    padding:2px 5px;
                    font-size:10px;
                    background-color:red;
                    color:white;
                    margin:0 5px
                }
                .topLogo{
                     opacity: 0.5;
                     text-align:center;
                     padding: 10px 10px;
                     width:100%;
                 }
            `}</style>
        <Helmet>
        <title>校园小助理</title>
        </Helmet>
        <div className="topLogo">
            <img style={{width: '140px'}} src="http://www.gankao.com/assets/site/2015/images/logo.jpg"/>
            </div>
            <W.CellsTitle style={{textAlign: 'center'}}>
        你好！{schoolOwner.name}/{schoolOwner.mobile}
        {schoolOwner.level === 2 &&
        <span className="adminLabel">管理员</span>
        }
        </W.CellsTitle>
        <W.CellsTitle>常用功能</W.CellsTitle>
        <div style={{padding: 0, backgroundColor: 'white', margin: '15px 0'}}>
        <W.Grids data={data()}/>
            </div>
            {schoolOwner.level === 2 &&
            <W.CellsTitle>管理模块</W.CellsTitle>
    }
        {schoolOwner.level === 2 &&
        <div style={{padding: 0, backgroundColor: 'white', margin: '15px 0'}}>
        <W.Grids data={admindata()}/>
            </div>
        }
        <W.CellsTitle>相关链接</W.CellsTitle>
        <W.Cells>
        <W.Cell access onClick={this.handlePayEnterClick}>
        <W.CellBody>状元卡团购付费入口</W.CellBody>
        <W.CellFooter>公版链接</W.CellFooter>
        </W.Cell>
        </W.Cells>
        <div>
        <Link href='/pay/step3' prefetch><a> </a></Link>
        </div>
        </div>
    }
}

export default paySuccess
