/**
 * Created by libo on 2017/10/12.
 */
import React from 'react';
import {Link} from 'react-router'
import W from './../../../lib/WEUI'
import CommentImputArea from './CommentImputArea'

export default  class  extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            //单个品论详情
            comment: "",
            //单个评论详情的回复内容[]
            subComment: [],
            ///是否显示发表评论的输入框
            isShowInputArea: false,
            showToast: false,
            showLoading: false,
            toastTimer: null,
            loadingTimer: null,
            //单个评论的Id
            replayComentId: "",
            //接口调用失败以后Dialog提示用户
            showDialogInfo: false,
            err:null,
            style1: {
                buttons: [
                    {
                        label: 'Ok',
                        onClick: this.hideDialog.bind(this)
                    }
                ]
            },
        }
    }

    render = () => {
        let commentElement = <div>
            <div>
                {/*<CommentImputArea>*/}

                {/*</CommentImputArea>*/}
                <div style={{margin: "10px 15px 57px", border: "0px solid #ECECEC"}}>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "10px",
                    }}>
                        <div className="left" style={{
                            height: "100px",
                        }}>
                            {/*<img src={comment.headimgurl} style={{width: "39px", borderRadius: "50%"}} alt=""/>*/}
                            图像
                        </div>
                        <div className="right" style={{
                            width: "calc(100% - 63px)",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between"
                        }}>
                            <div style={{display: "flex", justifyContent: "space-between"}}>
                        <span style={{
                            color: "rgb(21, 184, 255)",
                            fontSize: "14px",
                            display: "block",
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            width: "100px"
                        }}>
                            李波
                        </span>
                                <span
                                    onClick={() => {
                                        this.handleDeleteComment(replayComentId)
                                    }}
                                    style={{
                                        color: "rgb(21, 184, 255)",
                                        fontSize: "12px",
                                        // display: currentUserId !== parseInt(comment.reguserId) || currentUserId === 0 ? "none" : "block"
                                    }}>删除
                            </span>
                            </div>
                            <div style={{color: "#646464", fontSize: "14px"}}>神评论，赞</div>
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center"
                            }}>
                                <div style={{
                                    width: "70%",
                                    color: "#969696",
                                    fontSize: "12px",
                                    textAlign: "left",
                                }}>
                                    2017-09-17 13：19
                                </div>
                                <div style={{
                                    height: "18px",
                                    border: "0px solid black",
                                    display: "flex",
                                    justifyContent: "space-between"
                                }}>
                                    <div className="right" onClick={() => {
                                        {/*this.handleRemarkGood(comment.id)*/
                                        }
                                    }} style={{
                                        width: "63px",
                                        height: "18px",
                                        display: "flex",
                                        justifyContent: "space-around",
                                        alignItems: "center",
                                        borderRadius: "100px",
                                        background: "#EDEDED"
                                    }}>
                                <span>
                                    {/*<img src={comment.goodCount === 0 ? likeIcon : blueHert} style={{width: "11px"}}
                                     alt=""/>*/}
                                </span>
                                        <span
                                            style={{
                                                color: "#969696",
                                                fontSize: "12px"
                                            }}>
                                        {/*{comment.goodCount === 0 ? "赞" : comment.goodCount}*/}
                                            赞
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*评论回复*/}
                    <div style={{background: "#F7F7F7"}}>
                        <div className="commentList_li"
                             style={{
                                 margin: "0 10px",
                                 borderBottom: "1px solid #F0F0F0",
                                 display: "flex",
                                 justifyContent: "space-between",
                                 paddingTop: "10px"
                             }}>
                            <div className="left">
                                {/*<img src={subItem.headimgurl} style={{width: "32px", borderRadius: "50%"}} alt=""/>*/}
                                图像
                            </div>
                            <div className="right" style={{
                                width: "calc(100% - 53px)",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between"
                            }}>
                                <div style={{display: "flex", justifyContent: "space-between"}}>
                                <span style={{
                                    fontSize: "12px",
                                    color: "rgb(21, 184, 255)",
                                    display: "block",
                                    width: "110px",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap"
                                }}>陈长裕</span>
                                    <span onClick={() => {
                                        {/*this.handleDeleteCommentReply(subItem.id)*/
                                        }
                                    }} style={{
                                        color: "#15B8FF",
                                        fontSize: "10px",
                                        // display: currentUserId !== parseInt(subItem.reguserId) || currentUserId === 0 ? "none" : "block"
                                    }}>删除</span>
                                </div>
                                <div style={{color: "#646464", fontSize: "12px"}}>7766666555555</div>
                                <div style={{display: "flex", justifyContent: "space-between"}}>
                                    <div style={{
                                        color: "#969696",
                                        fontSize: "10px"
                                    }}>2017-08-24
                                    </div>
                                    <div onClick={() => {
                                        {/*this.handleRemarkGood(subItem.id)*/
                                        }
                                    }} style={{
                                        color: "#969696",
                                        fontSize: "10px",
                                        width: "54px",
                                        height: "15px",
                                        background: "#EDEDED",
                                        borderRadius: "100px",
                                        display: "flex",
                                        justifyContent: "space-around",
                                        alignItems: "center"
                                    }}>
                                    <span>
                                        {/*<img src={subItem.goodCount === 0 ? likeIcon : blueHert}*/}
                                        {/*style={{width: "8px", height: "9px"}} alt=""/>*/}
                                    </span>
                                        <span>
                                            {/*{subItem.goodCount === 0 ? "点赞" : subItem.goodCount}*/}
                                            点赞
                                            </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/*回复评论按钮*/}
                    <div onClick={() => {
                        {/*if (checkIsNeedLogin()) {
                            return
                        }
                        this.setState({isShowInputArea: true})*/}
                    }} style={{
                        height: "56px",
                        background: "#F9F9F9",
                        position: "fixed",
                        left: "0",
                        right: "0",
                        bottom: '0',
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center"
                    }}>
                        <div className="leftComment" style={{
                            width: "70%",
                            height: "36px",
                            border: "1px solid #ECECEC",
                            fontSize: "14px",
                            color: "#9F9F9F",
                            textIndent: "15px",
                            lineHeight: "36px",
                            borderRadius: "4px"
                        }}>回复评论...
                        </div>
                        <div className="rightBtn" style={{
                            width: "20%",
                            height: "36px",
                            background: "#15B8FF",
                            color: "white",
                            fontSize: "12px",
                            textAlign: "center",
                            lineHeight: "36px",
                            borderRadius: "4px"
                        }}>
                            评论
                        </div>
                    </div>


                </div>
            </div>
        </div>
        return <div>
            {commentElement}
        </div>
    }

}

