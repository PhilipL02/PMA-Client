import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";

import SignIn from '../loggedOut/SignIn';

const LoggedOutRoutes = ({ handleSignInSuccess, from }) => {

    return (
        <Routes>
            <Route exact path='/loggain' element={<SignIn handleSignInSuccess={handleSignInSuccess}/>}/>
            <Route path='*' element={<Navigate to='/loggain'/>}/>
        </Routes>
    )
};

export default LoggedOutRoutes;