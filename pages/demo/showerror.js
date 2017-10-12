import React from 'react'
import * as UIshell from './../_components/UIshell'

export default class extends React.Component {
    // pathname - path section of URL
    // query - query string section of URL parsed as an object
    // asPath - String of the actual path (including the query) shows in the browser
    // req - HTTP request object (server only)
    // res - HTTP response object (server only)
    // jsonPageRes - Fetch Response object (client only)
    // err - Error object if any error is encountered during the rendering
    static async getInitialProps({req, res, pathname, query, asPath, err}) {
        return UIshell.renderErrorPage(new Error('错误的详细内容'))
    }

    constructor(props) {
        super(props);
        UIshell.wrapPage(this, props)
    }

    render = () => {
        return <div>Page</div>
    }
}
