import React from 'react'
import {Link} from 'react-router'
import W from './../../../lib/WEUI'


export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        let style = {
            borderBottom: "1px solid #F0F0F0",
            display: "flex",
            justifyContent: "space-between",
            paddingTop: "10px"
        };
        let subComment_elems = <div className="item" style={style}>
            <div className="left" style={{border: "0 solid blue"}}>
                图像
            </div>
            <div className="right" style={{width: "calc(100% - 63px)", border: "0px solid blue"}}>
                <div style={{border: "0px solid pink", display: "flex", justifyContent: "space-between"}}>
                        <span style={{
                            fontSize: "14px",
                            color: "rgb(21, 184, 255)",
                            display: "block",
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            width: "150px",
                        }}>李波</span>
                    <div className="deleteOneGrade" style={{color: "#969696", fontSize: "12px", display: "block"}}
                         onClick={() => {
                         }}>
                        删除
                    </div>
                </div>
                <div className="test2" style={{
                    color: "#646464",
                    fontSize: "14px",
                    border: "0px solid black",
                    marginTop: "10px"
                }}>
                    <div style={{display: "inline-block"}}>Fm很棒</div>
                </div>
                <div style={{display: "flex", justifyContent: "space-between", marginTop: "10px"}}>
                    <div
                        style={{
                            height: "20px",
                            border: "0px solid black",
                            fontSize: "10px",
                            color: "#969696"
                        }}>
                        <span>2017-10-11</span>
                    </div>
                    <div style={{
                        // height: "20px",
                        color: "#969696",
                        fontSize: "12px",
                        border: "0px solid black",
                        display: "flex",
                        justifyContent: "space-between",
                    }}>
                        <div style={{marginRight: "10px"}} onClick={() => {

                        }}>
                            {/*<img
                                src={infoIcon}
                                style={{width: "11px"}}
                                alt=""/>*/}
                            <span
                                style={{
                                    marginLeft: "2px",
                                    fontSize: "12px"
                                }}>
                                回复
                                </span>
                        </div>
                        <div onClick={() => this.dianZan(item.id)}>
                            {/*<img
                                src={item.goodCount === 0 ? likeIcon : blueHert} style={{width: "11px"}} alt=""/>*/}
                            <span
                                style={{
                                    marginLeft: "2px",
                                    fontSize: "12px"
                                }}>赞
                                </span>
                        </div>
                    </div>
                </div>
                {/*二级评论*/}
                <div
                    style={{
                        width: "100%",
                        marginTop: "20px",
                        background: "#F7F7F7",
                        paddingLeft: "10px",
                        paddingTop: "5px",
                        paddingBottom: "5px"
                    }}>
                    <div style={{
                        height: "20px",
                        border: "0px solid red",
                        display: "flex",
                        justifyContent: "space-between"
                    }}>
                        <div className="left" style={{
                            // width: "50%",
                            height: "20px",
                            border: "0px solid blue",
                            color: "#646464",
                            fontSize: "12px",
                            textOverflow: "ellipsis",
                            position: "relative",
                            display: "flex",
                        }}>
                                        <span style={{
                                            display: "block",
                                            width: "40px",
                                            overflow: "hidden",
                                            color: "rgb(21, 184, 255)",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap"
                                        }}>刘陈</span>
                            <span style={{
                                display: "block",
                                width: "50px",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap"
                            }}>111</span>
                        </div>
                        <div className="right" style={{
                            height: "20px",
                            border: "0px solid blue",
                            color: "#969696",
                            fontSize: "10px",
                            paddingRight: "10px"
                        }}>
                            <span style={{display: "block"}}>2017-09-01</span>
                        </div>
                    </div>
                    <div onClick={() => {
                    }} style={{
                        color: "#15B8FF",
                        fontSize: "12px",
                        width: "91px",
                        margin: "10px auto 0",
                    }}>
                        查看全部回复>>
                    </div>
                </div>


            </div>
        </div>
        return <W.Article>
            {/*P2,*/}
            {/*<Link to="/">Back</Link>*/}
            {subComment_elems}


        </W.Article>
    }
}
