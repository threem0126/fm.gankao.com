/**
 * Created by libo on 2017/10/13.
 */
import React from 'react';
export default class extends React.Component{
    constructor(props){
        super(props)
        this.state={

        }
    }

    render=()=>{
        return (<div style={{
            height: "56px",
            background: "#F9F9F9",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            position: "fixed",
            bottom: "0",
            left: "0",
            right: "0"
        }}>
            <div onClick={() => {
                {/*if(checkIsNeedLogin()){
                    return
                }*/}
                {/*this.props.show(true);*/}
            }} className="left" style={{
                // width: "65%",
                width: "75%",
                height: "30px",
                border: "1px solid #ECECEC",
                color: "#9F9F9F",
                lineHeight: "30px",
                borderRadius: "5px",
                background: "#FFFFFF",
                textIndent: "10px",
                fontSize: "14px"
            }}>
                写评论..
            </div>
            <div className="right" style={{
                // width: "20%",
                height: "40px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}>
                {/*<div className="comment" style={{
                 width: "25px",
                 height: "36px",
                 display: "flex",
                 flexDirection: "column",
                 alignItems: "center",
                 justifyContent: "space-between",
                 position: "relative"
                 }}>
                 <img src={commentBig} style={{width: "20px"}} alt=""/>
                 <div style={{color: "#969696", fontSize: "10px"}}>{this.props.subCommentCount}</div>
                 </div>*/}
                <div onClick={() => {
                    {/*if (checkIsNeedLogin()) {
                        return
                    }
                    this.props.likeSubject()*/}
                }} className="like" style={{
                    width: "25px",
                    height: "36px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}>
                   {/* <img src={goodMarkedByMe ? goodActive : likeIconBig} style={{width: "20px", height: "19px"}}
                         alt=""/>*/}
                    <div style={{color: "#969696", fontSize: "10px"}}>{/*{this.props.subGoodCount}*/}111</div>
                </div>
            </div>
        </div>)
    }
}