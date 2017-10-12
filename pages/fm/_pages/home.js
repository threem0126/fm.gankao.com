import React from 'react'
import {Link} from 'react-router'

export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        return <div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/p1">p1-subpage</Link></li>
                <li><Link to="/p2">p2-subpage</Link></li>
            </ul>
            {this.props.children &&
            this.props.children
            }
            {!this.props.children &&
            <div>HomePage, please select subpage!</div>
            }
        </div>
    }
}
