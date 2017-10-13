/**
 * Created by libo on 2017/10/13.
 */

import React from 'react';
import W from './../../../lib/WEUI'
export default class extends React.Component{
    constructor (props){
        super(props)
        this.state={

        }
    }

    render=()=>{
        return (<div>
            {/*<div className="weui-mask" onClick={() => {
                this.props.hide(false)
            }}>
            </div>*/}
            <div style={{
                width: "100%",
                height: "200px",
                background: "white",
                position: "fixed",
                top: "100px",
                left: "0",
                right: "0",
                zIndex: "100000000"
            }}>
                <div style={{
                    margin: "0 15px",
                    height: "44px",
                    border: "0px solid red",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <div className="cancel_LI" onClick={() => {
                        {/*this.props.hide(false)*/}
                    }} style={{fontSize: "14px", color: "#969696"}}>取消
                    </div>
                    <div className="release_LI"
                         style={{fontSize: "14px", color: "#3CC51F"}}>发布
                    </div>
                </div>
                <W.Form>
                    <W.FormCell>
                        <W.CellBody>
                            <W.TextArea
                                onChange={e => {
                                }}
                                placeholder="请输入..."
                                rows="4"
                                maxlength="255"
                                autoFocus={true}>
                            </W.TextArea>
                        </W.CellBody>
                    </W.FormCell>
                </W.Form>

            </div>

        </div>)

    }
}