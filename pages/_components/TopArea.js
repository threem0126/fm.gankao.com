import React from 'react'

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            com: null
        }
    }

    componentDidMount() {
        let {onRegisterOnTopFixAreaShowListen} = this.props;
        if (onRegisterOnTopFixAreaShowListen)
            onRegisterOnTopFixAreaShowListen(this.setTopComponentExtral)
    }

    componentWillUnmount() {
        let {onRegisterOnTopFixAreaShowListen} = this.props;
        if (onRegisterOnTopFixAreaShowListen)
            onRegisterOnTopFixAreaShowListen(null)
    }

    setTopComponentExtral = (components) => {
        this.setState({com: components})
    }

    handleclosepopup = ()=>{
        this.setState({com: null})
    }

    render() {
        if (!this.state.com) {
            return null
        } else {
            return React.cloneElement(this.state.com,
                {
                    close: this.handleclosepopup
                }
            )
        }
    }
}