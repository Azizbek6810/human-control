import {Suspense, lazy} from 'react'
import {Route, Switch} from "react-router-dom";
import GlobalRoute from "./GlobalRoute";
import Register from '../view/login/Register'
import ErrorPage from "../Component/ErrorPage/ErrorPage";
import Loading from "../Component/Loading/Loading";
import forgotPassword from '../view/login/forgotPassword'
import newPassword from '../view/login/newPassword'

const Login = lazy(() => import('../view/login/Login'))
const Sidebar = lazy(() => import('../Component/sidebar/Sidebar'))

function Routes() {
    return (
        <Suspense fallback={<Loading/>}>
            <Switch>
                <Route path={'/login'} component={Login}/>
                <Route path={'/register'} component={Register}/>
                <Route path={'/forgot-password'} component={forgotPassword}/>
                <Route path={'/new-password'} component={newPassword}/>
                <Route path={'/error404'} component={ErrorPage}/>
                <GlobalRoute path={'/'} component={props => <Sidebar {...props} />}/>
            </Switch>
        </Suspense>
    )
}

export default Routes