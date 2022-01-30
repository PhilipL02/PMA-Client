import React from 'react';

import { useGlobal } from '../providers/GlobalProvider';

const TokenExpired = ({ handleNewTokenSuccess, logOut }) => {

    const { userID, phetch } = useGlobal()

    async function getNewToken() {
        let response = await phetch('/users/token/new', {
            method: 'POST',
            body: {
                userID
            }
        })
        console.log(response)
        if(response?.success) handleNewTokenSuccess(response.data)
        if(response && !response.success) logOut()
    }

    return (
        <div className='tokenExpired'>
            <div className='innerTokenExpired'>
                <h2>Din session har gått ut</h2>
                <p>Vad vill du göra?</p>
                <span>
                    <button onClick={getNewToken}>Stanna inloggad</button>
                    <button onClick={logOut}>Logga ut</button>
                </span>
            </div>
        </div>
    )
};

export default TokenExpired;
