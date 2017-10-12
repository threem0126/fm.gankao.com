import React from 'react'
import {Link} from 'react-router'
import W from './../../../lib/WEUI'
import * as types from './../../../constants'
import * as UIshell from './../../_components/UIshell'

export default class extends React.Component {
    constructor(props) {
        super(props);
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
        return <div style={{padding:'50px'}}>
            <h2>P1</h2>
            <W.Button onClick={this.handlePayEnterClick}>点我</W.Button>
            <Link to="/">Back</Link>
        </div>
    }
}
