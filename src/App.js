import { useState, useEffect } from 'react'

import LoggedInRoutes from './components/routes/LoggedInRoutes';
import LoggedOutRoutes from './components/routes/LoggedOutRoutes';
import { useGlobal } from './providers/GlobalProvider'
import { isTokenAlive, getToken } from './utils/utils';

import './styles/style.scss'

function App() {

    const { setUserID, setUserName, setUserRole, authStatus, setAuthStatus, setInvalidToken } = useGlobal()

    useEffect(() => {
        if(!isTokenAlive()) return setAuthStatus('loggedOut')
        let token = getToken()
        if(!(token?.userID && token?.role)) return setAuthStatus('loggedOut')
        setUserID(token.userID)
        setUserName(token.name)
        setUserRole(token.role)
        setAuthStatus('loggedIn')
    }, [authStatus])  

    function handleSignInSuccess(data) {
        if(!(data.user.userID && data.user.role && data.token)) return
        setUserID(data.user.userID)
        setUserRole(data.user.role)
        sessionStorage.setItem("token", data.token)
        setInvalidToken(false)
        setAuthStatus('loggedIn')
    }

    function logOut() {
        sessionStorage.removeItem("token")
        setUserID(undefined)
        setUserRole(undefined)
        setAuthStatus('loggedOut')
    }

    return (
        <>
            {authStatus === "loggedIn" 
                && <LoggedInRoutes logOut={logOut} handleNewTokenSuccess={handleSignInSuccess}/>
            }
            {authStatus === "loggedOut" 
                && <LoggedOutRoutes handleSignInSuccess={handleSignInSuccess}/>
            }
        </>
    );
}

export default App;


