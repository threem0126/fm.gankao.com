import React from 'react'
import {PopupEx} from './GKPopup'
export default class GKApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '-',
            dialogs: []
        }
    }

    componentDidMount() {
        let {onRegisterPopupAppendListen} = this.props
        if (onRegisterPopupAppendListen)
            onRegisterPopupAppendListen(this.updateStateFromExtral)
    }

    componentWillUnmount() {
        let {onRegisterStateListen} = this.props
        if (onRegisterStateListen)
            onRegisterStateListen(null)
    }

    updateStateFromExtral = (states) => {
        this.setState(states)
    }

    render() {
        let {popups} = this.state
        return <div>
            {popups.map((popItem, i) => {
                const {key, ...others} = popItem;
                return <GKPopup key={key} popupKey={key} {...others} actions={actions}> </GKPopup>
            })}
        </div>
    }
}

