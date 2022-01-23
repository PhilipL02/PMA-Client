import React from 'react';

const TokenExpired = ({ userID, handleNewTokenSuccess, logOut, phetch }) => {

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
                <h2>Din token har gått ut</h2>
                <p>Vill du stanna inloggad?</p>
                <span>
                    <button onClick={getNewToken}>Stanna inloggad</button>
                    <button onClick={logOut}>Logga ut</button>
                </span>
            </div>
        </div>
    )
};

export default TokenExpired;
