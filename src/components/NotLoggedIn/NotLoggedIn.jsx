import React, { useState } from 'react'

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { clsx } from '../../utils/utils';

import styles from './NotLoggedIn.module.scss';

const VIEWS = {
    login: 'login',
    register: 'register'
}

const NotLoggedIn = ({ handleSignInSuccess }) => {

    const [view, setView] = useState(VIEWS.login)

    return (
        <div className={styles.notLoggedInContainer}>
            <div className={styles.textContainer}>
                <img src={require('../../images/PHUSlogo.png')}/>
                {/* <h1 className='appLogo'>PHUS</h1> */}
                {/* <p>Stället där du sparar dina träningspass och följer dina framsteg</p> */}
            </div>
            <div className={styles.forms}>
                <div className={clsx([[styles.loginContainer], [styles.formContainer], {[styles.hide]: view !== VIEWS.login, [styles.show]: view === VIEWS.login}])}>
                    <LoginForm /*{...{isFormLoading, setFormLoading}}*/ handleSignInSuccess={handleSignInSuccess}/>
                    <button onClick={() => setView(VIEWS.register)}>Skapa nytt konto</button>
                </div>
                <div className={clsx([[styles.registerContainer], [styles.formContainer], {[styles.hide]: view !== VIEWS.register, [styles.show]: view === VIEWS.register}])}>
                    <RegisterForm /*{...{isFormLoading, setFormLoading}}*//>
                    <button onClick={() => setView(VIEWS.login)}>Logga in</button>
                </div>
                {/* {isFormLoading && <span className={styles.opacityCover}/>} */}
            </div>
            {/* {isFormLoading && <span className={styles.pageCover}/>} */}
        </div>
    )
}

export default NotLoggedIn
