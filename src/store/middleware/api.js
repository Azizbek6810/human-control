import {Base64} from "js-base64";
import axios from "axios";

const api = ({dispatch}) => (next) => (action) => {
    // debugger
    if (action.type !== 'api/apiCall') {
        next(action)
        return
    }

    next(action)

    const token = localStorage.getItem('posToken')

    const {url, method, data, params, onStart, onSuccess, onFail} = action.payload

    const authorization = token ? {'Authorization': `Bearer ${Base64.decode(token)}`} : null

    dispatch({type: onStart});

    axios({
        baseURL: 'http://104.236.67.87:1000/',
        url,
        method,
        data,
        params,
        headers: authorization
    }).then(res => {
        if (res.status === 200 && res.data.status.code === 0) {
            dispatch({
                type: onSuccess,
                payload: res.data
            })
        } else {
            dispatch({
                type: onFail,
                payload: res.data.message
            })
        }
    }).catch(err => {
        dispatch({
            type: onFail,
            payload: err.response
        })
    })


}

export default api