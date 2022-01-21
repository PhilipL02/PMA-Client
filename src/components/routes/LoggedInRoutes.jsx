import React from 'react';

import CustomerRoutes from './CustomerRoutes';
import WorkerRoutes from './WorkerRoutes';

const LoggedInRoutes = ({ loggedInUserID, loggedInRole, logOut, invalidToken, setInvalidToken }) => {
    return (
        <>
            {loggedInUserID}
            <button onClick={logOut}>Logga ut</button>
            {invalidToken && <p>Din token har gått ut</p>}
            {loggedInRole === "customer" && <CustomerRoutes userID={loggedInUserID} logOut={logOut} setInvalidToken={setInvalidToken}/>}
            {loggedInRole === "worker" && <WorkerRoutes userID={loggedInUserID} logOut={logOut} setInvalidToken={setInvalidToken}/>}
        </>
    )
};

export default LoggedInRoutes;
