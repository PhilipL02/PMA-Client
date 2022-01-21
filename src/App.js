import { useState, useEffect } from 'react'

import LoggedInRoutes from './components/routes/LoggedInRoutes';
import LoggedOutRoutes from './components/routes/LoggedOutRoutes';

import { isTokenAlive, getToken } from './utils/utils';

import './styles/style.scss'

function App() {

    const [loggedInUserID, setLoggedInUserID] = useState()
    const [loggedInRole, setLoggedInRole] = useState()
    const [authStatus, setAuthStatus] = useState('idle')
    const [invalidToken, setInvalidToken] = useState(false)

    useEffect(() => {
        if(!isTokenAlive()) return setAuthStatus('loggedOut')
        let token = getToken()
        if(!(token?.userID && token?.role)) return setAuthStatus('loggedOut')
        setLoggedInUserID(token.userID)
        setLoggedInRole(token.role)
        setAuthStatus('loggedIn')
    }, [])  

    function handleSignInSuccess(data) {
        if(!(data.user.userID && data.user.role && data.token)) return
        setLoggedInUserID(data.user.userID)
        setLoggedInRole(data.user.role)
        sessionStorage.setItem("token", data.token)
        setAuthStatus('loggedIn')
    }

    function logOut() {
        sessionStorage.removeItem("token")
        setLoggedInUserID(undefined)
        setLoggedInRole(undefined)
        setAuthStatus('loggedOut')
    }

    return (
        <>
            {authStatus === "loggedIn" 
                && <LoggedInRoutes loggedInUserID={loggedInUserID} loggedInRole={loggedInRole} logOut={logOut} invalidToken={invalidToken} setInvalidToken={setInvalidToken}/>
            }
            {authStatus === "loggedOut" 
                && <LoggedOutRoutes handleSignInSuccess={handleSignInSuccess}/>
            }
        </>
    );
}

export default App;


