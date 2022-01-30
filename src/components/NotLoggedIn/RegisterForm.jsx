import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

// import useRegister from '../../api/useRegister';
// import { ERROR_MESSAGES } from '../../utils/constants';

// import { ReactComponent as LoadingSpinner } from '../../assets/svg/LoadingSpinner.svg';

import styles from './RegisterForm.module.scss';
import formStyles from './Form.module.scss';

const RegisterForm = ({ isFormLoading, setFormLoading }) => {
    
    // const {execute, data, isSuccess, isError, error, isLoading} = useRegister();

    // useEffect(() => setFormLoading(isLoading), [isLoading])

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data)
    }

    return (
        <div className={formStyles.formContainer}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <input type="text" className={styles.firstName} id='firstName' {...register("firstName", { required: true })} placeholder="Förnamn" />
                <input type="text" className={styles.lastName} id='lastName' {...register("lastName", { required: true })} placeholder="Efternamn" />
                <input /*{...isError && error.type === 'EmailOccupied' && {style:{border: "2px solid rgb(250, 80, 110)"}}}*/ type="email" className={styles.email} id='email' {...register("email", { required: true })} placeholder="E-post" />
                {/* {isError && error.type === 'EmailOccupied' && <div className={formStyles.errorMessage}>{ERROR_MESSAGES[error.type]}</div>} */}
                <input type="password" className={styles.password} id='password' {...register("password", { required: true })} placeholder="Lösenord" />
                <input type="password" className={styles.confirmPassword} id='confirmPassword' {...register("confirmPassword", { required: true })} placeholder="Bekräfta lösenord" />
                <input type="text" className={styles.code} id='code' {...register("code", { required: true })} placeholder="Kod" />
                <input type="submit" value="Gå med"/>
            </form>
            {/* {isFormLoading && <LoadingSpinner className="loadingSpinner"/>} */}
        </div>
    )
}

export default RegisterForm
