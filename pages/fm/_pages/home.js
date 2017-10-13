import React from 'react'
import Slider from "rc-slider";
import {Link} from 'react-router'
import CommentList from './CommentList'
import CommentInput from './CommentInput'
// import '../images/testImg.png'
import W from './../../../lib/WEUI'

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            tab:0,
        }
    }


    render = () => {
        return <div>
            {this.props.children &&
             this.props.children
             }
             {!this.props.children &&
             <ul>
             <li><Link to="/"><div className="App">
                 <div className="music">
                     <div className="wrp">
                         <div className="playerWr">
                             <div className="wrp">
                                 {/*fm标题*/}
                                 <div className="fmTitle">
                                     白雪公主
                                 </div>
                                 {/*转圈的图片*/}
                                 <div className="singer" style={{width: 240, height: 240, margin: '15px auto 0'}}>
                                     <div className="cycle" style={{
                                         width: "100%",
                                         height: '100%',
                                         borderRadius: '50%',
                                         border: "2px solid #6F7576",
                                     }}>
                                     </div>
                                 </div>
                                 <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                     <div className="houtui" onClick={this.handleR}>
                                         退
                                     </div>
                                     <div className="qianjin" onClick={this.handleSkip}>
                                         进
                                     </div>
                                 </div>
                             </div>
                         </div>
                     </div>
                     {/*进度条*/}
                     <div className="jindu" style={{border:"1px solid black",height:"4px"}}>

                     </div>
                     {/*当前时间和总时间显示*/}
                     <div className="timeShow">
                         <div className="currentTime" style={{color: "#969696", fontSize: "12px"}}>00:00</div>
                         <div className="duration"
                              style={{color: "#969696", fontSize: "12px"}}>
                             12:39
                         </div>
                     </div>
                     {/*播放按钮*/}
                     <div className="iconBtn">
                         {/*弹出列表*/}
                         <div className="btn" >
                             {/*<img src={musicList} style={{width: "21px"}} alt=""/>*/}
                             <div style={{fontSize: "10px", color: "#969696"}}>列表</div>
                         </div>
                         <div className="btn" onClick={this.prePlay}>
                             上一个
                             {/*<img src={currentFm === 0 ? pre : prePlay} style={{width: "38px"}} alt=""/>*/}
                         </div>
                         <div className="play" style={{width: "63px", height: "62px"}} onClick={this.play}>
                             播放
                             {/*<img src={this.state.ended ? play : pause} style={{width: "63px"}} alt=""/>*/}
                         </div>
                         {/*commenting-o*/}
                         <div className="btn"
                              onClick={this.nextPlay}>
                             {/*<img src={currentFm === music.length - 1 ? next : nextPlay} style={{width: "38px"}}*/}
                             {/*alt="下一曲"/>*/}
                             下一个
                         </div>
                         {/*弹出定时器列表选择*/}
                         <div className="btn" onClick={()=>{}}>
                             {/*<img style={{width: '21px'}} src={timeIcon} alt=""/>*/}
                             <div style={{fontSize: "10px", color: "#969696"}}>
                                 {/*{!this.state.startCountDownTime && "定时"}
                                  {this.state.startCountDownTime &&
                                  <TimeCounter
                                  ref="timeCounter"
                                  value={countDown}
                                  showMinute={true}
                                  onStep={({count, time}) => {
                                  this.setState({count});
                                  if (this.state.count === 0) {
                                  this.setState({startCountDownTime: false, ended: true})
                                  this.refs.audio.pause();
                                  }
                                  }}
                                  />}*/}
                                 定时
                             </div>
                         </div>
                     </div>
                     <CommentInput>
                         
                     </CommentInput>
                     <W.Tab>
                         <W.NavBar>
                             <W.NavBarItem active={this.state.tab===0} onClick={e=>this.setState({tab:0})}>
                                 详情
                             </W.NavBarItem>
                             <W.NavBarItem active={this.state.tab===1} onClick={e=>this.setState({tab:1})}>
                                 评论
                             </W.NavBarItem>
                         </W.NavBar>
                         <W.TabBody>
                             <W.Article style={{display: this.state.tab === 0 ? null : 'none'}}>
                                 {/*小编太懒，还没留下任何东西*/}
                             </W.Article>
                             <W.Article style={{display: this.state.tab === 1 ? null : 'none'}}>
                                 <CommentList>

                                 </CommentList>
                             </W.Article>
                         </W.TabBody>
                     </W.Tab>
                 </div>
             </div></Link></li>
             <li><Link to="/p1">p1-subpage</Link></li>
             <li><Link to="/CommentList">CommentList</Link></li>
             <li><Link to="/ReplyComment">ReplyComment</Link></li>
             <li><Link to="/FmList">FmList</Link></li>
             </ul>
             }

        </div>
    }
}
