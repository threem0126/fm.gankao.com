import React from 'react'
import W from './../../lib/WEUI'
import Router from 'next/router'

export default (props)=> {
    console.log(props)
    let {type='success' ,title=' ', description=' ', buttons=[]} = props
    return (
        <W.Msg type={type}
               title={title}
               description={description}
               buttons={buttons.map((item) => {
                   let {label, link, linkquery} = item
                   return {
                       label,
                       onClick: () => {
                           if (link.indexOf('http') === 0) {
                               window.location.href = link
                           } else {
                               Router.push({
                                   pathname: link,
                                   query: linkquery
                               })
                           }
                       }
                   }
               })}/>
    )
}
