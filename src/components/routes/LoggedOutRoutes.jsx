import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";

import SignIn from '../loggedOut/SignIn';
import NotLoggedIn from '../NotLoggedIn/NotLoggedIn';

const LoggedOutRoutes = ({ handleSignInSuccess }) => {

    return (
        <span>
            <Routes>
                <Route exact path='/' element={/*<SignIn handleSignInSuccess={handleSignInSuccess}/>*/<NotLoggedIn handleSignInSuccess={handleSignInSuccess}/>}/>
                <Route path='*' element={<Navigate to='/'/>}/>
            </Routes>
        </span>
    )
};

export default LoggedOutRoutes;