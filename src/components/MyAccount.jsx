import React, { useEffect, useState } from 'react';

import { useGlobal } from '../providers/GlobalProvider';
import { clsx } from '../utils/utils'

import { ReactComponent as LoadingSpinner } from '../assets/svg/Spinner.svg';

const MyAccount = () => {

    const { phetch, userDetails, getUserDetails, setPageUnClickable } = useGlobal()

    const [currentFirstName, setCurrentFirstName] = useState()
    const [currentLastName, setCurrentLastName] = useState()
    const [currentEmail, setCurrentEmail] = useState()

    const [inputtedUserDetails, setInputtedUserDetails] = useState()

    const [showUpdateSuccess, setShowUpdateSuccess] = useState(false)
    const [error, setError] = useState({is: false, type: undefined})
    const [isLoading, setLoading] = useState()

    useEffect(() => {
        if(!userDetails) return 
        setInputtedUserDetails(userDetails)
        setCurrentFirstName(userDetails.firstName)
        setCurrentLastName(userDetails.lastName)
        setCurrentEmail(userDetails.email)
    }, [userDetails])

    useEffect(() => {
        setError({is: false, type: undefined})
    }, [inputtedUserDetails])

    async function handleChangeUserDetails(e) {
        e.preventDefault()
        setPageUnClickable(true)
        setLoading(true)
        setTimeout(async () => {
            let response = await phetch('/users/details/update', {
                method: 'POST',
                body: {
                    userDetails: inputtedUserDetails
                }
            })
            console.log(response)
            if(response?.success) {
                getUserDetails()
                setShowUpdateSuccess(true)
            }
            else {
                setError({is: true, type: response?.type})
            }
            setLoading(false)
            setPageUnClickable(false)
        }, 1000)
    }

    return (
        <>
            {userDetails && 
                <>
                    <div className='myAccountUserDetails'>
                        <h2>Ändra kontouppgifter</h2>
                        <form onSubmit={handleChangeUserDetails}>
                            <div className='inputGroup'>
                                <label htmlFor="firstName">Förnamn</label>
                                <input type="text" id="firstName" defaultValue={inputtedUserDetails?.firstName} onChange={e => setInputtedUserDetails(v => ({...v, firstName: e.target.value}))}/>
                            </div>
                            <div className='inputGroup'>
                                <label htmlFor="lastName">Efternamn</label>
                                <input type="text" id="lastName" defaultValue={inputtedUserDetails?.lastName} onChange={e => setInputtedUserDetails(v => ({...v, lastName: e.target.value}))}/>   
                            </div>
                            <div className='inputGroup'>
                                <label htmlFor="email">E-post</label>
                                <input type="text" id="email" defaultValue={inputtedUserDetails?.email} onChange={e => setInputtedUserDetails(v => ({...v, email: e.target.value}))}/>
                            </div>
                            {(error.is && error.type) && 
                                <p>E-posten är upptagen</p>
                            }
                            <input type="submit" value="Spara ändringar"/>
                            {isLoading && 
                                <>
                                    <div className='opacityCover'/>
                                    <LoadingSpinner className='loadingSpinner'/>
                                </>
                            }
                        </form>
                    </div>
                </>
            }      
            {showUpdateSuccess && 
                <div className='updateSuccess' onClick={() => setShowUpdateSuccess(false)}>
                    <div className='updateSuccessInner' onClick={e => e.stopPropagation()}>
                        <h4>Dina kontouppgifter har uppdaterats</h4>
                    </div>
                </div>
            }
        </>
    )
};

export default MyAccount;
