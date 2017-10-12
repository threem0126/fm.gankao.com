import React from 'react'

export default class GKApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name:'-',
            dialogs:[]
        }
    }

    componentDidMount() {
        let {onRegisterStateListen} =this.props
        if(onRegisterStateListen)
            onRegisterStateListen(this.updateStateFromExtral)
    }

    componentWillUnmount() {
        let {onRegisterStateListen} =this.props
        if(onRegisterStateListen)
            onRegisterStateListen(null)
    }

    updateStateFromExtral = (states)=> {
        this.setState(states)
    }

    render() {
        return <div className="container">
            {this.props.children}
            {typeof window !== "object" &&
            <centerloading> <span className="fa fa-spinner fa-spin fa-1x white"> </span> 加载中... </centerloading>
            }
        </div>
    }
}