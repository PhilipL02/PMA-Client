import React, { useState, useEffect } from 'react';

import CustomerRoutes from './CustomerRoutes';
import WorkerRoutes from './WorkerRoutes';
import Sidenav from '../Sidenav/Sidenav';
import SidenavBlock from '../Sidenav/SidenavBlock';
import TokenExpired from '../TokenExpired';
import { clsx } from '../../utils/utils';

const LoggedInRoutes = ({ loggedInUserID, loggedInRole, logOut, invalidToken, setInvalidToken, handleNewTokenSuccess, phetch }) => {

    const [selectedBuilding, setSelectedBuilding] = useState()
    const [buildings, setBuildings] = useState()
    const [showSidenav, setShowSidenav] = useState()

    useEffect(() => {
        if(!loggedInUserID) return
        getBuildings()
    }, [loggedInUserID])

    async function getBuildings() {
        let response = await phetch('/buildings/get', {
            method: 'POST',
            body: {
                userID: loggedInUserID,
            }
        })
        console.log(response)
        if(response?.success) setBuildings(response.data)
    }

    return (
        <>
            <header>
                <button onClick={() => setShowSidenav(v => !v)}>{showSidenav ? 'Göm' : 'Visa'} sidenav</button>
            </header>
            <Sidenav className={clsx({hidden: !showSidenav})}>
                <>
                    <>
                        <SidenavBlock
                            to='/mittkonto'
                            text="Mitt konto"
                        />
                        <SidenavBlock
                            text="Byggnader"
                            dropContent={
                                <>
                                    <SidenavBlock
                                        to='/byggnader'
                                        text='Mina byggnader'
                                    />
                                </>
                            }
                        />
                        <SidenavBlock
                            text="Uppgifter"
                            dropContent={
                                <>
                                    <SidenavBlock
                                        to='/'
                                        text='Aktiva uppgifter'
                                    />
                                    <SidenavBlock
                                        to='/'
                                        text='Klara uppgifter'
                                    />
                                    <SidenavBlock
                                        text='Uppgifter för byggnad'
                                        dropContent={
                                            buildings &&
                                            <>
                                                {buildings.map(b => (
                                                    <SidenavBlock
                                                        key={b._id}
                                                        to={`/uppgifter?id=${b._id}`}
                                                        text={b.buildingName}
                                                        onClick={() => setSelectedBuilding(b)}
                                                    />
                                                ))}
                                            </>
                                        }
                                    />
                                </>
                            }
                        />
                    </>
                    <SidenavBlock
                        className='logoutBlock'
                        text="Logga ut"
                        logOut={logOut}
                    />
                </>
            </Sidenav>
            <div className='content'>
                <span>
                    {loggedInRole === "customer" && 
                        <CustomerRoutes 
                            userID={loggedInUserID} 
                            setInvalidToken={setInvalidToken} 
                            buildings={buildings}
                            getBuildings={getBuildings}
                            selectedBuilding={selectedBuilding} 
                            setSelectedBuilding={setSelectedBuilding}
                            phetch={phetch}
                        />
                    }
                    {loggedInRole === "worker" && <WorkerRoutes userID={loggedInUserID} logOut={logOut} setInvalidToken={setInvalidToken}/>}
                </span>
            </div>
            {/* <Sidenav right>
                <SidenavBlock
                    text="Medlemmar"
                    dropContent={
                        <>
                            <SidenavBlock
                                text='Kalle Eriksson'
                            />
                            <SidenavBlock
                                text='Pelle Olsson'
                            />
                            <SidenavBlock
                                text='Emil Hödertennen'
                            />
                        </>
                    }
                />
            </Sidenav> */}
            {invalidToken && <TokenExpired userID={loggedInUserID} handleNewTokenSuccess={handleNewTokenSuccess} logOut={logOut} phetch={phetch}/>}
        </>
    )
};

export default LoggedInRoutes;
