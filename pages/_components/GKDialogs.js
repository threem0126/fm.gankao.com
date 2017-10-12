import React from 'react'
import Router from 'next/router'
import * as types from './../../constants'
import W from './../../lib/WEUI'
import {filter,indexOf} from 'lodash'

class GKDialogs extends React.Component {
    static propTypes = {
    }
    constructor(props) {
        super(props);
        this.state = {
            dialogs: []
        }
    }

    componentDidMount() {
        let {onRegisterAppendListen} = this.props
        if (onRegisterAppendListen)
            onRegisterAppendListen(this.AppendDialogFromExtral)
    }

    componentWillUnmount() {
        let {onRegisterAppendListen} = this.props
        if (onRegisterAppendListen)
            onRegisterAppendListen(null)
    }

    AppendDialogFromExtral = (dialogItem)=> {
        console.log('AppendDialogFromExtral:')
        let {dialogs} = this.state;
        if(indexOf(dialogs,item=>item.key === dialogItem.key).length>0) {
            console.log(`重复的对话框调用`)
        }
        dialogs.push(dialogItem)
        this.setState({dialogs})
    }

    componentWillReceiveProps(nextProps) {
    }

    hidedialog = ({key})=> {
        console.log('hidedialog...')
        let {dialogs} = this.state;
        dialogs = filter(dialogs, (item)=>item.key !== key )
        console.log(dialogs)
        this.setState({dialogs})
    }

    render() {
        const {dialogs=[]} = this.state;
        console.log(dialogs)
        return <div>
            {
                dialogs.map((dialog, i) => {
                    switch (dialog.dialogType) {
                        case types.DIALOG_ALERT:
                        case types.DIALOG_CONFIRM:
                        case types.DIALOG_MSG:
                            if (dialog.dialogType === types.DIALOG_ALERT) {
                                if (dialog.buttons.length === 0) {
                                    dialog.buttons.push({
                                        label: '确定',
                                        className: 'font16',
                                        onClick: ((closeDialog) => {
                                            closeDialog();
                                        })
                                    });
                                }
                            }
                            dialog.buttons.map((button, m) => {
                                button.className += ' font16 ';//追加而不是覆盖
                                let oldClick = button.onClick;
                                button.onClick = () => {
                                    if (oldClick) {
                                        oldClick(() => {
                                            this.hidedialog({key: dialog.key});
                                        });
                                    } else {
                                        this.hidedialog({key: dialog.key});
                                    }
                                }
                            });
                            if (dialog.dialogType === types.DIALOG_ALERT) {
                                return (
                                    <W.Dialog key={'dialog_' + dialog.key} title={dialog.title} show={true}
                                           buttons={dialog.buttons}>
                                        {dialog.message}
                                    </W.Dialog>
                            );
                            } else if (dialog.dialogType === types.DIALOG_CONFIRM) {
                                return (
                                    <W.Dialog key={'dialog_' + dialog.key} title={dialog.title} show={true}
                                             buttons={dialog.buttons}>
                                        {dialog.message}
                                    </W.Dialog>
                                );
                            } else if (dialog.dialogType === types.DIALOG_MSG) {
                                const {icon} = dialog;
                                return (<div key={'dialog_' + dialog.key} className="page"><W.Msg
                                    type={icon} {...dialog}> </W.Msg></div>  );
                            }
                            break;
                        case types.DIALOG_ACTIONSHEET:
                            dialog.menus.map((button, m) => {
                                let oldClick = button.onClick;
                                button.onClick = () => {
                                    if (oldClick) {
                                        oldClick(() => {
                                            this.hidedialog({key: dialog.key});
                                        });
                                    } else {
                                        this.hidedialog({key: dialog.key});
                                    }
                                }
                            });
                            dialog.actions.map((button, m) => {
                                let oldClick = button.onClick;
                                button.onClick = () => {
                                    if (oldClick) {
                                        oldClick(() => {
                                            this.hidedialog({key: dialog.key});
                                        });
                                    } else {
                                        this.hidedialog({key: dialog.key});
                                    }
                                }
                            });
                            let oldonRequestClose = dialog.onRequestClose;
                            dialog.onRequestClose = () => {
                                if (oldonRequestClose) {
                                    oldonRequestClose(() => {
                                        this.hidedialog({key: dialog.key});
                                    });
                                } else {
                                    this.hidedialog({key: dialog.key});
                                }
                            }
                            return <W.ActionSheet key={'dialog_' + dialog.key} menus={dialog.menus}
                                                actions={dialog.actions}
                                                show={true}
                                                onRequestClose={dialog.onRequestClose}> </W.ActionSheet>;
                            break;
                        case types.DIALOG_TOAST:
                            if (dialog.ontoastShowed) {
                                (async () => {
                                    await dialog.ontoastShowed(() => {
                                        this.hidedialog({key: dialog.key})
                                    })
                                })();
                            }else {
                                setTimeout(() => {
                                    console.log('ready hidedialog...')
                                    this.hidedialog({key: dialog.key})
                                }, dialog.timeout || 2000);
                            }
                            return <W.Toast key={'dialog_' + dialog.key} icon={dialog.icon} iconSize={dialog.iconSize}
                                          show={true}>{dialog.message}</W.Toast>;
                        default:
                            return "";
                    }
                })
            }
        </div>
    }
}

export default GKDialogs