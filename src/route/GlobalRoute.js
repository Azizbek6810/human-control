import React from 'react'
import {Redirect, Route} from "react-router-dom";

function GlobalRoute({component: Component, ...rest}) {
    return (
        <Route {...rest} render={(props) =>
            localStorage.getItem('posToken') ?
                <Component {...props} /> : <Redirect to={{pathname: '/login', state: {from: props.location}}}/>}/>
    )
}

export default GlobalRoute