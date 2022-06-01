import { useEffect } from 'react'

import LoggedIn from './components/routes/LoggedIn';
import LoggedOut from './components/routes/LoggedOut';
import { useGlobal } from './providers/GlobalProvider'
import { isTokenAlive, getToken } from './utils/utils';

import './styles/style.scss'

function App() {

    const { setUserID, setUserName, setUserRole, authStatus, setAuthStatus, setInvalidToken, getUserDetails } = useGlobal()

    useEffect(() => {
        if(!isTokenAlive()) return setAuthStatus('loggedOut')
        let token = getToken()
        if(!(token?.userID && token?.role)) return setAuthStatus('loggedOut')
        setUserID(token.userID)
        setUserRole(token.role)
        setAuthStatus('loggedIn')
    }, [authStatus, setAuthStatus, setUserID, setUserName, setUserRole])  

    function handleSignInSuccess(data) {
        console.log('handleSignInSuccess', data)
        if(!(data.user.userID && data.user.role && data.token)) return
        setUserID(data.user.userID)
        setUserRole(data.user.role)
        sessionStorage.setItem("token", data.token)
        setInvalidToken(false)
        setAuthStatus('loggedIn')
        getUserDetails()
    }

    function logOut() {
        sessionStorage.removeItem("token")
        setUserID(undefined)
        setUserRole(undefined)
        setUserName(undefined)
        setInvalidToken(undefined)
        setAuthStatus('loggedOut')
    }

    return (
        <>
            {authStatus === "loggedIn" 
                && <LoggedIn logOut={logOut} handleNewTokenSuccess={handleSignInSuccess}/>
            }
            {authStatus === "loggedOut" 
                && <LoggedOut handleSignInSuccess={handleSignInSuccess}/>
            }
        </>
    );
}

export default App;


