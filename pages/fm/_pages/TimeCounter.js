/**
 * Created by libo on 2017/10/13.
 */
import React from 'react';
export default  class extends React.Component{
    constructor(props){
       super(props)
        this.initValue = this.props.value||0;
        this.state={
            count:this.initValue,
            time:"00:00"
        }
        //定义计时器
        this.interval = undefined;
        this.step = this.props.step || 1;
    }
    //停止计时
    stop=()=>{
        clearInterval(this.interval)
    }

    //开始计时
    start = () =>{
        this.stop()
        this.interval = setInterval(()=>{
            let count = this.state.count - this.step;
            this.props.onStep && this.props.onStep({count,time:this.state.time})
            let minute = Math.floor(count/60)
            if(minute<10){
                minute="0"+minute;
            }
            let seconds = Math.floor(count%60)
            if(seconds<10){
                seconds = "0" + seconds;
            }
            this.setState({count,time:`${minute}:${seconds}`})
        },1000)
    }


    restart=()=>{
        this.stop();
        this.setState({count:this.initValue})
        this.start()
    }
    componentDidMount() {
        this.props.autoStart && this.start();
    }
    componentWillUnmount() {
        this.stop();
    }
    render=()=>{
        let { style } = this.props
        return <div>
            <span style={{...style }}>{this.props.showMinute ? this.state.time : this.state.count}</span>)
        </div>
    }

}