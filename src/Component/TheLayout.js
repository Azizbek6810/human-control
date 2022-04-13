import React from 'react'

import {Redirect, Route, Switch} from "react-router-dom";
import {routeList} from "../route/routeList";

function TheLayout() {

    return (
        <>
            <Switch>
                {routeList.map(item => (
                    <Route exact={true} path={item.path} component={item.component} key={item.key}/>
                ))}
                <Redirect from={'/**'} to={'/error404'}/>
            </Switch>
        </>
    )
}

export default TheLayout