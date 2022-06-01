import React, { useState, useRef } from 'react'

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { clsx } from '../../utils/utils';

import styles from './NotLoggedIn.module.scss';
import { useGlobal } from '../../providers/GlobalProvider';

const VIEWS = {
    login: 'login',
    register: 'register'
}

const NotLoggedIn = ({ handleSignInSuccess }) => {

    const { phetch } = useGlobal()

    const [view, setView] = useState(VIEWS.login)
    const [isFormLoading, setFormLoading] = useState(false)
    const [registerSuccessData, setRegisterSuccessData] = useState()

    const registerFormReset = useRef(null)

    async function handleSignIn(email, password) {
        if(!(email && password)) return
        let response = await phetch('/users/signIn', {
            method: 'POST',
            body: {
                email,
                password,
            }
        })
        console.log(response)
        return response
    }

    async function handleSignInAfterRegisterSuccess() {
        const { email, password } = registerSuccessData
        let response = await handleSignIn(email, password)
        console.log(response)
        if(response?.success) { 
            handleSignInSuccess(response.data)
        }
    }

    function handleNotSignInImmediately() {
        setRegisterSuccessData(undefined)
        setView(VIEWS.login)
        setTimeout(() => registerFormReset.current(), 1000)
    }

    return (
        <div className={styles.notLoggedInContainer}>
            <div className={styles.textContainer}>
                <img src={require('../../images/PHUSlogo.png')}/>
                {/* <h1 className='appLogo'>PHUS</h1> */}
                {/* <p>Stället där du sparar dina träningspass och följer dina framsteg</p> */}
            </div>
            <div className={styles.forms}>
                <div className={clsx([[styles.loginContainer], [styles.formContainer], {[styles.hide]: view !== VIEWS.login, [styles.show]: view === VIEWS.login}])}>
                    <LoginForm {...{isFormLoading, setFormLoading}} handleSignInSuccess={handleSignInSuccess} handleSignIn={handleSignIn}/>
                    <button onClick={() => setView(VIEWS.register)}>Skapa nytt konto</button>
                </div>
                <div className={clsx([[styles.registerContainer], [styles.formContainer], {[styles.hide]: view !== VIEWS.register, [styles.show]: view === VIEWS.register}])}>
                    <RegisterForm {...{isFormLoading, setFormLoading, setRegisterSuccessData, registerFormReset}}/>
                    <button onClick={() => setView(VIEWS.login)}>Logga in</button>
                </div>
                {isFormLoading && <span className={styles.opacityCover}/>}
            </div>
            {/* {isFormLoading && <span className={styles.pageCover}/>} */}
            {(registerSuccessData?.email && registerSuccessData?.password) &&
                <div className={styles.registerSuccess} onClick={handleNotSignInImmediately}>
                    <div className={styles.registerSuccessInner} onClick={e => e.stopPropagation()}>
                        <h1>Registreringen är klar</h1>
                        <h3>Vill du logga in direkt?</h3>
                        <div className={styles.buttons}>
                            <button onClick={handleSignInAfterRegisterSuccess}>JA</button>
                            <button onClick={handleNotSignInImmediately}>NEJ</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default NotLoggedIn
