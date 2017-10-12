import React from 'react'
import {Link} from 'react-router'

export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        return <div style={{padding:'50px'}}>
            P2,
            <Link to="/">Back</Link>
        </div>
    }
}
