import React, { Component } from 'react';
import Tappable from 'react-tappable';
import {delayRun} from './../../lib/utils';

/*
 参数:
 blurclose
 title:标题栏文字,不设置则隐藏标题栏
 isFullscreen:是否全屏
 */
export default class extends Component {
    static propTypes = {}

    constructor(props) {
        super(props);
        const {option = {}} = props;
        const {title = ""} = option;
        this.state = {
            showClass: false,
            title: title,
        }
        this.handleclosepopup = this.handleclosepopup.bind(this);
        this.handlechangetitle = this.handlechangetitle.bind(this);
        this.mounted = false;
    }

    componentWillReceiveProps(nextProps) {
        const {willremoving} = nextProps;
        if (willremoving) {
            delayRun(() => {
                this.toberemoving(nextProps);
            }, 40, (err) => {
                console.error("popupex. toberemoving error:" + err);
            });
        }
    }

    toberemoving(nextProps) {
        if (this.mounted) {
            const {popupKey, actions} = nextProps;
            this.setState({showClass: false});
            delayRun(() => {
                this.setState({showClass: false});
                actions.hidepopupdone({key: popupKey})
            }, 400, (err) => {
                console.error("popupex .toberemoving .hidepopupdone error:" + err);
            });
        }
    }

    handlechangetitle(newtitle) {
        this.setState({
            title: newtitle + " "
        });
    }

    componentDidMount() {
        this.mounted = true;
        const {willremoving} = this.props;
        if (!willremoving) {
            delayRun(() => {
                this.setState({showClass: true})
            }, 40, (err) => {
                console.error("popupex .componentDidMount error:" + err);
            });
        } else {

        }
    }

    render() {
        const {componentInst, option, handleclosepopup} = this.props;
        const {blurclose, title = "", isFullscreen} = option;
        const className_bg = 'fullscreen ' + (this.state.showClass ? 'fullscreen_show' : "");
        const className_body = 'popup'
            + ' ' + (isFullscreen ? 'popup_fullscreen' : "")
            + ' ' + (option.transparent ? 'popup_transparent' : "")
            + ' ' + (this.state.showClass ? 'popup_show' : "");
        return <div>
            <style jsx>{`
            {
                popup_title:{
                    backgroundColor: '#fbf9fe',
                    borderBottom: '1px solid #ececec',
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    height:'40px',
                },
                popup_body: {
                    marginTop:'40px',
                    minHeight:'100px',
                },
                popup_body_fullscreen: {
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: '40px',
                    bottom: 0,
                    overflow: 'auto',
                    marginTop:0,
                },
                popup_body_notitle:{
                    top:'0 !important',
                    marginTop:0,
                },
                fullscreen: {
                    position: 'fixed',
                    height: '100%',
                    width:'100%',
                    left:0,
                    right:0,
                    top:0,
                    bottom:0,
                    backgroundColor:'rgba(0,0,0,0)',
                    overflow:'scroll',
                    transition:${(typeof window ==="object" && window.iOS)?'0.4s':""},
                    webkitTransition:${(typeof window ==="object" && window.iOS)?'0.4s':""},
                },
                fullscreen_show: {
                    backgroundColor:'rgba(0,0,0,0.35)',
                    transition:${(typeof window ==="object" && window.iOS)?'0.5s':""},
                    webkitTransition:${(typeof window ==="object" && window.iOS)?'0.5s':""},
                },
                popup:{
                    position:'absolute',
                    bottom:0,
                    left:0,
                    right:0,
                    maxHeight:'100%',
                    overflow:'scroll',
                    backgroundColor:'#fbf9fe',
                    transform:'translate3d(0,100%,0)',
                    webkitTransform:'translate3d(0,100%,0)',
                    transition:${(typeof window ==="object" && window.iOS)?'0.4s':""},
                    webkitTransition:${(typeof window ==="object" && window.iOS)?'0.4s':""},
                },
                popup_fullscreen: {
                    top:0,
                },
                popup_transparent: {
                    backgroundColor: 'rgba(0,0,0,0.1)',
                },
                popup_show: {
                    transform: 'translate3d(0,0,0)',
                    webkitTransform: 'translate3d(0,0,0)',
                    transition: ${(typeof window ==="object" && window.iOS)?'0.5s':""},
                    webkitTransition: ${(typeof window ==="object" && window.iOS)?'0.5s':""},
                }
            }
            `}</style>
            <Tappable component="div"
                      className={className_bg}
                      onTap={() => {
                          blurclose ? handleclosepopup() : ""
                      }}>
            </Tappable>
            <div className={className_body}>
                {this.state.title &&
                <div className='weui-row popup_title'>
                    <div className="weui-col-25"> </div>
                    <div className="weui-col-50"> {this.state.title} </div>
                    <Tappable component="div"
                              className="weui-col-25 tRight paddingRight15px"
                              onTap={() => {
                                  handleclosepopup()
                              }}>
                        <span className="fa fa-close fa-1x gray"> </span>
                    </Tappable>
                </div>
                }
                <div
                    className={'popup_body ' + (!title ? 'popup_body_notitle' : "") + ' ' + (isFullscreen ? 'popup_body_fullscreen' : "") }>
                    {React.cloneElement(componentInst,
                        {
                            closepopup: handleclosepopup,
                            changetitle: this.handlechangetitle
                        }
                    )}
                </div>
            </div>
        </div>
    }
};