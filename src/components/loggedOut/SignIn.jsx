import React, { useState } from 'react'

import { useGlobal } from '../../providers/GlobalProvider'
import { clsx } from '../../utils/utils'

const SignIn = ({ handleSignInSuccess }) => {

    const { phetch } = useGlobal()

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [signInError, setSignInError] = useState()

    async function handleSignIn() {
        let response = await phetch('/users/signIn', {
            method: 'POST',
            body: {
                email,
                password,
            }
        })
        console.log(response)
        if(response?.success) { 
            handleSignInSuccess(response.data)
        }
        else if(response && !response.success) setSignInError(true)
    }

    const [view, setView] = useState('login')

    return (
        <div className='notLoggedInPage'>
            <img src={require('../../images/PHUSlogo.png')}/>
            <div className={clsx(['signIn', {show: view === 'login'}])}>
                <h1>Logga in</h1>
                <form onSubmit={e => (e.preventDefault(), handleSignIn())}>
                    <span className='emailGroup'>
                        <label htmlFor='emailInput'>E-post</label>
                        <input type="email" name="email" id='emailInput' onChange={e => setEmail(e.target.value)}/>
                    </span>
                    <span className='passwordGroup'>
                        <label htmlFor='passwordInput'>Lösenord</label>
                        <input type="password" name="password" id='passwordInput' onChange={e => setPassword(e.target.value)}/>
                    </span>
                    {signInError && <h3 style={{marginTop: "0.75rem", color: "red"}}>Fel inloggningsuppgifter</h3>}
                    <input type="submit" value="Logga in" />
                </form>
                <button onClick={() => setView('register')}>Byt till registrering</button>
            </div>
            <div className={clsx(['register', {show: view === 'register'}])}>
                <h1>Registrera dig</h1>
                
                <button onClick={() => setView('login')}>Byt till registrering</button>
            </div>
        </div>
    )
}

export default SignIn
