import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import CustomerBuildings from '../customer/CustomerBuildings';
import TasksForBuilding from '../TasksForBuilding';

const CustomerRoutes = ({ userID, setInvalidToken, buildings, getBuildings, selectedBuilding, setSelectedBuilding, phetch }) => {
    return (
        <Routes>
            <Route exact path='/byggnader' element={
                <CustomerBuildings 
                    userID={userID} 
                    buildings={buildings} 
                    getBuildings={getBuildings} 
                    selectedBuilding={selectedBuilding} 
                    setSelectedBuilding={setSelectedBuilding}
                    setInvalidToken={setInvalidToken}
                    phetch={phetch}
                />
            }/>
            <Route path='/uppgifter' element={
                <TasksForBuilding 
                    building={selectedBuilding} 
                    userID={userID} 
                    phetch={phetch}
                />}
            />
            <Route exact path='/mittkonto' element={"Mitt konto"}/>
            <Route path='*' element={<Navigate to='/byggnader'/>}/>
        </Routes>
    )
};

export default CustomerRoutes;
