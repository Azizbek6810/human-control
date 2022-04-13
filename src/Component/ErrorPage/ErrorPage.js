import React from 'react';
import {useHistory} from "react-router-dom";


function ErrorPage(props) {

    const history = useHistory()
    return (
        <div className={'error'}>
            <button className={'btnError'} type={'button'}
                    onClick={() => history.push('/')}>Back to
                home
            </button>
        </div>
    );
}

export default ErrorPage;