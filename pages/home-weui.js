import React from 'react'
import W from './../lib/WEUI'
import Link from 'next/link'
import {Helmet} from 'react-helmet'
import Router from 'next/router'
import * as types from './../constants'
import {APIProxy, set} from './../lib/tools'
import * as UIshell from './_components/UIshell'

//样式定义
const styles = <style jsx>{`
                .adminLabel{
                    border-radius:5px;
                    padding:2px 5px;
                    font-size:10px;
                    background-color:red;
                    color:white;
                    margin:0 5px
                }
            `}</style>

//页面类
class paySuccess extends React.Component {
    // pathname - path section of URL
    // query - query string section of URL parsed as an object
    // asPath - String of the actual path (including the query) shows in the browser
    // req - HTTP request object (server only)
    // res - HTTP response object (server only)
    // jsonPageRes - Fetch Response object (client only)
    // err - Error object if any error is encountered during the rendering
    static async getInitialProps({req, res, pathname, query, asPath, err}) {
        return {}
    }

    constructor(props) {
        super(props);
        //页面级别，需要加上此包装器
        UIshell.wrapPage(this, props)
    }

     componentDidMount=async ()=> {
        console.log('loading date.....')
        // let Data = await APIProxy({
        //     req,
        //     cmd: 'gkagentadmin/homepage',
        //     params: {}
        // })
        // let {err, result} = Data
        //更新到State
    }

    handlePayEnterClick = () => {
        UIshell.showDialog({
            title: "提示",
            message: "你即将进入的未指定学校的公版链接，建议在学校管理中发送指定学校的专用链接",
            buttons: [{
                label: '好，去指定的',
                onClick: ((closeDialog) => {
                    closeDialog();
                    setTimeout(()=>{
                        UIshell.showAlert('温馨提示','选择1')
                    })
                }).bind(this)
            }, {
                label: "不用，就公版",
                onClick: ((closeDialog) => {
                    closeDialog();
                    setTimeout(()=>{
                        UIshell.showAlert('温馨提示','选择2')
                    })
                }).bind(this)
            }],
            dialogType: types.DIALOG_CONFIRM
        });
    }

    render = () => {
        let {user,} = this.props
        console.log(user)
        return <div>
            {styles}
            <Helmet>
                <title>校园小助理</title>
            </Helmet>
            <W.CellsTitle> <span className="adminLabel">相关链接</span> </W.CellsTitle>
            <W.Cells>
                <W.Cell access onClick={this.handlePayEnterClick}>
                    <W.CellBody>对话框A</W.CellBody>
                    <W.CellFooter> </W.CellFooter>
                </W.Cell>
                <W.Cell access onClick={()=>{
                    UIshell.showAlert('温馨提示','请先复制本页面的网址，然后通过微信、QQ或短信发给好友，当Ta支付完成后，您会收到短信确认哦')
                }}>
                    <W.CellBody>对话框B</W.CellBody>
                    <W.CellFooter> </W.CellFooter>
                </W.Cell>
            </W.Cells>
        </div>
    }
}

export default paySuccess
