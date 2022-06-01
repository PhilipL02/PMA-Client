import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

// import useLogin from '../../api/useLogin';
// import { ERROR_MESSAGES } from '../../utils/constants';

import { ReactComponent as LoadingSpinner } from '../../assets/svg/Spinner.svg';

import styles from './LoginForm.module.scss';
import formStyles from './Form.module.scss';
import { useGlobal } from '../../providers/GlobalProvider';


const LoginForm = ({ handleSignInSuccess, handleSignIn, isFormLoading, setFormLoading, ...props }) => {
    
    const { phetch } = useGlobal()

    const [isError, setError] = useState(false)

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    async function handleSignInSubmit({ email, password }) {
        setError(false)
        setFormLoading(true)
        setTimeout(async () => {
            let response = await handleSignIn(email, password)
            console.log(response)
            setFormLoading(false)
            if(response?.success) { 
                handleSignInSuccess(response.data)
            }
            else {
                setError(true)
            }
        }, 1000)
    }
    
    useEffect(() => {
        if(!(watch("email") && watch("password"))) setError(false)
    }, [watch("email"), watch("password")])

    return (
        <div className={formStyles.formContainer}>
            <form onSubmit={handleSubmit(handleSignInSubmit)} className={styles.form}>
                <input {...isError && {style:{border: "2px solid rgb(250, 80, 110)"}}} type="email" {...register("email", { required: true })} placeholder="E-post" />
                <input {...isError && {style:{border: "2px solid rgb(250, 80, 110)"}}} type="password" {...register("password", { required: true })} placeholder="Lösenord" />
                {isError && <div className={formStyles.errorMessage}>Fel inloggningsuppgifter</div>}
                <input type="submit" value="Logga in"/>
            </form>
            {isFormLoading && <LoadingSpinner className={formStyles.loadingSpinner}/>}
        </div>    
    )
}

export default LoginForm
