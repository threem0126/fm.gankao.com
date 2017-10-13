import React from 'react'
import * as UIshell from './../_components/UIshell'
import {Router,Route,hashHistory} from 'react-router'
import home from './_pages/home';
import p1 from './_pages/p1';
import CommentList from './_pages/CommentList';
import ReplyComment from './_pages/ReplyComment';
import FmList from './_pages/FmList';

export default class extends React.Component {
    // pathname - path section of URL
    // query - query string section of URL parsed as an object
    // asPath - String of the actual path (including the query) shows in the browser
    // req - HTTP request object (server only)
    // res - HTTP response object (server only)
    // jsonPageRes - Fetch Response object (client only)
    // err - Error object if any error is encountered during the rendering
    static async getInitialProps({req, res, pathname, query, asPath, err}) {
        return {}
    }

    constructor(props) {
        super(props);
        UIshell.wrapPage(this, props)
    }

    render() {
        if (typeof window !== "object") {
            return <div>loading...</div>
        }
        return <Router history={hashHistory}>
            <Route path="/" component={home}>
                <Route path="/p1" component={p1} />
                <Route path="/CommentList" component={CommentList}/>
                <Route path="/ReplyComment" component={ReplyComment}/>
                <Route path="/FmList" component={FmList}/>
            </Route>
        </Router>
    }
}


