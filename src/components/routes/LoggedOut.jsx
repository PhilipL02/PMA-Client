import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";

import NotLoggedIn from '../NotLoggedIn/NotLoggedIn';

const LoggedOut = ({ handleSignInSuccess }) => {

    return (
        <span>
            <Routes>
                <Route exact path='/' element={<NotLoggedIn handleSignInSuccess={handleSignInSuccess}/>}/>
                <Route path='*' element={<Navigate to='/'/>}/>
            </Routes>
        </span>
    )
};

export default LoggedOut;