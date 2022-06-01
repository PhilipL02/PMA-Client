import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import LoggedInContent from './LoggedInContent';
import Admin from '../Admin/Admin';
import TokenExpired from '../TokenExpired';
import LeftSidenav from '../LeftSidenav';
import useBreakpoint from '../../hooks/useBreakpoint';
import DataProvider from '../../providers/DataProvider';
import { useGlobal } from '../../providers/GlobalProvider';
import { clsx } from '../../utils/utils';

import { ReactComponent as HideIcon } from '../../assets/svg/Cross.svg'
import { ReactComponent as ShowIcon } from '../../assets/svg/Bars.svg'
import AdminProvider from '../../providers/AdminProvider';

const LoggedIn = ({ logOut, handleNewTokenSuccess }) => {

    const { invalidToken, userRole } = useGlobal()

    const location = useLocation()
    const { lg } = useBreakpoint()

    const [showSidenav, setShowSidenav] = useState(lg)

    function changeSidenav(newState) {
        if(lg) return
        setShowSidenav(newState)
    }

    useEffect(() => {
        setShowSidenav(lg)
    }, [lg])

    useEffect(() => {
        if(lg) return
        setShowSidenav(false)
    }, [location])

    return (
        <>
            {userRole ? <>
                {userRole === "admin" ?
                    <AdminProvider>
                        <Admin logOut={logOut} />
                    </AdminProvider>
                : <DataProvider>
                    {invalidToken && <TokenExpired handleNewTokenSuccess={handleNewTokenSuccess} logOut={logOut}/>}
                    <header>
                        {!lg && <span className='sidenavToggleSlot'>{showSidenav ? <HideIcon onClick={() => changeSidenav(false)}/> : <ShowIcon onClick={() => changeSidenav(true)}/>}</span>}
                        <img src={require('../../images/PHUSlogo.png')}/>
                    </header>
                    <LeftSidenav 
                        showSidenav={showSidenav} 
                        logOut={logOut} 
                    />
                    <div className={clsx(['content', {right: lg}])} onClick={() => changeSidenav(false)}>
                        <span style={{width: '100%', paddingBottom: '1rem'}}>
                            <LoggedInContent/>
                        </span>
                    </div>
                </DataProvider>
                }
            </> : "Fel"}
        </>
        
    )
};

export default LoggedIn;
