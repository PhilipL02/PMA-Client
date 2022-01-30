import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import CustomerRoutes from './CustomerRoutes';
import WorkerRoutes from './WorkerRoutes';
import TokenExpired from '../TokenExpired';
import { useGlobal } from '../../providers/GlobalProvider';

import { ReactComponent as HideIcon } from '../../assets/svg/Cross.svg'
import { ReactComponent as ShowIcon } from '../../assets/svg/Bars.svg'
import LeftSidenav from '../LeftSidenav';
import DataProvider from '../../providers/DataProvider';
import useBreakpoint from '../../hooks/useBreakpoint';
import { clsx } from '../../utils/utils';

const LoggedInRoutes = ({ logOut, handleNewTokenSuccess }) => {

    const { userID, userRole, invalidToken, phetch } = useGlobal()

    const location = useLocation()
    const { lg } = useBreakpoint()

    const [selectedBuilding, setSelectedBuilding] = useState()
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
        <DataProvider>
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
                <span style={{width: '100%'}}>
                    <CustomerRoutes 
                        selectedBuilding={selectedBuilding} 
                        setSelectedBuilding={setSelectedBuilding}
                    />
                </span>
            </div>
        </DataProvider>
    )
};

export default LoggedInRoutes;
