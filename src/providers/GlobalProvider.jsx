import React, { createContext, useContext, useState, useEffect } from 'react';

import { SERVER_URL } from '../utils/constants';

const contextGlobal = createContext();

const GlobalProvider = ({ children }) => {

    const [userID, setUserID] = useState()
    const [userName, setUserName] = useState()
    const [userRole, setUserRole] = useState()
    const [authStatus, setAuthStatus] = useState('idle')
    const [invalidToken, setInvalidToken] = useState()

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
        response = await response.json()
        const { type } = response
        if(type === 'InvalidToken') setInvalidToken(true)
        else return response
    }

    return(
        <contextGlobal.Provider value={{ phetch, userID, setUserID, userName, setUserName, userRole, setUserRole, authStatus, setAuthStatus, invalidToken, setInvalidToken }}>
            {children}
        </contextGlobal.Provider>
    )
}

export const useGlobal = () => useContext(contextGlobal);

export default GlobalProvider;
