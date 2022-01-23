import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";

import SignIn from '../loggedOut/SignIn';

const LoggedOutRoutes = ({ handleSignInSuccess, phetch }) => {

    return (
        <span>
            <Routes>
                <Route exact path='/loggain' element={<SignIn handleSignInSuccess={handleSignInSuccess} phetch={phetch}/>}/>
                <Route path='*' element={<Navigate to='/loggain'/>}/>
            </Routes>
        </span>
    )
};

export default LoggedOutRoutes;