import { useState, useEffect } from 'react'

import LoggedInRoutes from './components/routes/LoggedInRoutes';
import LoggedOutRoutes from './components/routes/LoggedOutRoutes';

import { isTokenAlive, getToken } from './utils/utils';
import { SERVER_URL } from './utils/constants';

import './styles/style.scss'

function App() {

    const [loggedInUserID, setLoggedInUserID] = useState()
    const [loggedInRole, setLoggedInRole] = useState()
    const [authStatus, setAuthStatus] = useState('idle')
    const [invalidToken, setInvalidToken] = useState(false)

    const phetch = async (route, request) => {
        let response = await fetch(SERVER_URL + route, {
            headers: { 
                'Authorization': sessionStorage.token, 
                'Content-Type': 'application/json', 
                'Accept': 'application/json',
                ...request?.headers
            },
            method: request?.method || 'GET',
            body: request?.body ? JSON.stringify({...request.body}) : null
        })
        console.log("hej")
        response = await response.json()
        const { type } = response
        if(type === 'InvalidToken') return setInvalidToken(true)
        return response
    }

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
        setInvalidToken(false)
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
                && <LoggedInRoutes loggedInUserID={loggedInUserID} loggedInRole={loggedInRole} logOut={logOut} invalidToken={invalidToken} setInvalidToken={setInvalidToken} handleNewTokenSuccess={handleSignInSuccess} phetch={phetch}/>
            }
            {authStatus === "loggedOut" 
                && <LoggedOutRoutes handleSignInSuccess={handleSignInSuccess} phetch={phetch}/>
            }
        </>
    );
}

export default App;


