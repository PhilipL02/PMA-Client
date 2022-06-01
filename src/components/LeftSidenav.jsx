import React from 'react';

import Sidenav from './Sidenav/Sidenav';
import SidenavBlock from './Sidenav/SidenavBlock';

import { clsx } from '../utils/utils';
import { useGlobal } from '../providers/GlobalProvider';

const LeftSidenav = ({ showSidenav, logOut }) => {

    const { userRole } = useGlobal()

    return (
        <Sidenav className={clsx({hidden: !showSidenav})}>
            <>
                <>
                    <SidenavBlock
                        to='/'
                        text="Start"
                    />
                    <SidenavBlock
                        text="Byggnader"
                        dropContent={
                            <>
                                <SidenavBlock
                                    to='/minabyggnader'
                                    text='Mina byggnader'
                                />
                                {userRole === 'customer' &&
                                    <SidenavBlock
                                        to='/nybyggnad'
                                        text='Lägg till byggnad'
                                    />
                                }
                            </>
                        }
                    />
                    <SidenavBlock
                        text="Uppgifter"
                        dropContent={
                            <>
                                <SidenavBlock
                                    to='/minauppgifter'
                                    text='Mina uppgifter'
                                />
                            </>
                        }
                    />
                    <SidenavBlock
                        to='/mittkonto'
                        text="Mitt konto"
                    />
                </>
                <SidenavBlock
                    className='logoutBlock'
                    text="Logga ut"
                    logOut={logOut}
                />
            </>
        </Sidenav>
    )
};

export default LeftSidenav;
