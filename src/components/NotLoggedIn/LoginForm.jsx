import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

// import useLogin from '../../api/useLogin';
// import { ERROR_MESSAGES } from '../../utils/constants';

// import { ReactComponent as LoadingSpinner } from '../../assets/svg/LoadingSpinner.svg';

import styles from './LoginForm.module.scss';
import formStyles from './Form.module.scss';
import { useGlobal } from '../../providers/GlobalProvider';


const LoginForm = ({ handleSignInSuccess, isFormLoading, setFormLoading, ...props }) => {
    
    const { phetch } = useGlobal()

    // const {execute, data, isSuccess, isError, error, isLoading} = useLogin();

    // useEffect(() => setFormLoading(isLoading), [isLoading])

    const { register, handleSubmit, formState: { errors } } = useForm();
    // const onSubmit = data => {
    //     console.log(data)
    // }

    async function handleSignIn({ email, password }) {
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
    }

    return (
        <div className={formStyles.formContainer}>
            <form onSubmit={handleSubmit(handleSignIn)} className={styles.form}>
                <input /*{...isError && {style:{border: "2px solid rgb(250, 80, 110)"}}}*/ type="email" {...register("email", { required: true })} placeholder="E-post" />
                <input /*{...isError && {style:{border: "2px solid rgb(250, 80, 110)"}}}*/ type="password" {...register("password", { required: true })} placeholder="Lösenord" />
                {/*isError && <div className={formStyles.errorMessage}>{ERROR_MESSAGES[error.type] || 'FINNS INGET FELMEDDELANDE FÖR DETTA FEL'}</div>*/}
                <input type="submit" value="Logga in"/>
                {/* {isFormLoading && <LoadingSpinner className="loadingSpinner"/>} */}
            </form>
        </div>    
    )
}

export default LoginForm
