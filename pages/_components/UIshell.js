import React from 'react'
import GKApp from './GKApp'
import * as types from './../../constants'
import GKDialogs from './GKDialogs'
import {hashcode} from './../../lib/tools'
import TopArea from './../_components/TopArea'
import MsgFormServer from './../_components/MsgFormServer'

//region 内部逻辑处理
let __updateAppUIshellStateHandle;
let __appendDialogHandle;
let __appendTopFixAreasHandle;
let __appendPopupHandle;
let _style = 'asdf';

const onRegisterListen_UpdateAppUIshellState = (updateHandle)=>{
    __updateAppUIshellStateHandle = updateHandle
}

const handleRegisterAppendListen = (updateHandle)=>{
    __appendDialogHandle = updateHandle
}
const handleRegisterPopupAppendListen = (updateHandle)=>{
    __appendPopupHandle = updateHandle
}
const handleRegisterOnTopFixAreaShowListen = (updateHandle)=>{
    __appendTopFixAreasHandle = updateHandle
}
const appendDialog = (dialogInfo)=> {
    if (__appendDialogHandle)
        __appendDialogHandle(dialogInfo)
}
const appendPopup = (popupInfo)=> {
    if (__appendPopupHandle)
        __appendPopupHandle(popupInfo)
}
//endregion


//region 对外接口
/*
替换组件原来的render方法，做一个JSX的注入调用，实现page组件外围套上一层GKApp组件
 */
export const wrapPage = (page, props)=> {
    if (!page.render)
        throw `传入的page对象不存在render方法，请适用标准的react component组件`
    let _page = page
    let render_ori = _page.render
    render_ori.bind(_page)
    page.render = function () {
        let {___renderMsgFormServer} = props || {}
        return <GKApp onRegisterStateListen={onRegisterListen_UpdateAppUIshellState}>
            <TopArea onRegisterOnTopFixAreaShowListen={handleRegisterOnTopFixAreaShowListen}/>
            {!___renderMsgFormServer &&
            render_ori()
            }
            {___renderMsgFormServer &&
            <MsgFormServer {...___renderMsgFormServer}/>
            }
            <GKDialogs onRegisterAppendListen={handleRegisterAppendListen}/>
            {/*<GKPopupPanel onRegisterPopupAppendListen={handleRegisterPopupAppendListen}> </GKPopupPanel>*/}
        </GKApp>
    }
}

export const updateAppShellUIState = (states)=>{
    if(__updateAppUIshellStateHandle)
        __updateAppUIshellStateHandle(states)
}

export const showOnTop = (component)=> {
    if (__appendTopFixAreasHandle)
        __appendTopFixAreasHandle(component)
}

export const showPopup = ({componentInst, option={blurclose:true}}) => {
    appendPopup({
        componentInst,
        option,
        key: "popup_" + Math.random(),
        willremoving: false
    })
}

/**
 * 显示对话框的基础方法
 * @param dialogType    对话框类型
 * @param title         标题文字
 * @param buttons       按钮组
 * @param message       提示信息
 * @param menus         ？？
 * @param actions       用于显示ActionSheet的菜单列表
 * @param onRequestClose    当对话框即将关闭时
 * @param description   详细描述，？？
 * @param extraText     Msg组件底部的文字
 * @param extraHref     Msg组件底部文字的链接
 * @param ontoastShowed 当Toast显示时
 * @param timeout       对话框自动多久关闭（Toast适用）
 * @param icon          对话框图标，Msg适用
 * @param iconSize      对话框图标的尺寸
 */
export const showDialog = ({dialogType=types.DIALOG_ALERT, title,  buttons=[], message, menus, actions=[], onRequestClose,description,extraText,extraHref,ontoastShowed,timeout,icon,iconSize})=> {
    //在reducer中, key将用来检测防止重复调用
    const keyValue = "dialog_" + hashcode(`${dialogType}.${title}.${buttons.map(m => m.title | "btn")}.${message}.${description}.${Math.random()}`);
    appendDialog({
        dialogType,
        title,
        buttons: buttons || [],
        message,
        menus: menus || [],
        actions: actions || [],
        onRequestClose,
        icon,
        description,
        extraText,
        extraHref,
        ontoastShowed,
        timeout,
        iconSize,
        key: keyValue
    })
}

/**
 *
 * @param params
 */
export const showAlert = (...params)=> {
    if (params.length === 0)
        throw 'showAlert方法调用，未传递参数'
    if (typeof params[0] === "object") {
        let {title = '', message = '', buttons = []} = params[0]
        showDialog({
            title,
            message,
            buttons,
            dialogType: types.DIALOG_ALERT
        });
    } else if (typeof params[0] === "string") {
        return new Promise((resolve, reject) => {
            showDialog({
                title: params[0],
                message: params.length > 1 ? params[1] : '',
                buttons: [
                    {
                        label: '确定',
                        onClick: (closeDialog) => {
                            closeDialog()
                            setTimeout(() => {
                                resolve(true)
                            }, 10)
                        }
                    }
                ]
            });
        });
    }
}

export const showError = (gkerror)=> {
    return showDialog({
        title: '遇到错误',
        message: gkerror.more || gkerror.message,
        dialogType: types.DIALOG_ALERT
    });
}

/**
 *
 * @param menus     选项列表
 * @param actions   操作按钮列表（取消按钮区）
 */
export const showActionSheet = ({menus=[], actions=[]})=> {
    if (actions.length === 0) {
        actions = [{
            label: '取消',
            onClick: ((closeDialog) => {
                closeDialog();
            }).bind(this)
        }]
    }
    return showDialog({
        menus: menus,
        actions,
        dialogType: types.DIALOG_ACTIONSHEET
    });
}

/**
 *
 * @param message
 * @param icon
 * @param timeout
 * @param ontoastShowed
 */
export const showToast = ({message=' ',icon='loading', timeout=2000, ontoastShowed})=> {
    return showDialog({
        icon,
        message,
        timeout,
        ontoastShowed,
        dialogType: types.DIALOG_TOAST
    });
}

/**
 *
 * @param title
 */
export const showSharehint = (title)=> {
    return showDialog({
        title: title || " ",
        dialogType: types.DIALOG_SHAREHINT
    });
}

/**
 *
 * @param type
 * @param title
 * @param description
 * @param buttons
 * @returns {{___renderMsgFormServer: {type: string, title: string, description: string, buttons: Array}}}
 */
export const renderAlertPage = ({type='success' ,title=' ', description=' ', buttons=[]})=> {
    return {
        ___renderMsgFormServer: {type, title, description, buttons}
    }
}

/**
 *
 * @param error
 * @param returnUrl
 * @returns {{___renderMsgFormServer: {type: string, title: string, description: string, buttons: Array}}}
 */
export const renderErrorPage = (error, returnUrl)=> {
    console.error(error)
    console.error(error.status)
    console.error(error.stack)
    let {more, message} = error
    let buttons = [];
    if(typeof returnUrl ==="string" ) {
        buttons.push({
            link: returnUrl || '',
            title: '返回'
        })
    }
    return renderAlertPage({
        type: 'warn',
        title: '遇到错误啦',
        description: more || message,
        buttons:buttons
    })
}


export const setUIStyle = (styleName) => {
    _style = styleName
}

export const getUIStyle = () => {
    return _style
}
//endregion