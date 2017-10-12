import React from 'react'
import W from './../../lib/WEUI'

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            opacity:1
        }
    }

    componentDidMount = async()=> {
        this.startCountDown()
    }

    startCountDown = ()=>{
        if(this.timer)
            clearTimeout(this.timer)

        let {close} = this.props
        if (close) {
            this.timer = setTimeout(() => {
                close()
            }, 7000)
        }
    }

    componentWillReceiveProps() {
        let times = 6
        this.interval = setInterval(() => {
            this.setState({opacity: 1 - (times % 2) / 2})
            times--;
            if (times === 1) {
                clearInterval(this.interval)
            }
        }, 100)
        this.startCountDown()
    }

    browserType = ()=> {
        if (typeof window !== "object") {
            return 'server'
        } else {
            let ua = window.navigator.userAgent.toLowerCase()
            if (ua.indexOf('micromessenger') !== -1) {
                return "weixin"
            } else if (ua.indexOf('gankao') !== -1) {
                return "app"
            } else if (ua.indexOf('qq') !== -1) {
                return "qq"
            } else {
                return ''
            }
        }
    }

    isAndroid = ()=> {
        if (typeof window !== "object")
            return false
        return window.navigator.userAgen.indexOf('Android') > -1 || u.indexOf('Adr') > -1
    }

    isiOS = ()=> {
        if (typeof window !== "object")
            return false
        return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    }

    render() {
        let {msgType,close,funcname=''} = this.props
        let bt = this.browserType()
        console.log(bt)
        if(msgType==="share") {
            switch (bt) {
                case "weixin":
                    msgType = `点击右上角按钮，然后在弹出的菜单中，点击在[发送给好友]，即可分享${funcname}`
                    break;
                case "app":
                    msgType = `点击右上角按钮，然后在弹出的菜单中，点击在[微信好友]，即可分享${funcname}`
                    break;
                default:
                    msgType='没有匹配到预定义的提示语，请将组件属性设置为msgType=custom，并设置标签内元素'
            }
        }else if(msgType==="openbrowser") {
            if (bt === "weixin") {
                msgType = `点击右上角按钮，然后在弹出的菜单中，点击${this.isAndroid() ? "[在浏览器中打开]" : "[在Safari中打开]"}，即可使用${funcname}`
            } else if (bt === "app") {
                msgType = `点击右上角按钮，然后在弹出的菜单中，点击[拷贝/复制地址]，并在浏览器中访问地址，即可使用${funcname}`
            } else {
                msgType = '没有匹配到预定义的提示语，请通过custom组件属性来设置'
            }
        }
        return <div className="top_shareHintPanel" style={{opacity:this.state.opacity}} onClick={close}>
            <style jsx>{`
                .top_shareHintPanel{
                    padding:20px 15px;
                    font-size:14px;
                    color:white;
                    background-color:#444;
                    margin:0;
                    position: relative;
                    display: flex;
                    align-items: center;
                    box-shadow:0 -5px 15px #222 inset;
                    -moz-box-shadow:0 -5px 15px #222 inset;
                    -webkit-box-shadow:0 -5px 15px #222 inset;
                    box-shadow:0 -5px 15px #222 inset;
                }
                .head{
                    flex: 1;
                }
                .foot{
                    flex:0;
                }
            `}</style>
            <div className="head">{this.props.children||msgType}</div>
            <div className="foot">
                <img style={{width:'70px'}} src="data:image/png;base64,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" />
            </div>
        </div>
    }
}
