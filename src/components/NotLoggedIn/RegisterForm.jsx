import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { useGlobal } from '../../providers/GlobalProvider';

import { ERROR_MESSAGES } from '../../utils/constants'

import { ReactComponent as LoadingSpinner } from '../../assets/svg/Spinner.svg';

import styles from './RegisterForm.module.scss';
import formStyles from './Form.module.scss';

const RegisterForm = ({ isFormLoading, setFormLoading, setRegisterSuccessData, registerFormReset }) => {
    
    const { phetch } = useGlobal()

    const [isError, setError] = useState(false)
    const [isPasswordError, setPasswordError] = useState(false)
    const [errorType, setErrorType] = useState()

    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();

    useEffect(() => {
        registerFormReset.current = reset
    }, [])

    async function handleRegister({ firstName, lastName, email, password, confirmPassword, code }) {
        if(!(firstName && lastName && email && password && confirmPassword && code)) return
        setError(false)
        setErrorType(undefined)
        setFormLoading(true)
        setTimeout(async () => {
            if(password !== confirmPassword) return
            let response = await phetch('/users/create', {
                method: 'POST',
                body: {
                    firstName,
                    lastName, 
                    email,
                    password,
                    code,
                }
            })
            console.log(response)
            setFormLoading(false)
            if(response?.success) { 
                setRegisterSuccessData({email, password})
            }
            else {
                setError(true)
                setErrorType(response.type)
            }
        }, 1500)
    }

    useEffect(() => {
        if(!(watch("password") && watch("confirmPassword"))) setPasswordError(false)
        else if((watch("password") === watch("confirmPassword"))) setPasswordError(false)
    }, [watch("password"), watch("confirmPassword")])

    function passwordInputBlur() {
        if(!(watch("password") && watch("confirmPassword"))) setPasswordError(false)
        else if((watch("password") !== watch("confirmPassword"))) setPasswordError(true)
        else if((watch("password") === watch("confirmPassword"))) setPasswordError(false)
    }

    return (
        <>
            <div className={formStyles.formContainer}>
                <form onSubmit={handleSubmit(handleRegister)} className={styles.form}>
                    <div className={styles.firstLastName}>
                        <input type="text" className={styles.firstName} id='firstName' {...register("firstName", { required: true })} placeholder="Förnamn" />
                        <input type="text" className={styles.lastName} id='lastName' {...register("lastName", { required: true })} placeholder="Efternamn" />
                    </div>    
                    <input {...isError && errorType === 'EmailOccupied' && {style:{border: "2px solid rgb(250, 80, 110)"}}} type="email" className={styles.email} id='email' {...register("email", { required: true })} placeholder="E-post" />
                    {(isError && errorType) && <div className={formStyles.errorMessage}>{ERROR_MESSAGES[errorType]}</div>}
                    <input type="password" className={styles.password} id='password' {...register("password", { required: true })} placeholder="Lösenord" onBlur={passwordInputBlur} />
                    <input type="password" className={styles.confirmPassword} id='confirmPassword' {...register("confirmPassword", { required: true })} placeholder="Bekräfta lösenord" onBlur={passwordInputBlur} />
                    {isPasswordError && <p className={styles.passwordsDoNotMatch}>Lösenorden matchar inte</p>}
                    <input type="text" className={styles.code} {...isError && errorType === 'InvalidCode' && {style:{border: "2px solid rgb(250, 80, 110)"}}} id='code' {...register("code", { required: true })} placeholder="Kod" />
                    <input type="submit" value="Gå med"/>
                </form>
                {isFormLoading && <LoadingSpinner className={formStyles.loadingSpinner}/>}
            </div>
        </>
    )
}

export default RegisterForm
