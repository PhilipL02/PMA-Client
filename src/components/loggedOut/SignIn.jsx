import React, { useState } from 'react'
import {
    Router,
    Route,
    Link,
    useNavigate,
    useLocation,
    Navigate,
    Outlet,
    Routes
} from "react-router-dom";

const SignIn = ({ handleSignInSuccess, phetch }) => {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [signInError, setSignInError] = useState()

    async function handleSignIn(role) {
        let response = await phetch('/users/signIn', {
            method: 'POST',
            body: {
                email,
                password,
                role
            }
        })
        console.log(response)
        if(response?.success) { 
            handleSignInSuccess(response.data)
        }
        else if(response && !response.success) setSignInError(true)
    }

    return (
        <>
            {signInError && <h3>Fel inloggningsuppgifter</h3>}
            <br/>

            <h2>Logga in som kund</h2>
            <form onSubmit={e => (e.preventDefault(), handleSignIn("customer"))}>
                <label htmlFor='customerEmailInput'>E-post</label>
                <input type="email" name="email" id='customerEmailInput' onChange={e => setEmail(e.target.value)}/>
                <label htmlFor='customerPasswordInput'>Lösenord</label>
                <input type="password" name="password" id='customerPasswordInput' onChange={e => setPassword(e.target.value)}/>
                <input type="submit" value="Logga in" />
            </form>

            <br/><hr/><br/>
            
            <h2>Logga in som BHA</h2>
            <form onSubmit={e => (e.preventDefault(), handleSignIn("worker"))}>
                <label htmlFor='workerEmailInput'>E-post</label>
                <input type="email" name="email" id='workerEmailInput' onChange={e => setEmail(e.target.value)}/>
                <label htmlFor='workerPasswordInput'>Lösenord</label>
                <input type="password" name="password" id='workerPasswordInput' onChange={e => setPassword(e.target.value)}/>
                <input type="submit" value="Logga in" />
            </form>
        </>
    )
}

export default SignIn
